"use client"

import type {
  SecretaryDeltaEvent,
  SecretaryErrorEvent,
  SecretaryMetaEvent,
  SecretaryRequestBody,
} from "./types"

type StreamHandlers = {
  signal?: AbortSignal
  onDelta: (payload: SecretaryDeltaEvent) => void
  onMeta: (payload: SecretaryMetaEvent) => void
  onDone: () => void
}

function parseEventBlock(block: string) {
  const lines = block.split("\n")
  let event = "message"
  const dataLines: string[] = []

  for (const line of lines) {
    if (line.startsWith("event:")) {
      event = line.slice(6).trim()
    }

    if (line.startsWith("data:")) {
      dataLines.push(line.slice(5).trim())
    }
  }

  const rawData = dataLines.join("\n")

  if (!rawData) {
    return {
      event,
      data: null,
    }
  }

  try {
    return {
      event,
      data: JSON.parse(rawData),
    }
  } catch (error) {
    console.error("[secretary] invalid SSE payload", { block, error })
    throw new Error("A resposta da Secretária IA veio em um formato inválido.")
  }
}

function extractTextFromPayload(payload: unknown): string | null {
  if (!payload) {
    return null
  }

  if (typeof payload === "string") {
    const normalized = payload.trim()
    return normalized || null
  }

  if (Array.isArray(payload)) {
    const parts = payload.map((item) => extractTextFromPayload(item)).filter(Boolean)
    return parts.length ? parts.join("\n").trim() : null
  }

  if (typeof payload === "object") {
    const record = payload as Record<string, unknown>

    for (const key of ["reply", "message", "content", "text"]) {
      const value = extractTextFromPayload(record[key])

      if (value) {
        return value
      }
    }
  }

  return null
}

async function consumeJsonResponse(response: Response, handlers: StreamHandlers) {
  const payload = (await response.json().catch(() => null)) as unknown
  const normalizedText = extractTextFromPayload(payload)

  if (!normalizedText) {
    console.error("[secretary] 200 JSON without assistant text", { payload })
    throw new Error("A resposta da Secretária IA veio sem texto válido.")
  }

  handlers.onDelta({ text: normalizedText })
  handlers.onDone()
}

export async function streamSecretaryResponse(body: SecretaryRequestBody, handlers: StreamHandlers) {
  const response = await fetch("/api/secretary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    signal: handlers.signal,
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as SecretaryErrorEvent | null
    throw new Error(payload?.message || "A Secretária IA não conseguiu responder agora.")
  }

  const contentType = response.headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    await consumeJsonResponse(response, handlers)
    return
  }

  if (!response.body) {
    throw new Error("A resposta da Secretária IA veio sem stream.")
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ""
  let receivedText = false
  let receivedDone = false

  const processBlock = (block: string) => {
    if (!block.trim()) {
      return
    }

    const parsed = parseEventBlock(block.trim())

    if (parsed.event === "delta" && parsed.data) {
      const payload = parsed.data as SecretaryDeltaEvent

      if (typeof payload.text !== "string" || payload.text.length === 0) {
        console.error("[secretary] empty delta payload", { payload })
        return
      }

      receivedText = true
      handlers.onDelta(payload)
      return
    }

    if (parsed.event === "meta" && parsed.data) {
      handlers.onMeta(parsed.data as SecretaryMetaEvent)
      return
    }

    if (parsed.event === "done") {
      receivedDone = true
      handlers.onDone()
      return
    }

    if (parsed.event === "error" && parsed.data) {
      const payload = parsed.data as SecretaryErrorEvent
      console.error("[secretary] backend error event", payload)
      throw new Error(payload.message || "A Secretária IA não conseguiu responder agora.")
    }
  }

  while (true) {
    const { done, value } = await reader.read()

    if (done) {
      break
    }

    buffer += decoder.decode(value, { stream: true })

    let separatorIndex = buffer.indexOf("\n\n")

    while (separatorIndex !== -1) {
      const block = buffer.slice(0, separatorIndex)
      buffer = buffer.slice(separatorIndex + 2)
      processBlock(block)
      separatorIndex = buffer.indexOf("\n\n")
    }
  }

  buffer += decoder.decode()

  if (buffer.trim()) {
    processBlock(buffer)
  }

  if (!receivedText) {
    console.error("[secretary] stream ended without assistant text")
    throw new Error("A resposta da Secretária IA veio sem texto válido.")
  }

  if (!receivedDone) {
    console.error("[secretary] stream ended without done event")
    throw new Error("A resposta da Secretária IA foi interrompida antes da conclusão.")
  }
}
