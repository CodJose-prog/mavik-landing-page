import valueAsset from "../../public/assets/proposta_de_valor/Metaverse.jpg"
import { homeContent } from "../../lib/content/home"
import EditorialAsset from "../shared/EditorialAsset"
import SectionContainer from "../shared/SectionContainer"
import SectionHeading from "../shared/SectionHeading"

export default function ValuePropositionSection() {
  const { valueSection } = homeContent

  return (
    <section className="py-24 sm:py-28 lg:py-32" id="empresa">
      <SectionContainer>
        <div className="space-y-10">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <SectionHeading
              eyebrow={valueSection.eyebrow}
              title={valueSection.title}
              description={valueSection.description}
              className="max-w-[48rem]"
            />

            <div className="panel-strong rounded-[30px] p-5 sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">
                Leitura aplicada
              </p>
              <p className="mt-3 text-sm leading-7 text-mavik-muted-strong">{valueSection.complementary}</p>
            </div>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute inset-x-[12%] top-0 h-32 bg-[radial-gradient(circle_at_top,rgba(123,103,255,0.16),transparent_68%)]"
              aria-hidden
            />

            <EditorialAsset
              asset={valueAsset}
              alt="Pessoa em ambiente digital imersivo representando a relação entre humano e tecnologia"
              sizes="(min-width: 1440px) 1180px, (min-width: 1024px) 92vw, 100vw"
              quality={95}
              className="mx-auto aspect-[5/4] min-h-[360px] sm:aspect-[3/2] sm:min-h-0 lg:max-w-[1120px]"
              imageClassName="object-contain object-center px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8"
              baseOverlayClassName="bg-[linear-gradient(180deg,rgba(4,5,12,0.01)_0%,rgba(4,5,12,0.04)_70%,rgba(4,5,12,0.12)_100%)]"
              overlayClassName="bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.08),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(123,103,255,0.1),transparent_28%)]"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {valueSection.pillars.map((pillar, index) => (
              <article
                key={pillar.title}
                className={`panel relative overflow-hidden rounded-[28px] px-5 py-6 sm:px-6 sm:py-7 ${index === 1 ? "panel-strong" : ""}`}
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
