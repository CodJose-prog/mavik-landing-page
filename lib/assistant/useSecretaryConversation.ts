"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { trackSecretaryEvent } from "./analytics"
import { streamSecretaryResponse } from "./client"
import { SECRETARY_STORAGE_KEY, secretaryWelcomeMessage } from "./config"
import { emptyLeadState, mergeLeadState, normalizeLeadState } from "./lead"
import { ensureTriageClosing } from "./response"
import type {
  SecretaryLeadState,
  SecretaryMessage,
  SecretaryRequestBody,
  SecretaryRequestMessage,
} from "./types"

type StoredConversation = {
  messages: SecretaryMessage[]
  leadState: SecretaryLeadState
}

function createMessage(role: SecretaryMessage["role"], content: string, status?: SecretaryMessage["status"]): SecretaryMessage {
  return {
    id: globalThis.crypto?.randomUUID?.() ?? `${role}-${Date.now()}`,
    role,
    content,
    createdAt: new Date().toISOString(),
    status: status ?? "ready",
  }
}

function isValidStoredMessage(message: unknown): message is SecretaryMessage {
  if (!message || typeof message !== "object") {
    return false
  }

  const candidate = message as SecretaryMessage

  if (
    typeof candidate.id !== "string" ||
    (candidate.role !== "assistant" && candidate.role !== "user") ||
    typeof candidate.content !== "string" ||
    typeof candidate.createdAt !== "string"
  ) {
    return false
  }

  return candidate.content.trim().length > 0
}

function loadStoredConversation(): StoredConversation | null {
  if (typeof window === "undefined") {
    return null
  }

  const raw = window.sessionStorage.getItem(SECRETARY_STORAGE_KEY)

  if (!raw) {
    return null
  }

  try {
    const parsed = JSON.parse(raw) as Partial<StoredConversation>
    const storedMessages = Array.isArray(parsed.messages) ? parsed.messages.filter(isValidStoredMessage) : []

    return {
      messages: storedMessages.length ? storedMessages : [secretaryWelcomeMessage],
      leadState: normalizeLeadState(parsed.leadState),
    }
  } catch {
    window.sessionStorage.removeItem(SECRETARY_STORAGE_KEY)
    return null
  }
}

function isAbortError(error: unknown) {
  return (
    (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") ||
    (error instanceof Error && error.name === "AbortError")
  )
}

function toRequestMessages(messages: SecretaryMessage[]): SecretaryRequestMessage[] {
  return messages
    .filter((message) => message.role === "assistant" || message.role === "user")
    .filter((message) => message.status !== "error")
    .filter((message) => message.content.trim().length > 0)
    .map((message) => ({
      role: message.role,
      content: message.content,
    }))
}

function normalizeStreamError(error: unknown) {
  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  return "A Secretária IA não conseguiu concluir a resposta agora."
}

export function useSecretaryConversation(pagePath: string) {
  const [initialConversation] = useState<StoredConversation | null>(() => loadStoredConversation())
  const [messages, setMessages] = useState<SecretaryMessage[]>(
    () => initialConversation?.messages ?? [secretaryWelcomeMessage]
  )
  const [leadState, setLeadState] = useState<SecretaryLeadState>(() => normalizeLeadState(initialConversation?.leadState))
  const [status, setStatus] = useState<"idle" | "streaming" | "error">("idle")
  const [error, setError] = useState<string | null>(null)
  const [draft, setDraft] = useState("")

  const leadStateRef = useRef<SecretaryLeadState>(normalizeLeadState(initialConversation?.leadState))
  const lastPayloadRef = useRef<SecretaryRequestBody | null>(null)
  const requestControllerRef = useRef<AbortController | null>(null)

  useEffect(() => {
    leadStateRef.current = leadState
  }, [leadState])

  useEffect(() => {
    const conversationToPersist: StoredConversation = {
      messages: messages.filter(
        (message) => message.status !== "streaming" && message.content.trim().length > 0
      ),
      leadState,
    }

    window.sessionStorage.setItem(SECRETARY_STORAGE_KEY, JSON.stringify(conversationToPersist))
  }, [leadState, messages])

  useEffect(() => {
    return () => {
      requestControllerRef.current?.abort()
    }
  }, [])

  const isTriageComplete = useMemo(() => leadState.qualification?.isComplete ?? false, [leadState])

  const sendRequest = useCallback(async (payload: SecretaryRequestBody, assistantMessageId: string) => {
    requestControllerRef.current?.abort()
    requestControllerRef.current = new AbortController()

    lastPayloadRef.current = payload
    setStatus("streaming")
    setError(null)

    let receivedAssistantText = ""
    let responseCompleted = false

    try {
      await streamSecretaryResponse(payload, {
        signal: requestControllerRef.current.signal,
        onDelta: ({ text }) => {
          if (typeof text !== "string" || text.length === 0) {
            return
          }

          receivedAssistantText += text

          setMessages((current) =>
            current.map((message) =>
              message.id === assistantMessageId
                ? {
                    ...message,
                    content: message.content + text,
                    status: "streaming",
                  }
                : message
            )
          )
        },
        onMeta: ({ leadState: incomingLeadState }) => {
          setLeadState((current) => {
            const mergedLeadState = mergeLeadState(current, incomingLeadState)
            leadStateRef.current = mergedLeadState
            return mergedLeadState
          })
        },
        onDone: () => {
          responseCompleted = true
          const finalizedAssistantText = ensureTriageClosing(
            receivedAssistantText,
            leadStateRef.current.qualification?.isComplete ?? false
          )

          if (!finalizedAssistantText.trim()) {
            const message =
              "A Secretária IA não retornou texto válido. Tente novamente ou continue no WhatsApp da MAVIK."

            console.error("[secretary] completed without assistant text", {
              assistantMessageId,
              payload,
            })

            setMessages((current) => current.filter((item) => item.id !== assistantMessageId))
            setStatus("error")
            setError(message)
            trackSecretaryEvent({
              name: "response_failed",
              leadState: leadStateRef.current,
            })
            return
          }

          setMessages((current) =>
            current.map((message) =>
              message.id === assistantMessageId
                ? {
                    ...message,
                    content: finalizedAssistantText,
                    status: "ready",
                  }
                : message
            )
          )
          setStatus("idle")
          trackSecretaryEvent({
            name: "response_completed",
            leadState: leadStateRef.current,
          })
        },
      })

      if (!responseCompleted) {
        throw new Error("A resposta da Secretária IA foi interrompida antes da conclusão.")
      }
    } catch (streamError) {
      if (isAbortError(streamError)) {
        setMessages((current) => current.filter((item) => item.id !== assistantMessageId))
        setStatus("idle")
        return
      }

      const message = normalizeStreamError(streamError)

      console.error("[secretary] frontend stream failure", {
        assistantMessageId,
        error: streamError,
      })

      setMessages((current) => current.filter((item) => item.id !== assistantMessageId))
      setStatus("error")
      setError(message)
      trackSecretaryEvent({
        name: "response_failed",
        leadState: leadStateRef.current,
      })
    }
  }, [])

  const sendMessage = useCallback(
    async (rawValue: string, source = "widget") => {
      const content = rawValue.trim()

      if (!content || status === "streaming") {
        return
      }

      const userMessage = createMessage("user", content)
      const assistantMessage = createMessage("assistant", "", "streaming")
      const nextConversation = [...messages, userMessage]
      const payload: SecretaryRequestBody = {
        messages: toRequestMessages(nextConversation),
        pagePath,
      }

      setMessages([...nextConversation, assistantMessage])
      setDraft("")
      setError(null)

      trackSecretaryEvent({
        name: "message_sent",
        messageLength: content.length,
        leadState: leadStateRef.current,
        source,
      })

      await sendRequest(payload, assistantMessage.id)
    },
    [messages, pagePath, sendRequest, status]
  )

  const retryLast = useCallback(async () => {
    if (!lastPayloadRef.current || status === "streaming") {
      return
    }

    const assistantMessage = createMessage("assistant", "", "streaming")
    setMessages((current) => [...current, assistantMessage])
    setError(null)
    await sendRequest(lastPayloadRef.current, assistantMessage.id)
  }, [sendRequest, status])

  const resetConversation = useCallback(() => {
    requestControllerRef.current?.abort()
    setMessages([secretaryWelcomeMessage])
    setLeadState(emptyLeadState)
    leadStateRef.current = emptyLeadState
    setStatus("idle")
    setError(null)
    setDraft("")
    lastPayloadRef.current = null
    window.sessionStorage.removeItem(SECRETARY_STORAGE_KEY)
  }, [])

  return {
    canSendToWhatsApp: isTriageComplete,
    draft,
    error,
    leadState,
    messages,
    resetConversation,
    retryLast,
    sendMessage,
    setDraft,
    status,
  }
}
