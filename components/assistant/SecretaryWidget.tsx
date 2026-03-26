"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, RefreshCw, Sparkles, X } from "lucide-react"
import { usePathname } from "next/navigation"
import { trackSecretaryEvent } from "../../lib/assistant/analytics"
import { SECRETARY_OPEN_EVENT } from "../../lib/assistant/config"
import { focusSecretaryInput } from "../../lib/assistant/widget"
import { buildSecretaryWhatsAppHref } from "../../lib/assistant/handoff"
import { useSecretaryConversation } from "../../lib/assistant/useSecretaryConversation"
import AIInputFloating from "./AIInputFloating"
import SecretaryComposer from "./SecretaryComposer"
import SecretaryMessageList from "./SecretaryMessageList"

const PANEL_ID = "mavik-secretary-panel"
const TITLE_ID = "mavik-secretary-title"

export default function SecretaryWidget() {
  const pathname = usePathname()
  const reduceMotion = useReducedMotion()
  const floatingInputRef = useRef<HTMLInputElement | null>(null)
  const textareaFocusRef = useRef<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const {
    canSendToWhatsApp,
    draft,
    error,
    leadState,
    messages,
    resetConversation,
    retryLast,
    sendMessage,
    setDraft,
    status,
  } = useSecretaryConversation(pathname)

  const isStreaming = status === "streaming"
  const hasMeaningfulConversation = messages.length > 1
  const whatsappHref = useMemo(() => buildSecretaryWhatsAppHref(leadState), [leadState])

  const restoreFloatingInputFocus = useCallback(() => {
    window.requestAnimationFrame(() => {
      floatingInputRef.current?.focus()
    })
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return
      }

      setIsOpen(false)
      restoreFloatingInputFocus()
      trackSecretaryEvent({
        name: "widget_closed",
        leadState,
      })
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, leadState, restoreFloatingInputFocus])

  useEffect(() => {
    const handleOpen = (event: Event) => {
      const detail = (event as CustomEvent<{ focusInput?: boolean; source?: string }>).detail
      const source = detail?.source ?? "inline_cta"

      setIsOpen((current) => {
        if (current && detail?.focusInput) {
          focusSecretaryInput()
          return current
        }

        if (!current) {
          trackSecretaryEvent({
            name: "widget_opened",
            leadState,
            source,
          })
        }

        return true
      })
    }

    window.addEventListener(SECRETARY_OPEN_EVENT, handleOpen)
    return () => window.removeEventListener(SECRETARY_OPEN_EVENT, handleOpen)
  }, [leadState])

  useEffect(() => {
    if (!isOpen) {
      if (textareaFocusRef.current !== null) {
        window.clearTimeout(textareaFocusRef.current)
        textareaFocusRef.current = null
      }
      return
    }

    textareaFocusRef.current = window.setTimeout(() => {
      const input = document.getElementById("mavik-secretary-input") as HTMLTextAreaElement | null
      input?.focus()
    }, 180)

    return () => {
      if (textareaFocusRef.current !== null) {
        window.clearTimeout(textareaFocusRef.current)
        textareaFocusRef.current = null
      }
    }
  }, [isOpen])

  const closeWidget = () => {
    setIsOpen(false)
    restoreFloatingInputFocus()
    trackSecretaryEvent({
      name: "widget_closed",
      leadState,
    })
  }

  const handleFloatingSubmit = (message: string) => {
    if (!message.trim() || isStreaming) {
      return
    }

    if (!isOpen) {
      setIsOpen(true)
      trackSecretaryEvent({
        name: "widget_opened",
        leadState,
        source: "floating_input",
      })
    }

    void sendMessage(message, "floating_input")
  }

  const handleWhatsAppClick = (source: string) => {
    trackSecretaryEvent({
      name: "handoff_clicked",
      leadState,
      source,
    })
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex justify-center p-2.5 sm:p-5">
        <div className="pointer-events-auto flex w-full max-w-[1120px] justify-center">
          <AnimatePresence>
            {isOpen ? (
              <>
                <motion.button
                  key="secretary-backdrop"
                  type="button"
                  aria-label="Fechar secretária IA"
                  className="fixed inset-0 bg-[rgba(5,8,13,0.44)] backdrop-blur-[3px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.18 }}
                  onClick={closeWidget}
                />

                <motion.section
                  key="secretary-panel"
                  id={PANEL_ID}
                  role="dialog"
                  aria-modal="false"
                  aria-labelledby={TITLE_ID}
                  initial={{ opacity: 0, y: 20, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 14, scale: 0.985 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
                  className="panel-strong relative flex h-[min(88dvh,780px)] max-h-[calc(100dvh-0.5rem)] w-full flex-col overflow-hidden rounded-[26px] border border-[rgba(243,237,228,0.08)] sm:h-[min(84vh,780px)] sm:max-h-[calc(100dvh-2.5rem)] sm:rounded-[32px]"
                >
                  <div className="hairline absolute inset-x-8 top-0 h-px" aria-hidden />

                  <header className="relative border-b border-mavik-line px-4 py-4 pr-[6.75rem] sm:px-6 sm:py-6 sm:pr-[8.25rem]">
                    <div className="space-y-2.5 sm:space-y-3">
                      <div className="flex min-w-0 flex-wrap items-center gap-2.5 sm:gap-3">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] border border-[rgba(123,103,255,0.18)] bg-[rgba(123,103,255,0.08)] text-mavik-copper sm:h-10 sm:w-10 sm:rounded-[16px]">
                          <Sparkles className="h-4.5 w-4.5" aria-hidden />
                        </span>

                        <div className="min-w-0">
                          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-mavik-copper sm:text-[10px] sm:tracking-[0.24em]">
                            Canal comercial assistido
                          </p>
                          <h2
                            id={TITLE_ID}
                            className="font-display text-[1.12rem] font-semibold tracking-[-0.04em] text-mavik-text sm:text-[1.35rem]"
                          >
                            Secretária IA da MAVIK
                          </h2>
                        </div>

                        <span className="rounded-full border border-mavik-line bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold tracking-[0.03em] text-mavik-muted-strong sm:px-3 sm:text-[11px] sm:tracking-[0.04em]">
                          Triagem institucional em tempo real
                        </span>
                      </div>

                      <p className="max-w-3xl text-[13px] leading-6 text-mavik-muted sm:text-sm sm:leading-7">
                        Triagem institucional para entender o cenário, organizar o pedido com clareza e preparar o
                        envio.
                      </p>
                    </div>

                    <div className="absolute right-4 top-4 z-[2] flex items-center gap-2">
                      {hasMeaningfulConversation ? (
                        <button
                          type="button"
                          onClick={resetConversation}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-mavik-line bg-white/[0.03] text-mavik-muted transition hover:border-[rgba(123,103,255,0.24)] hover:text-mavik-text"
                          aria-label="Reiniciar conversa"
                        >
                          <RefreshCw className="h-4 w-4" aria-hidden />
                        </button>
                      ) : null}

                      <button
                        type="button"
                        onClick={closeWidget}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-mavik-line bg-white/[0.03] text-mavik-muted transition hover:border-[rgba(123,103,255,0.24)] hover:text-mavik-text"
                        aria-label="Fechar secretária IA"
                      >
                        <X className="h-4.5 w-4.5" aria-hidden />
                      </button>
                    </div>
                  </header>

                  <div className="mx-auto flex min-h-0 w-full max-w-[980px] flex-1 flex-col gap-3 overflow-hidden px-3 py-3 sm:gap-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
                    {error ? (
                      <div className="rounded-[20px] border border-[rgba(123,103,255,0.18)] bg-[rgba(123,103,255,0.08)] p-3.5 sm:rounded-[24px] sm:p-4">
                        <p className="text-sm font-semibold text-mavik-text">A conversa não pôde continuar agora.</p>
                        <p className="mt-2 text-[13px] leading-6 text-mavik-muted sm:text-sm sm:leading-7">{error}</p>
                        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                          <button
                            type="button"
                            onClick={() => void retryLast()}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-[15px] border border-mavik-line bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-mavik-text transition hover:bg-white/[0.06] sm:w-auto sm:justify-start sm:rounded-[16px]"
                          >
                            <RefreshCw className="h-4 w-4" aria-hidden />
                            <span>Tentar novamente</span>
                          </button>
                          <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => handleWhatsAppClick("error_state")}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-[15px] border border-[rgba(123,103,255,0.18)] bg-[rgba(123,103,255,0.12)] px-4 py-2.5 text-sm font-semibold text-mavik-text transition hover:bg-[rgba(123,103,255,0.18)] sm:w-auto sm:justify-start sm:rounded-[16px]"
                          >
                            <ArrowUpRight className="h-4 w-4" aria-hidden />
                            <span>Abrir WhatsApp da MAVIK</span>
                          </a>
                        </div>
                      </div>
                    ) : null}

                    <SecretaryMessageList
                      canSendToWhatsApp={canSendToWhatsApp}
                      isStreaming={isStreaming}
                      messages={messages}
                      onWhatsAppClick={() => handleWhatsAppClick("chat_inline")}
                      whatsappHref={whatsappHref}
                    />
                  </div>

                  <div className="shrink-0 border-t border-mavik-line bg-[linear-gradient(180deg,rgba(5,8,13,0),rgba(5,8,13,0.24))]">
                    <div className="mx-auto w-full max-w-[980px] px-3 py-3 sm:px-5 sm:py-4 lg:px-6">
                      <SecretaryComposer
                        value={draft}
                        onChange={setDraft}
                        onSubmit={() => void sendMessage(draft)}
                        disabled={isStreaming}
                      />
                    </div>
                  </div>
                </motion.section>
              </>
            ) : (
              <AIInputFloating
                canSendToWhatsApp={canSendToWhatsApp}
                ref={floatingInputRef}
                hasConversation={hasMeaningfulConversation}
                isBusy={isStreaming}
                onChange={setDraft}
                onSubmit={handleFloatingSubmit}
                value={draft}
                whatsappHref={whatsappHref}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </MotionConfig>
  )
}
