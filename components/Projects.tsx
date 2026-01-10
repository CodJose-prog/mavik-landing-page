"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, Layout, Workflow } from "lucide-react";
import React from "react";
import { buildWhatsAppLink } from "../utils/whatsapp";

const projectCards: Array<{
  name: string;
  price: string;
  message: string;
  features: string[];
  icon: React.ElementType;
}> = [
  {
    name: "Sistema sob medida",
    price: "Orçamento sob consulta",
    message: "Olá! Quero orçamento para um sistema sob medida. Pode me orientar sobre prazos e próximos passos?",
    features: [
      "Mapeamento de processos",
      "Dashboard e perfis de acesso",
      "Fluxos personalizados",
      "Integrações sob consulta",
    ],
    icon: Workflow,
  },
  {
    name: "Site estratégico",
    price: "Orçamento sob consulta",
    message: "Olá! Quero orçamento para um site estratégico com foco em conversão.",
    features: [
      "Design premium e responsivo",
      "SEO e performance",
      "Integração com WhatsApp e formulários",
      "Entrega orientada a metas",
    ],
    icon: Layout,
  },
  {
    name: "Automações",
    price: "Orçamento sob consulta",
    message: "Olá! Quero orçamento para automações e integrações de processos.",
    features: [
      "Integrações com ferramentas",
      "Rotinas inteligentes",
      "Alertas e notificações",
      "Monitoramento básico",
    ],
    icon: Cpu,
  },
];

const projectSteps = [
  "Briefing rápido",
  "Escopo e cronograma",
  "Desenvolvimento",
  "Entrega + manutenção opcional",
];

export default function Projects() {
  return (
    <section id="sob-medida" className="section-shell py-16">
      <div className="mb-8 flex flex-col gap-3">
        <p className="text-sm font-semibold text-mavik-primary">Sob medida</p>
        <h2 className="text-3xl font-bold text-mavik-dark sm:text-4xl">Projetos personalizados via WhatsApp</h2>
        <p className="max-w-3xl text-mavik-dark/70">
          Desenvolvemos sistemas, sites e automações de acordo com sua operação. O orçamento é fechado no WhatsApp e
          alinhamos prazos e entregas por lá.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projectCards.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.05 }}
            className="relative flex h-full flex-col rounded-2xl border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur-lg"
          >
            <div className="flex flex-1 flex-col">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mavik-light text-mavik-primary">
                  <project.icon className="h-6 w-6" aria-hidden />
                </div>
                <div className="flex min-h-[60px] flex-col justify-start gap-1">
                  <h3 className="text-lg font-bold leading-tight text-mavik-dark line-clamp-2">
                    {project.name}
                  </h3>
                  <p className="text-sm font-semibold leading-snug text-mavik-secondary">
                    {project.price}
                  </p>
                </div>
              </div>
              <ul className="mt-5 flex-1 space-y-2 list-none text-sm text-mavik-dark/80">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-[6px] inline-flex h-2 w-2 shrink-0 rounded-full bg-mavik-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <a
                href={buildWhatsAppLink(project.message)}
                target="_blank"
                rel="noreferrer"
                aria-label={`Solicitar orçamento de ${project.name}`}
                className="inline-flex w-full items-center justify-center rounded-full bg-mavik-primary px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-mavik-secondary"
              >
                Solicitar orçamento
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur-lg">
        <h3 className="text-lg font-bold text-mavik-dark">Como funciona um projeto</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projectSteps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.05 }}
              className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-soft"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mavik-primary/10 text-sm font-bold text-mavik-primary">
                {index + 1}
              </span>
              <p className="text-sm font-semibold text-mavik-dark">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

