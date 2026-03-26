import { homeContent } from "../../lib/content/home"
import SectionContainer from "../shared/SectionContainer"
import SectionHeading from "../shared/SectionHeading"

export default function ProcessSection() {
  const { processSection } = homeContent

  return (
    <section className="py-24 sm:py-28 lg:py-32" id="processo">
      <SectionContainer>
        <div className="space-y-10">
          <SectionHeading
            eyebrow={processSection.eyebrow}
            title={processSection.title}
            description={processSection.description}
            align="center"
            className="max-w-4xl"
          />

          <div className="panel relative overflow-hidden rounded-[30px] p-5 sm:p-6">
            <div className="hairline absolute inset-x-8 top-0 h-px" aria-hidden />

            <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">
                  Lógica de condução
                </p>
                <p className="mt-3 max-w-[42rem] text-sm leading-7 text-mavik-muted">
                  O trabalho avança por entendimento, definição, execução e continuidade.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {processSection.items.map((item, index) => (
                  <span
                    key={item.title}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-mavik-muted-strong"
                  >
                    0{index + 1} {item.title}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="panel-strong rounded-[34px] p-5 sm:p-6 lg:p-8">
            <div className="grid gap-4 lg:grid-cols-2">
              {processSection.items.map((item, index) => (
                <article
                  key={item.title}
                  className="relative overflow-hidden rounded-[28px] border border-mavik-line bg-white/[0.03] px-5 py-6 sm:px-6"
                >
                  <div className="hairline absolute inset-x-8 top-0 h-px" aria-hidden />

                  <div className="relative space-y-5">
                    <div className="flex items-center gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-[18px] border border-[rgba(123,103,255,0.28)] bg-[rgba(123,103,255,0.08)] text-sm font-semibold text-mavik-copper">
                        0{index + 1}
                      </span>
                      <div className="hairline h-px flex-1" aria-hidden />
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-display text-[1.45rem] font-semibold tracking-[-0.04em] text-mavik-text">
                        {item.title}
                      </h3>
                      <p className="text-base leading-8 text-mavik-muted">{item.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
