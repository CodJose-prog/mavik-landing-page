import { homeContent } from "../../lib/content/home"
import CaseCard from "../cards/CaseCard"
import CTAButton from "../shared/CTAButton"
import SectionContainer from "../shared/SectionContainer"
import SectionHeading from "../shared/SectionHeading"

export default function CasesSection() {
  const { casesSection } = homeContent

  return (
    <section className="py-24 sm:py-28 lg:py-32" id="cases">
      <SectionContainer>
        <div className="space-y-10">
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px] xl:items-end">
            <SectionHeading
              eyebrow={casesSection.eyebrow}
              title={casesSection.title}
              description={casesSection.description}
              className="max-w-3xl"
            />

            <aside className="relative rounded-[28px] border border-mavik-line bg-white/[0.03] p-5 sm:p-6">
              <div className="hairline absolute inset-x-8 top-0 h-px" aria-hidden />
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">
                {casesSection.overview.title}
              </p>
              <p className="mt-3 text-sm leading-6 text-mavik-muted">{casesSection.overview.description}</p>
            </aside>
          </div>

          <div className="grid gap-5 xl:grid-cols-2">
            {casesSection.items.map((item) => (
              <CaseCard
                key={item.title}
                label={item.label}
                title={item.title}
                summary={item.summary}
                solutionType={item.solutionType}
              />
            ))}
          </div>

          <div className="panel-strong relative overflow-hidden rounded-[34px] border border-[rgba(123,103,255,0.18)] p-6 sm:p-8">
            <div className="hairline absolute inset-x-8 top-0 h-px" aria-hidden />

            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mavik-copper">Portfólio</p>
                <h3 className="font-display text-2xl font-semibold tracking-[-0.05em] text-mavik-text sm:text-3xl">
                  {casesSection.ctaPanel.title}
                </h3>
                <p className="max-w-3xl text-base leading-7 text-mavik-muted">{casesSection.ctaPanel.description}</p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <CTAButton
                  href={casesSection.ctaPanel.primaryCta.href}
                  external={casesSection.ctaPanel.primaryCta.external}
                >
                  {casesSection.ctaPanel.primaryCta.label}
                </CTAButton>
                <CTAButton href={casesSection.ctaPanel.secondaryCta.href} variant="secondary">
                  {casesSection.ctaPanel.secondaryCta.label}
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
