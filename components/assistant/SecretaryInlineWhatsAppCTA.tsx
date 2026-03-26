"use client"

import { ArrowUpRight, MessagesSquare } from "lucide-react"

type SecretaryInlineWhatsAppCTAProps = {
  href: string
  onClick: () => void
}

export default function SecretaryInlineWhatsAppCTA({
  href,
  onClick,
}: SecretaryInlineWhatsAppCTAProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-[16px] border border-[rgba(123,103,255,0.2)] bg-[rgba(123,103,255,0.14)] px-3.5 py-3 text-[13px] font-semibold text-mavik-text transition hover:-translate-y-px hover:bg-[rgba(123,103,255,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(123,103,255,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060912] sm:w-auto sm:rounded-[18px] sm:px-4 sm:text-sm"
    >
      <MessagesSquare className="h-4 w-4 shrink-0 text-mavik-copper" aria-hidden />
      <span className="text-center leading-5">Enviar no WhatsApp da MAVIK</span>
      <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
    </a>
  )
}
