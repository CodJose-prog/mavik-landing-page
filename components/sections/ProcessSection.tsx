import { homeContent } from "../../lib/content/home"
import SectionContainer from "../shared/SectionContainer"
import SectionHeading from "../shared/SectionHeading"

export default function ProcessSection() {
  const { processSection } = homeContent

  return (
    <section className="py-24 sm:py-28 lg:py-32" id="processo">
      <SectionContainer>
        <div className="space-y-12">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-end">
            <SectionHeading
              eyebrow={processSection.eyebrow}
              title={processSection.title}
              description={processSection.description}
              className="max-w-4xl"
            />

            <div className="rounded-[28px] border border-mavik-line bg-white/[0.03] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">
                Lógica de condução
              </p>
              <p className="mt-3 text-sm leading-7 text-mavik-muted">
                O trabalho avança por entendimento, definição, execução e continuidade.
              </p>
            </div>
          </div>

          <div className="panel-strong rounded-[34px] p-6 sm:p-8">
            <div className="space-y-8">
              {processSection.items.map((item, index) => (
                <article
                  key={item.title}
                  className="grid gap-5 border-b border-mavik-line pb-8 last:border-b-0 last:pb-0 lg:grid-cols-[96px_minmax(0,1fr)]"
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-[18px] border border-[rgba(123,103,255,0.28)] bg-[rgba(123,103,255,0.08)] text-sm font-semibold text-mavik-copper">
                      0{index + 1}
                    </span>
                    <div className="hairline mt-6 hidden h-px flex-1 lg:block" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-display text-[1.5rem] font-semibold tracking-[-0.04em] text-mavik-text">
                      {item.title}
                    </h3>
                    <p className="max-w-4xl text-base leading-8 text-mavik-muted">{item.description}</p>
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
