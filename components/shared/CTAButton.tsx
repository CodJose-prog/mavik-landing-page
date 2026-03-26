"use client"

import type { MouseEvent, ReactNode } from "react"
import type { HTMLAttributeAnchorTarget } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { openSecretaryWidget } from "../../lib/assistant/widget"
import { cn } from "../../lib/cn"

type CTAButtonAction = "openSecretary"

type CTAButtonProps = {
  href?: string
  children?: ReactNode
  label?: string
  variant?: "primary" | "secondary" | "ghost" | "assistant"
  external?: boolean
  target?: HTMLAttributeAnchorTarget
  rel?: string
  size?: "md" | "sm"
  className?: string
  icon?: boolean | ReactNode
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
  scrollTo?: string
  action?: CTAButtonAction
  source?: string
}

const styles = {
  primary:
    "border border-[rgba(123,103,255,0.22)] bg-mavik-copper text-[#f7f7ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.32),0_14px_30px_rgba(0,0,0,0.18)] hover:-translate-y-px hover:bg-[#8f81ff]",
  secondary:
    "border border-mavik-line bg-white/[0.035] text-mavik-text shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:-translate-y-px hover:border-[rgba(123,103,255,0.34)] hover:bg-white/[0.06]",
  ghost:
    "border border-transparent bg-transparent text-mavik-muted-strong hover:bg-white/[0.03] hover:text-mavik-text",
  assistant:
    "border border-[rgba(123,103,255,0.2)] bg-[rgba(123,103,255,0.1)] text-mavik-text shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:-translate-y-px hover:border-[rgba(123,103,255,0.34)] hover:bg-[rgba(123,103,255,0.16)]",
} as const

const sizes = {
  md: "min-h-[52px] px-6 py-3.5 text-[0.95rem]",
  sm: "min-h-[44px] px-5 py-2.5 text-[0.84rem]",
} as const

function buildSectionHref(scrollTo?: string, href?: string) {
  if (href) {
    return href
  }

  return scrollTo ? `/#${scrollTo}` : undefined
}

export default function CTAButton({
  href,
  children,
  label,
  variant = "primary",
  external = false,
  target,
  rel,
  size = "md",
  className,
  icon = true,
  onClick,
  scrollTo,
  action,
  source,
}: CTAButtonProps) {
  const router = useRouter()
  const pathname = usePathname()
  const resolvedHref = buildSectionHref(scrollTo, href)
  const resolvedTarget = target ?? (external ? "_blank" : undefined)
  const resolvedRel = rel ?? (resolvedTarget === "_blank" ? "noopener noreferrer" : undefined)

  const content = (
    <>
      <span>{children ?? label}</span>
      {icon === true ? (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
      ) : null}
      {icon && icon !== true ? icon : null}
    </>
  )

  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-[16px] font-semibold tracking-[-0.01em] transition duration-200",
    styles[variant],
    sizes[size],
    className
  )

  const handleInteraction = (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (action === "openSecretary") {
      event.preventDefault()
      openSecretaryWidget({ focusInput: true, source })
    }

    if (scrollTo) {
      const section = document.getElementById(scrollTo)

      if (pathname === "/" && section) {
        event.preventDefault()
        section.scrollIntoView({ behavior: "smooth", block: "start" })

        const hash = `#${scrollTo}`
        if (window.location.hash !== hash) {
          window.history.replaceState(null, "", hash)
        }
      } else if (resolvedHref) {
        event.preventDefault()
        router.push(resolvedHref)
      }
    }

    onClick?.(event)
  }

  if (action || (!resolvedHref && onClick) || scrollTo) {
    return (
      <button type="button" onClick={handleInteraction} className={classes}>
        {content}
      </button>
    )
  }

  if (external && resolvedHref) {
    return (
      <a href={resolvedHref} target={resolvedTarget} rel={resolvedRel} className={classes} onClick={handleInteraction}>
        {content}
      </a>
    )
  }

  if (resolvedHref?.startsWith("#")) {
    return (
      <a href={resolvedHref} className={classes} onClick={handleInteraction}>
        {content}
      </a>
    )
  }

  if (resolvedHref) {
    return (
      <Link href={resolvedHref} className={classes} onClick={handleInteraction}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={handleInteraction} className={classes}>
      {content}
    </button>
  )
}
