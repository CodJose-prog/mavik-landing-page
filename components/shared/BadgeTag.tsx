import { cn } from "../../lib/cn"

type BadgeTagProps = {
  children: React.ReactNode
  className?: string
}

export default function BadgeTag({ children, className }: BadgeTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[rgba(246,247,255,0.08)] bg-[rgba(123,103,255,0.08)] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.26em] text-mavik-muted-strong",
        className
      )}
    >
      {children}
    </span>
  )
}
