import { cn } from "../../lib/cn"

type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const isCentered = align === "center"

  return (
    <div className={cn("space-y-5", isCentered && "mx-auto text-center", className)}>
      {eyebrow ? (
        <div className={cn("flex items-center gap-4", isCentered && "justify-center")}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">{eyebrow}</p>
          <div className={cn("hairline h-px flex-1", isCentered ? "max-w-[160px]" : "max-w-[200px]")} aria-hidden />
        </div>
      ) : null}

      <div className={cn("space-y-3", isCentered && "mx-auto max-w-3xl")}>
        <h2
          className={cn(
            "font-display text-3xl font-semibold tracking-[-0.05em] text-balance text-mavik-text sm:text-[2.75rem] sm:leading-[1.04] lg:text-[3.3rem]",
            isCentered && "mx-auto"
          )}
        >
          {title}
        </h2>
        {description ? (
          <p className="max-w-[44rem] text-[1rem] leading-7 text-mavik-muted sm:text-[1.02rem]">{description}</p>
        ) : null}
      </div>
    </div>
  )
}
