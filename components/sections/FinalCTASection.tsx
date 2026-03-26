import OpenSecretaryButton from "../assistant/OpenSecretaryButton"
import { homeContent } from "../../lib/content/home"
import { primaryCtas } from "../../lib/site-links"
import CTAButton from "../shared/CTAButton"
import SectionContainer from "../shared/SectionContainer"
import SectionHeading from "../shared/SectionHeading"

export default function FinalCTASection() {
  const { finalCta } = homeContent

  return (
    <section className="py-24 sm:py-28 lg:py-32" id="cta-final">
      <SectionContainer>
        <div className="panel-strong relative overflow-hidden rounded-[38px] px-6 py-8 sm:px-10 sm:py-12">
          <div className="hairline absolute inset-x-8 top-0 h-px" aria-hidden />
          <div className="absolute -right-24 top-8 h-40 w-40 rounded-full bg-mavik-copper-soft blur-3xl" aria-hidden />

          <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
            <div className="space-y-6">
              <SectionHeading
                eyebrow={finalCta.eyebrow}
                title={finalCta.title}
                description={finalCta.description}
                className="max-w-[42rem]"
              />

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <CTAButton href={finalCta.primaryCta.href} external={finalCta.primaryCta.external}>
                  {finalCta.primaryCta.label}
                </CTAButton>
                <OpenSecretaryButton>{primaryCtas.talkToSecretary.label}</OpenSecretaryButton>
                <CTAButton
                  href={finalCta.secondaryCta.href}
                  scrollTo={finalCta.secondaryCta.scrollTo}
                  variant="ghost"
                  className="justify-start px-1 sm:px-3"
                >
                  {finalCta.secondaryCta.label}
                </CTAButton>
              </div>
            </div>

            <div className="rounded-[30px] border border-mavik-line bg-white/[0.03] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mavik-copper">Escopo de atuação</p>
              <p className="mt-4 text-sm leading-6 text-mavik-muted-strong">{finalCta.note}</p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
