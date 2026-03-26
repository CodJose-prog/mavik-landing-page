"use client"

import { useEffect, useMemo, useRef } from "react"
import { motion } from "framer-motion"
import { Bot, UserRound } from "lucide-react"
import type { SecretaryMessage } from "../../lib/assistant/types"
import { cn } from "../../lib/cn"
import SecretaryInlineWhatsAppCTA from "./SecretaryInlineWhatsAppCTA"
import SecretaryTyping from "./SecretaryTyping"

type SecretaryMessageListProps = {
  canSendToWhatsApp: boolean
  isStreaming: boolean
  messages: SecretaryMessage[]
  onWhatsAppClick: () => void
  whatsappHref: string
}

export default function SecretaryMessageList({
  canSendToWhatsApp,
  isStreaming,
  messages,
  onWhatsAppClick,
  whatsappHref,
}: SecretaryMessageListProps) {
  const endRef = useRef<HTMLDivElement | null>(null)

  const lastAssistantMessageId = useMemo(() => {
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      if (messages[index]?.role === "assistant") {
        return messages[index]?.id ?? null
      }
    }

    return null
  }, [messages])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [isStreaming, messages])

  return (
    <div
      className="flex min-h-0 flex-1 flex-col gap-4 overflow-x-hidden overflow-y-auto pr-0.5 sm:gap-5 sm:pr-1"
      role="log"
      aria-live="polite"
      aria-relevant="additions text"
    >
      {messages.map((message) => {
        const isAssistant = message.role === "assistant"
        const Icon = isAssistant ? Bot : UserRound
        const shouldRenderInlineCTA =
          canSendToWhatsApp &&
          !isStreaming &&
          isAssistant &&
          message.status !== "streaming" &&
          message.id === lastAssistantMessageId

        return (
          <motion.article
            key={message.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className={cn("flex min-w-0", isAssistant ? "justify-start" : "justify-end")}
          >
            <div className={cn("max-w-[93%] min-w-0 space-y-1.5 sm:max-w-[84%] sm:space-y-2", !isAssistant && "items-end text-right")}>
              <div
                className={cn(
                  "flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] sm:gap-2 sm:text-[10px] sm:tracking-[0.22em]",
                  isAssistant ? "text-mavik-copper" : "justify-end text-mavik-muted"
                )}
              >
                {isAssistant ? <Icon className="h-3.5 w-3.5" aria-hidden /> : null}
                <span>{isAssistant ? "MAVIK" : "Seu contexto"}</span>
                {!isAssistant ? <Icon className="h-3.5 w-3.5" aria-hidden /> : null}
              </div>

              <div
                className={cn(
                  "rounded-[20px] px-3.5 py-3 text-[13px] leading-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] sm:rounded-[24px] sm:px-4 sm:py-3.5 sm:text-sm sm:leading-7",
                  isAssistant
                    ? "border border-mavik-line bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] text-mavik-text"
                    : "border border-[rgba(123,103,255,0.18)] bg-[rgba(123,103,255,0.1)] text-mavik-text"
                )}
              >
                {message.status === "streaming" && !message.content ? (
                  <SecretaryTyping />
                ) : (
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                )}
              </div>

              {shouldRenderInlineCTA ? (
                <div className="pt-1 sm:pt-1.5">
                  <SecretaryInlineWhatsAppCTA href={whatsappHref} onClick={onWhatsAppClick} />
                </div>
              ) : null}
            </div>
          </motion.article>
        )
      })}

      <div ref={endRef} />
    </div>
  )
}
