import { homeContent } from "../../lib/content/home"
import CaseCard from "../cards/CaseCard"
import CTAButton from "../shared/CTAButton"
import SectionContainer from "../shared/SectionContainer"
import SectionHeading from "../shared/SectionHeading"

const caseLayoutClassNames = ["xl:col-span-7", "xl:col-span-5", "xl:col-span-5", "xl:col-span-7"]

export default function CasesSection() {
  const { casesSection } = homeContent

  return (
    <section className="py-24 sm:py-28 lg:py-32" id="cases">
      <SectionContainer>
        <div className="space-y-10">
          <SectionHeading
            eyebrow={casesSection.eyebrow}
            title={casesSection.title}
            description={casesSection.description}
            align="center"
            className="max-w-4xl"
          />

          <div className="panel relative overflow-hidden rounded-[30px] p-5 sm:p-6">
            <div className="hairline absolute inset-x-8 top-0 h-px" aria-hidden />

            <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">
                  {casesSection.overview.title}
                </p>
                <p className="mt-3 max-w-[42rem] text-sm leading-7 text-mavik-muted">
                  {casesSection.overview.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {casesSection.overview.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-mavik-muted-strong"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5 xl:grid-cols-12">
            {casesSection.items.map((item, index) => (
              <div key={item.title} className={caseLayoutClassNames[index] ?? "xl:col-span-6"}>
                <CaseCard
                  label={item.label}
                  title={item.title}
                  summary={item.summary}
                  solutionType={item.solutionType}
                />
              </div>
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
