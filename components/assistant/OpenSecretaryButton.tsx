"use client"

import type { ReactNode } from "react"
import { MessageSquareText } from "lucide-react"
import CTAButton from "../shared/CTAButton"

type OpenSecretaryButtonProps = {
  children?: ReactNode
  className?: string
  size?: "md" | "sm"
  source?: string
  variant?: "assistant" | "ghost"
}

export default function OpenSecretaryButton({
  children,
  className,
  size = "md",
  source = "cta_button",
  variant = "assistant",
}: OpenSecretaryButtonProps) {
  return (
    <CTAButton
      action="openSecretary"
      source={source}
      size={size}
      variant={variant}
      className={className}
      icon={<MessageSquareText className="h-4 w-4 text-mavik-copper" aria-hidden />}
    >
      {children}
    </CTAButton>
  )
}
