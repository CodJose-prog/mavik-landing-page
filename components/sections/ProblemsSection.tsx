import { AlertCircle, Eye, Files, LayoutTemplate, ShieldAlert } from "lucide-react"
import { homeContent } from "../../lib/content/home"
import SectionContainer from "../shared/SectionContainer"
import SectionHeading from "../shared/SectionHeading"

const icons = [AlertCircle, Eye, Files, LayoutTemplate, ShieldAlert]

export default function ProblemsSection() {
  const { problemSection } = homeContent

  return (
    <section className="py-24 sm:py-28 lg:py-32" id="problemas">
      <SectionContainer>
        <div className="grid gap-12 xl:grid-cols-[360px_minmax(0,1fr)] xl:items-start">
          <div className="space-y-6 xl:sticky xl:top-28">
            <SectionHeading
              eyebrow={problemSection.eyebrow}
              title={problemSection.title}
              description={problemSection.description}
            />

            <div className="panel-strong rounded-[30px] p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">
                Leitura recorrente
              </p>
              <p className="mt-3 text-sm leading-7 text-mavik-muted-strong">
                O problema raramente é só técnico. Em geral, ele aparece como ruído operacional e perda de
                controle.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {problemSection.items.map((item, index) => {
              const Icon = icons[index] ?? AlertCircle

              return (
                <article
                  key={item.title}
                  className="panel group relative overflow-hidden rounded-[28px] px-5 py-6 sm:px-6 sm:py-7"
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
      </SectionContainer>
    </section>
  )
}
