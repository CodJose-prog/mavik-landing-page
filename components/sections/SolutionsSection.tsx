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
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px] xl:items-end">
            <SectionHeading
              eyebrow={solutionsSection.eyebrow}
              title={solutionsSection.title}
              description={solutionsSection.description}
              className="max-w-4xl"
            />

            <div className="rounded-[28px] border border-mavik-line bg-white/[0.03] p-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-mavik-copper">
                Critério de solução
              </p>
              <p className="mt-3 text-sm leading-7 text-mavik-muted">
                O formato do projeto muda conforme maturidade operacional, impacto esperado e necessidade real.
              </p>
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
