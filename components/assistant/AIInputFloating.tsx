"use client"

import { forwardRef, useId, useMemo, useState, type KeyboardEvent } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Loader2, SendHorizontal, Sparkles } from "lucide-react"
import { detectSecretaryIntent } from "../../lib/assistant/intents"
import { cn } from "../../lib/cn"

type AIInputFloatingProps = {
  canSendToWhatsApp?: boolean
  hasConversation?: boolean
  isBusy?: boolean
  onChange: (value: string) => void
  onSubmit: (value: string) => void | Promise<void>
  value: string
  whatsappHref: string
}

const continuationMeta = {
  title: "Continue a conversa",
  helper:
    "O contexto anterior foi mantido. Se quiser, complemente algum detalhe da triagem ou refine o pedido antes de seguir.",
  prompts: [
    "Quero retomar a conversa",
    "Quero complementar o contexto do projeto",
    "Quero refinar objetivo e urgência",
  ],
  suggestWhatsApp: false,
}

const AIInputFloating = forwardRef<HTMLInputElement, AIInputFloatingProps>(function AIInputFloating(
  {
    canSendToWhatsApp = false,
    hasConversation = false,
    isBusy = false,
    onChange,
    onSubmit,
    value,
    whatsappHref,
  },
  ref
) {
  const reduceMotion = useReducedMotion()
  const inputId = useId()
  const [isFocused, setIsFocused] = useState(false)

  const trimmedValue = value.trim()
  const detectedIntent = useMemo(() => detectSecretaryIntent(value), [value])

  const displayIntent = useMemo(() => {
    if (!trimmedValue && hasConversation) {
      return {
        intent: "commercial" as const,
        ...continuationMeta,
      }
    }

    return detectedIntent
  }, [detectedIntent, hasConversation, trimmedValue])

  const isExpanded = isFocused || Boolean(trimmedValue)

  function handleSubmit(nextValue = value) {
    const content = nextValue.trim()

    if (!content || isBusy) {
      return
    }

    void onSubmit(content)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") {
      return
    }

    event.preventDefault()
    handleSubmit()
  }

  return (
    <div
      className="relative w-full max-w-[620px]"
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget as Node | null

        if (event.currentTarget.contains(nextTarget)) {
          return
        }

        setIsFocused(false)
      }}
    >
      <AnimatePresence initial={false}>
        {isExpanded ? (
          <motion.div
            key="secretary-input-prompts"
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
            className="panel absolute inset-x-0 bottom-full mb-2.5 overflow-hidden rounded-[22px] border border-white/10 bg-[rgba(8,10,22,0.94)] p-3.5 backdrop-blur-2xl sm:mb-3 sm:rounded-[24px] sm:p-5"
          >
            <div className="hairline absolute inset-x-10 top-0 h-px" aria-hidden />

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-mavik-copper sm:tracking-[0.24em]">
              Orientação inicial
            </p>

            <div className="mt-3 space-y-2">
              <p className="font-display text-[1rem] font-semibold tracking-[-0.03em] text-mavik-text sm:text-[1.05rem]">
                {displayIntent.title}
              </p>
              <p className="text-[13px] leading-5 text-mavik-muted sm:text-sm sm:leading-6">{displayIntent.helper}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {displayIntent.prompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => handleSubmit(prompt)}
                  className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[13px] font-medium text-mavik-text transition duration-300 hover:border-[rgba(123,103,255,0.3)] hover:bg-[rgba(123,103,255,0.12)] hover:text-white focus-visible:outline-none sm:px-3.5 sm:text-sm"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
              <p className="text-[10px] leading-4 text-mavik-muted sm:text-[11px] sm:leading-5">
                Enter abre a conversa completa da Secretária IA com continuidade do contexto.
              </p>

              {canSendToWhatsApp ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(123,103,255,0.24)] bg-[rgba(123,103,255,0.1)] px-3 py-2 text-[10px] font-semibold tracking-[0.02em] text-mavik-text transition duration-300 hover:bg-[rgba(123,103,255,0.18)] sm:px-3.5 sm:text-[11px]"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                  <span>Enviar no WhatsApp da MAVIK</span>
                </a>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{
          scale: isExpanded ? 1 : 0.985,
          y: isExpanded ? 0 : 4,
        }}
        transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
        className={cn(
          "panel-strong relative overflow-hidden rounded-[22px] border bg-[rgba(9,12,24,0.84)] shadow-[0_20px_48px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition duration-300 sm:rounded-[28px] sm:shadow-[0_24px_60px_rgba(0,0,0,0.32)]",
          isExpanded
            ? "border-[rgba(123,103,255,0.34)] shadow-[0_28px_72px_rgba(0,0,0,0.38)]"
            : "border-white/10 hover:-translate-y-[1px] hover:shadow-[0_28px_64px_rgba(0,0,0,0.34)]"
        )}
      >
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              "radial-gradient(circle at 18% 0%, rgba(123, 103, 255, 0.18), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.04), transparent 52%)",
          }}
        />

        <div className="relative flex items-center gap-2.5 px-3 py-3 sm:gap-3 sm:px-5 sm:py-4">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-[16px] border transition duration-300 sm:h-11 sm:w-11 sm:rounded-[18px]",
              isExpanded || trimmedValue
                ? "border-[rgba(123,103,255,0.26)] bg-[rgba(123,103,255,0.12)] text-mavik-text"
                : "border-white/10 bg-white/[0.04] text-mavik-copper"
            )}
          >
            <Sparkles className="h-4.5 w-4.5" aria-hidden />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex items-center justify-between gap-3">
              <p className="truncate text-[9px] font-semibold uppercase tracking-[0.18em] text-mavik-muted sm:text-[10px] sm:tracking-[0.22em]">
                {hasConversation && !trimmedValue ? "Conversa pronta para retomar" : "Secretária IA MAVIK"}
              </p>

              <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-mavik-muted sm:inline-flex">
                {trimmedValue ? displayIntent.title : canSendToWhatsApp ? "Triagem concluída" : "Canal comercial assistido"}
              </span>
            </div>

            <label htmlFor={inputId} className="sr-only">
              Escreva o que deseja saber para iniciar a conversa com a Secretária IA
            </label>
            <input
              id={inputId}
              ref={ref}
              type="text"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="O que deseja saber?"
              className="w-full bg-transparent text-[14px] text-mavik-text outline-none placeholder:text-[#9299b7] sm:text-base"
              autoComplete="off"
              spellCheck={false}
              aria-describedby={`${inputId}-hint`}
            />

            <p id={`${inputId}-hint`} className="mt-1 text-[10px] leading-4 text-mavik-muted sm:text-[11px] sm:leading-5">
              {canSendToWhatsApp
                ? "A triagem já está pronta. Se quiser, complemente algo antes de enviar a mensagem para o WhatsApp."
                : "Descreva o contexto do projeto e a Secretária IA organiza o próximo passo com mais clareza."}
            </p>
          </div>

          <motion.button
            type="button"
            onClick={() => handleSubmit()}
            disabled={isBusy || !trimmedValue}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className={cn(
              "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border transition duration-300 sm:h-12 sm:w-12 sm:rounded-[18px]",
              isBusy || !trimmedValue
                ? "cursor-not-allowed border-white/10 bg-white/[0.04] text-mavik-muted"
                : "border-[rgba(123,103,255,0.3)] bg-[rgba(123,103,255,0.18)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22)] hover:-translate-y-px hover:bg-[rgba(123,103,255,0.28)]"
            )}
            aria-label="Abrir a Secretária IA e enviar mensagem"
          >
            {isBusy ? (
              <Loader2 className="h-4.5 w-4.5 animate-spin" aria-hidden />
            ) : (
              <SendHorizontal className="h-4.5 w-4.5" aria-hidden />
            )}
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
})

export default AIInputFloating
