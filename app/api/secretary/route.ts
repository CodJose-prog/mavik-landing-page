import { NextResponse } from "next/server"
import { buildSecretarySystemPrompt } from "../../../lib/assistant/prompt"
import { getOpenAIClient, getSecretaryModel, hasSecretaryCredentials } from "../../../lib/assistant/server"
import type { SecretaryLeadState, SecretaryRequestBody } from "../../../lib/assistant/types"

export const runtime = "nodejs"

const MARKER = "[[LEAD_STATE]]"

function sendEvent(controller: ReadableStreamDefaultController, event: string, data: unknown) {
  const encoder = new TextEncoder()
  controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`))
}

function parseLeadState(raw: string) {
  const trimmed = raw.trim()

  if (!trimmed) {
    return null
  }

  try {
    return JSON.parse(trimmed) as SecretaryLeadState
  } catch {
    const start = trimmed.indexOf("{")
    const end = trimmed.lastIndexOf("}")

    if (start !== -1 && end !== -1 && end > start) {
      try {
        return JSON.parse(trimmed.slice(start, end + 1)) as SecretaryLeadState
      } catch {
        return null
      }
    }

    return null
  }
}

function splitAssistantOutput(raw: string) {
  const markerIndex = raw.indexOf(MARKER)

  if (markerIndex === -1) {
    return {
      visibleText: raw.trim(),
      rawMeta: "",
    }
  }

  return {
    visibleText: raw.slice(0, markerIndex).trim(),
    rawMeta: raw.slice(markerIndex + MARKER.length).trim(),
  }
}

function normalizeMessages(body: SecretaryRequestBody) {
  return body.messages
    .filter(
      (message) =>
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string" &&
        message.content.trim().length > 0
    )
    .slice(-12)
    .map((message) => ({
      role: message.role,
      content: message.content.trim(),
    }))
}

function buildEmptyResponseMessage(incompleteReason?: string | null) {
  if (incompleteReason === "max_output_tokens") {
    return "A Secretária IA não conseguiu concluir a resposta agora. Tente novamente ou continue no WhatsApp da MAVIK."
  }

  return "A Secretária IA retornou uma resposta sem texto válido. Tente novamente ou continue no WhatsApp da MAVIK."
}

export async function POST(request: Request) {
  if (!hasSecretaryCredentials()) {
    return NextResponse.json(
      {
        message: "A Secretária IA está indisponível no momento. Você ainda pode continuar pelo WhatsApp da MAVIK.",
      },
      { status: 503 }
    )
  }

  let body: SecretaryRequestBody

  try {
    body = (await request.json()) as SecretaryRequestBody
  } catch {
    return NextResponse.json({ message: "Não foi possível interpretar a conversa enviada." }, { status: 400 })
  }

  const messages = normalizeMessages(body)

  if (!messages.length || messages[messages.length - 1]?.role !== "user") {
    return NextResponse.json({ message: "Envie ao menos uma mensagem válida do usuário." }, { status: 400 })
  }

  const client = getOpenAIClient()
  const model = getSecretaryModel()

  const stream = new ReadableStream({
    async start(controller) {
      let carry = ""
      let readingMeta = false
      let streamedVisibleText = ""
      let streamedMetaText = ""
      let fallbackRawText = ""
      let incompleteReason: string | null = null
      let responseId: string | null = null

      const pushChunk = (chunk: string) => {
        if (!chunk) {
          return
        }

        if (readingMeta) {
          streamedMetaText += chunk
          return
        }

        const combined = carry + chunk
        const markerIndex = combined.indexOf(MARKER)

        if (markerIndex !== -1) {
          const visiblePart = combined.slice(0, markerIndex)

          if (visiblePart) {
            streamedVisibleText += visiblePart
            sendEvent(controller, "delta", { text: visiblePart })
          }

          readingMeta = true
          streamedMetaText += combined.slice(markerIndex + MARKER.length)
          carry = ""
          return
        }

        const keepSize = MARKER.length - 1

        if (combined.length <= keepSize) {
          carry = combined
          return
        }

        const safeText = combined.slice(0, combined.length - keepSize)
        carry = combined.slice(combined.length - keepSize)

        if (safeText) {
          streamedVisibleText += safeText
          sendEvent(controller, "delta", { text: safeText })
        }
      }

      try {
        const responseStream = await client.responses.create({
          model,
          instructions: buildSecretarySystemPrompt(body.pagePath),
          input: messages,
          reasoning: {
            effort: "minimal",
          },
          text: {
            verbosity: "low",
          },
          max_output_tokens: 700,
          store: false,
          stream: true,
        })

        for await (const event of responseStream) {
          if (event.type === "response.created") {
            responseId = event.response.id
          }

          if (event.type === "response.output_text.delta") {
            pushChunk(event.delta)
          }

          if (event.type === "response.output_text.done") {
            fallbackRawText = event.text
          }

          if (event.type === "response.completed") {
            responseId = event.response.id
            fallbackRawText = event.response.output_text || fallbackRawText
          }

          if (event.type === "response.incomplete") {
            responseId = event.response.id
            incompleteReason = event.response.incomplete_details?.reason || "unknown"
            fallbackRawText = event.response.output_text || fallbackRawText
          }

          if (event.type === "response.failed") {
            const message = event.response.error?.message || "A Secretária IA encontrou um problema ao responder."
            console.error("[secretary] response.failed", {
              responseId: event.response.id,
              error: event.response.error,
            })
            sendEvent(controller, "error", { message })
            controller.close()
            return
          }
        }

        if (readingMeta) {
          streamedMetaText += carry
        } else if (carry) {
          streamedVisibleText += carry
          sendEvent(controller, "delta", { text: carry })
        }

        if (!streamedVisibleText.trim() && fallbackRawText.trim()) {
          const fallback = splitAssistantOutput(fallbackRawText)

          if (fallback.visibleText) {
            streamedVisibleText = fallback.visibleText
            sendEvent(controller, "delta", { text: fallback.visibleText })
          }

          if (fallback.rawMeta && !streamedMetaText.trim()) {
            streamedMetaText = fallback.rawMeta
          }
        }

        if (!streamedVisibleText.trim()) {
          const message = buildEmptyResponseMessage(incompleteReason)

          console.error("[secretary] empty assistant response", {
            incompleteReason,
            responseId,
          })

          sendEvent(controller, "error", { message })
          controller.close()
          return
        }

        sendEvent(controller, "meta", {
          leadState: parseLeadState(streamedMetaText),
          responseId,
        })
        sendEvent(controller, "done", { responseId })
        controller.close()
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "A Secretária IA encontrou um problema ao responder. Tente novamente."

        console.error("[secretary] route failure", {
          error,
          model,
          pagePath: body.pagePath ?? "/",
        })

        sendEvent(controller, "error", { message })
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  })
}
