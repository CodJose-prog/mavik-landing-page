"use client";

import { motion } from "framer-motion";
import { SAAS_PRODUCTS } from "../src/lib/offerings";
import { openCheckout } from "../utils/checkout";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

export default function Saas() {
  return (
    <section id="sistemas-online" className="section-shell py-16">
      <div className="mb-8 flex flex-col gap-3">
        <p className="text-sm font-semibold text-mavik-primary">Sistemas online - EM BREVE MAIS SISTEMAS !</p>
        <h2 className="text-3xl font-bold text-mavik-dark sm:text-4xl">Sistemas online prontos para usar</h2>
        <p className="max-w-3xl text-mavik-dark/70">
          Valor mensal fixo e contrato mínimo de 12 meses. Hospedagem, domínio e suporte já inclusos.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {SAAS_PRODUCTS.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.06 }}
            className="flex h-full flex-col rounded-2xl border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur-lg"
          >
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold leading-tight text-mavik-dark">{product.name}</h3>
                  <p className="mt-1 text-sm text-mavik-dark/70">
                    <span className="font-semibold text-mavik-dark">Para quem é:</span> {product.tagline}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-mavik-primary">
                    {formatCurrency(product.fromPriceMonthly)}/mês
                  </span>
                </div>
              </div>

              <div className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-mavik-secondary">
                Principais benefícios
              </div>
              <ul className="mt-3 space-y-2 text-sm text-mavik-dark/80">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-[6px] inline-flex h-2 w-2 shrink-0 rounded-full bg-mavik-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-2xl bg-mavik-light px-3 py-2 text-xs font-semibold text-mavik-secondary">
                Hospedagem, domínio e suporte já inclusos
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-xs font-semibold text-mavik-secondary">Contrato mínimo de 12 meses.</p>
              <button
                type="button"
                onClick={() => openCheckout({ mode: "saas", productId: product.id })}
                className="inline-flex w-full items-center justify-center rounded-full bg-mavik-primary px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-mavik-secondary"
              >
                Contratar sistema
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

