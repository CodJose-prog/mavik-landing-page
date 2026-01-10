"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { MAINTENANCE_PLANS } from "../src/lib/offerings";
import { openCheckout } from "../utils/checkout";

export default function Plans() {
  return (
    <section id="manutencao" className="section-shell py-16">
      <div className="mb-8 flex flex-col gap-3">
        <p className="text-sm font-semibold text-mavik-primary">Manutenção</p>
        <h2 className="text-3xl font-bold text-mavik-dark sm:text-4xl">
          Planos de manutenção para quem já tem site ou sistema
        </h2>
        <p className="text-mavik-dark/70">
          Para quem já possui um site ou sistema e precisa de suporte, melhorias e acompanhamento. Vigência mínima de 12
          meses.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {MAINTENANCE_PLANS.map((plan, index) => (
          <motion.div
            key={plan.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.1 }}
            className="relative flex h-full flex-col rounded-2xl border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur-lg"
          >
            <div className="flex flex-1 flex-col">
              <div className="mb-5 flex items-start gap-3">
                <div className="flex min-h-[64px] flex-col justify-start gap-1">
                  <h3 className="text-2xl font-bold leading-tight text-mavik-dark line-clamp-2">{plan.name}</h3>
                  <p className="text-3xl font-bold leading-tight text-mavik-primary">{plan.priceMonthly}</p>
                  <p className="text-xs text-mavik-dark/60">{plan.sla}</p>
                </div>
              </div>
              <ul className="flex-1 list-none space-y-2 text-sm text-mavik-dark/80">
                {plan.includes.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-[6px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mavik-light text-mavik-primary">
                      <Check className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => openCheckout({ mode: "maintenance", plan: plan.key })}
                className="inline-flex w-full items-center justify-center rounded-full bg-mavik-primary px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-mavik-secondary"
              >
                Contratar manutenção
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm text-mavik-dark/70">
        Vigência mínima de 12 meses. Fechamento e contrato via WhatsApp.
      </p>
    </section>
  );
}

