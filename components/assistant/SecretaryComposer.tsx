"use client"

import { useEffect, useRef, type KeyboardEvent } from "react"
import { Loader2, SendHorizontal } from "lucide-react"
import { cn } from "../../lib/cn"

type SecretaryComposerProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  disabled?: boolean
}

export default function SecretaryComposer({
  value,
  onChange,
  onSubmit,
  disabled = false,
}: SecretaryComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    const element = textareaRef.current

    if (!element) {
      return
    }

    element.style.height = "0px"
    element.style.height = `${Math.min(element.scrollHeight, 156)}px`
  }, [value])

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className="rounded-[24px] border border-mavik-line bg-[#0a1017]/95 p-2.5 shadow-[0_16px_32px_rgba(0,0,0,0.14)] backdrop-blur sm:rounded-[28px] sm:p-4">
      <div className="flex flex-col gap-1 px-1.5 pb-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mavik-copper sm:text-[11px] sm:tracking-[0.22em]">
          Mensagem
        </p>
        <p className="text-[10px] leading-4 text-mavik-muted sm:text-[11px] sm:leading-5">
          Enter envia. Shift + Enter quebra linha.
        </p>
      </div>

      <div className="flex min-w-0 items-end gap-2 sm:gap-3">
        <label htmlFor="mavik-secretary-input" className="sr-only">
          Descreva o seu projeto
        </label>
        <textarea
          id="mavik-secretary-input"
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={disabled}
          placeholder="Descreva o contexto do projeto com clareza."
          className="max-h-40 min-h-[52px] min-w-0 flex-1 resize-none bg-transparent px-1.5 py-2.5 text-[14px] leading-6 text-mavik-text outline-none placeholder:text-mavik-muted sm:min-h-[56px] sm:px-2 sm:py-3 sm:text-sm sm:leading-7"
        />

        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || !value.trim()}
          className={cn(
            "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border transition duration-200 sm:h-12 sm:w-12 sm:rounded-[18px]",
            disabled || !value.trim()
              ? "cursor-not-allowed border-mavik-line bg-white/[0.04] text-mavik-muted"
              : "border-[rgba(123,103,255,0.2)] bg-mavik-copper text-[#f7f7ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.32)] hover:-translate-y-px hover:bg-[#8f81ff]"
          )}
          aria-label="Enviar mensagem para a Secretária IA"
        >
          {disabled ? (
            <Loader2 className="h-4.5 w-4.5 animate-spin" aria-hidden />
          ) : (
            <SendHorizontal className="h-4.5 w-4.5" aria-hidden />
          )}
        </button>
      </div>

      <p className="mt-2 px-1.5 text-[10px] leading-4 text-mavik-muted sm:px-2 sm:text-[11px] sm:leading-5">
        A Secretária IA qualifica o contexto e evita informar preço, prazo ou integração sem diagnóstico.
      </p>
    </div>
  )
}
