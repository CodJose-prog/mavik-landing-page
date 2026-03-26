import type { LucideIcon } from "lucide-react"
import { cn } from "../../lib/cn"

type ServiceCardProps = {
  icon: LucideIcon
  title: string
  description: string
  note: string
  featured?: boolean
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  note,
  featured = false,
}: ServiceCardProps) {
  return (
    <article
      className={cn(
        "panel group relative overflow-hidden rounded-[30px] p-6 sm:p-7",
        featured && "panel-strong xl:col-span-2"
      )}
    >
      <div className="hairline absolute inset-x-8 top-0 h-px" aria-hidden />

      <div className={cn("relative", featured && "grid gap-6 xl:grid-cols-[minmax(0,1fr)_260px] xl:items-end")}>
        <div>
          <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-mavik-line bg-white/[0.04] text-mavik-copper transition duration-300 group-hover:border-[rgba(123,103,255,0.25)] group-hover:bg-[rgba(123,103,255,0.08)]">
            <Icon className="h-5 w-5" aria-hidden />
          </div>

          <div className="mt-5 space-y-3">
            <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-mavik-text">{title}</h3>
            <p className="text-base leading-7 text-mavik-muted">{description}</p>
          </div>
        </div>

        <div className="border-t border-mavik-line pt-4 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mavik-copper">Aplicação</p>
          <p className="mt-2.5 text-sm leading-6 text-mavik-muted-strong">{note}</p>
        </div>
      </div>
    </article>
  )
}
