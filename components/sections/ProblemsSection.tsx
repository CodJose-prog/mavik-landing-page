import problemsAsset from "../../public/assets/problemas/8machine-_-oWFZm4NAvMQ-unsplash.jpg"
import { AlertCircle, Eye, Files, LayoutTemplate, ShieldAlert } from "lucide-react"
import { homeContent } from "../../lib/content/home"
import EditorialAsset from "../shared/EditorialAsset"
import SectionContainer from "../shared/SectionContainer"
import SectionHeading from "../shared/SectionHeading"

const icons = [AlertCircle, Eye, Files, LayoutTemplate, ShieldAlert]

export default function ProblemsSection() {
  const { problemSection } = homeContent

  return (
    <section className="py-24 sm:py-28 lg:py-32" id="problemas">
      <SectionContainer>
        <div className="space-y-10">
          <SectionHeading
            eyebrow={problemSection.eyebrow}
            title={problemSection.title}
            description={problemSection.description}
            className="max-w-[44rem]"
          />

          <div className="grid gap-4 xl:grid-cols-12 xl:items-start">
            <EditorialAsset
              asset={problemsAsset}
              alt="Estrutura mecânica fragmentada usada como metáfora para processos desconectados"
              sizes="(min-width: 1440px) 460px, (min-width: 1280px) 36vw, (min-width: 1024px) 42vw, 100vw"
              quality={92}
              className="min-h-[380px] xl:col-span-5 xl:min-h-[620px]"
              imageClassName="object-contain object-center px-5 py-5 sm:px-8 sm:py-8"
              baseOverlayClassName="bg-[linear-gradient(180deg,rgba(4,5,12,0.02)_0%,rgba(4,5,12,0.08)_64%,rgba(4,5,12,0.18)_100%)]"
              overlayClassName="bg-[radial-gradient(circle_at_48%_10%,rgba(255,255,255,0.08),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(123,103,255,0.1),transparent_30%)]"
            />

            <div className="space-y-4 xl:col-span-7">
              <div className="panel-strong relative overflow-hidden rounded-[30px] p-6">
                <div className="hairline absolute inset-x-8 top-0 h-px" aria-hidden />
                <div className="relative grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-end">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">
                      Leitura recorrente
                    </p>
                    <p className="mt-3 max-w-[38rem] text-sm leading-7 text-mavik-muted-strong">
                      O problema raramente é só técnico. Em geral, ele aparece como ruído operacional, retrabalho e
                      perda de controle.
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-[rgba(123,103,255,0.16)] bg-[rgba(123,103,255,0.06)] p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">
                      Sinal mais comum
                    </p>
                    <p className="mt-2 text-sm leading-6 text-mavik-muted">
                      A operação continua ativa, mas a estrutura já não acompanha o volume nem a complexidade.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {problemSection.items.map((item, index) => {
                  const Icon = icons[index] ?? AlertCircle
                  const featuredCardClassName = index === 0 ? "panel-strong md:col-span-2" : ""

                  return (
                    <article
                      key={item.title}
                      className={`panel group relative overflow-hidden rounded-[28px] px-5 py-6 sm:px-6 sm:py-7 ${featuredCardClassName}`}
                    >
                      <div className="hairline absolute inset-x-8 top-0 h-px" aria-hidden />

                      <div className="relative space-y-5">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-[18px] border border-mavik-line bg-white/[0.04] text-mavik-muted-strong transition duration-300 group-hover:border-[rgba(123,103,255,0.22)] group-hover:text-mavik-text">
                            <Icon className="h-5 w-5" aria-hidden />
                          </div>
                          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mavik-muted">
                            0{index + 1}
                          </span>
                        </div>

                        <div>
                          <h3 className="font-display text-xl font-semibold tracking-[-0.04em] text-mavik-text">
                            {item.title}
                          </h3>
                          <p className="mt-3 text-base leading-8 text-mavik-muted">{item.description}</p>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
