import { homeContent } from "../../lib/content/home"
import SectionContainer from "../shared/SectionContainer"
import SectionHeading from "../shared/SectionHeading"

export default function ValuePropositionSection() {
  const { valueSection } = homeContent

  return (
    <section className="py-24 sm:py-28 lg:py-32" id="empresa">
      <SectionContainer>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-start xl:gap-14">
          <div className="space-y-6">
            <SectionHeading
              eyebrow={valueSection.eyebrow}
              title={valueSection.title}
              description={valueSection.description}
            />

            <div className="panel-strong rounded-[34px] p-6 sm:p-7">
              <p className="max-w-[40rem] text-[1.02rem] leading-7 text-mavik-muted">{valueSection.complementary}</p>
            </div>
          </div>

          <div className="space-y-4">
            {valueSection.pillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className="panel relative overflow-hidden rounded-[28px] px-5 py-6 sm:px-6 sm:py-7"
              >
                <div className="hairline absolute inset-x-8 top-0 h-px" aria-hidden />

                <div className="relative flex gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] border border-[rgba(123,103,255,0.24)] bg-[rgba(123,103,255,0.08)] text-sm font-semibold text-mavik-copper">
                    0{index + 1}
                  </span>
                  <div className="space-y-2.5">
                    <h3 className="font-display text-[1.35rem] font-semibold tracking-[-0.04em] text-mavik-text">
                      {pillar.title}
                    </h3>
                    <p className="text-base leading-7 text-mavik-muted">{pillar.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
