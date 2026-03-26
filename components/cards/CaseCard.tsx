import BadgeTag from "../shared/BadgeTag"

type CaseCardProps = {
  label: string
  title: string
  summary: string
  solutionType: string
}

export default function CaseCard({ label, title, summary, solutionType }: CaseCardProps) {
  return (
    <article className="panel group relative overflow-hidden rounded-[30px] p-6 sm:p-7">
      <div
        className="absolute inset-0 opacity-70"
        aria-hidden
        style={{
          background:
            "radial-gradient(circle at top right, rgba(123,103,255,0.09), transparent 32%), radial-gradient(circle at left bottom, rgba(216,215,255,0.06), transparent 28%)",
        }}
      />
      <div className="hairline absolute inset-x-8 top-0 h-px" aria-hidden />

      <div className="relative space-y-6">
        <div className="flex flex-wrap gap-2">
          <BadgeTag>{label}</BadgeTag>
        </div>

        <div className="space-y-3">
          <h3 className="font-display text-[1.55rem] font-semibold tracking-[-0.05em] text-mavik-text sm:text-[1.8rem]">
            {title}
          </h3>
          <p className="max-w-3xl text-base leading-7 text-mavik-muted">{summary}</p>
        </div>

        <div className="border-t border-mavik-line pt-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mavik-copper">Tipo de solução</p>
          <p className="mt-2 text-sm leading-6 text-mavik-muted-strong">{solutionType}</p>
        </div>
      </div>
    </article>
  )
}
