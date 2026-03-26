import solutionsAsset from "../../public/assets/solucoes/Captura de tela 2026-03-26 145407.png"
import Image from "next/image"
import { Blocks, Globe, Smartphone, Waypoints, Workflow } from "lucide-react"
import { homeContent } from "../../lib/content/home"
import ServiceCard from "../cards/ServiceCard"
import SectionContainer from "../shared/SectionContainer"
import SectionHeading from "../shared/SectionHeading"

const icons = [Workflow, Smartphone, Blocks, Globe, Waypoints]

export default function SolutionsSection() {
  const { solutionsSection } = homeContent

  return (
    <section className="py-24 sm:py-28 lg:py-32" id="solucoes">
      <SectionContainer>
        <div className="space-y-10">
          <div className="panel-strong relative overflow-hidden rounded-[36px] px-5 py-6 sm:px-7 sm:py-8 lg:px-8 lg:py-9">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(123,103,255,0.2),transparent_62%)]"
              aria-hidden
            />

            <div className="relative space-y-8">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end">
                <SectionHeading
                  eyebrow={solutionsSection.eyebrow}
                  title={solutionsSection.title}
                  description={solutionsSection.description}
                  className="max-w-4xl"
                />

                <div className="rounded-[26px] border border-mavik-line bg-white/[0.03] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">
                    Critério de solução
                  </p>
                  <p className="mt-3 text-sm leading-7 text-mavik-muted">
                    O formato do projeto muda conforme maturidade operacional, impacto esperado e necessidade real.
                  </p>
                </div>
              </div>

              <div className="relative rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(11,14,27,0.94),rgba(7,9,18,0.98))] p-3 sm:p-4 lg:p-5">
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden />
                  <span className="h-2.5 w-2.5 rounded-full bg-[rgba(123,103,255,0.42)]" aria-hidden />
                  <span className="h-2.5 w-2.5 rounded-full bg-[rgba(216,215,255,0.42)]" aria-hidden />
                  <span className="ml-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-mavik-muted">
                    Ambiente de produto
                  </span>
                </div>

                <Image
                  src={solutionsAsset}
                  alt="Interface de sistema usada para representar a capacidade técnica da MAVIK em plataformas e sistemas"
                  sizes="(min-width: 1440px) 1180px, (min-width: 1024px) 92vw, 100vw"
                  placeholder="blur"
                  quality={92}
                  className="h-auto w-full rounded-[20px] border border-white/10 shadow-[0_24px_50px_rgba(0,0,0,0.34)]"
                />
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
                <div className="rounded-[24px] border border-[rgba(123,103,255,0.16)] bg-[rgba(123,103,255,0.08)] p-4 sm:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">
                    Capacidade técnica aplicada
                  </p>
                  <p className="mt-3 text-sm leading-7 text-mavik-muted-strong">
                    Interfaces, painéis e fluxos construídos com lógica de produto para uso real, manutenção e
                    evolução.
                  </p>
                </div>

                <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">
                    Leitura de entrega
                  </p>
                  <p className="mt-3 text-sm leading-7 text-mavik-muted">
                    O dashboard aparece como prova técnica, não como decoração. Ele reforça contexto de produto e
                    operação.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {solutionsSection.items.map((item, index) => {
              const Icon = icons[index] ?? Workflow

              return (
                <ServiceCard
                  key={item.title}
                  icon={Icon}
                  title={item.title}
                  description={item.description}
                  note={item.note}
                  featured={index === 0}
                />
              )
            })}
          </div>
        </div>
      </SectionContainer>
    </section>
  )
}
