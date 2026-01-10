"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Info } from "lucide-react";
import { useState } from "react";
import { getSystemByKey, SYSTEMS_LIST, SystemItem } from "../lib/systems";
import { openCheckout } from "../utils/checkout";

const formatCurrency = (value?: number) =>
  value
    ? new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0,
      }).format(value)
    : "Sob consulta";

type ModalState = {
  open: boolean;
  system: SystemItem | null;
};

export default function Systems() {
  const [modal, setModal] = useState<ModalState>({ open: false, system: null });

  const openModal = (id: string) => {
    const sys = getSystemByKey(id);
    if (sys) setModal({ open: true, system: sys });
  };

  const closeModal = () => setModal({ open: false, system: null });

  return (
    <section id="sistemas" className="section-shell py-16">
      <div className="mb-10 flex flex-col gap-3">
        <p className="text-sm font-semibold text-mavik-primary">Sistemas</p>
        <h2 className="text-3xl font-bold text-mavik-dark sm:text-4xl">Biblioteca de sistemas prontos</h2>
        <p className="max-w-3xl text-mavik-dark/70">
          Sistemas prontos para começar rápido. Escolha sistema online (mensal, tudo incluso) ou sistema próprio com
          manutenção. Tudo fechado no WhatsApp.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {SYSTEMS_LIST.map((system, index) => (
          <motion.div
            key={system.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: index * 0.06 }}
            className="relative flex h-full flex-col rounded-2xl border border-white/70 bg-white/80 p-6 shadow-soft backdrop-blur-lg"
          >
            <div className="flex flex-1 flex-col">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold leading-tight text-mavik-dark line-clamp-2">{system.name}</h3>
                  <p className="text-xs font-semibold text-mavik-secondary">
                    Sistema online a partir de {formatCurrency(system.saasFromPriceMonthly)}/mês
                  </p>
                  <p className="text-xs text-mavik-dark/60">Entrega estimada: {system.delivery}</p>
                </div>
              </div>

              <p className="mb-3 text-sm text-mavik-dark/70">{system.description}</p>

              <ul className="mt-2 flex-1 list-none space-y-2 text-sm text-mavik-dark/80">
                {system.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-[6px] inline-flex h-2 w-2 shrink-0 rounded-full bg-mavik-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-2xl bg-mavik-light/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mavik-secondary">
                  Formas de contratação
                </p>
                <div className="mt-3 space-y-3 text-xs text-mavik-dark/70">
                  <div>
                    <p className="font-semibold text-mavik-dark">Sistema online</p>
                    <p>Mensal fixo • Tudo incluso • 12 meses • Estrutura pronta (com configurações disponíveis)</p>
                  </div>
                  <div>
                    <p className="font-semibold text-mavik-dark">Sistema próprio + manutenção</p>
                    <p>
                      Sistema adquirido • Alterações sob demanda • Manutenção mensal (12 meses) • Ideal para quem quer
                      algo mais personalizado
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-mavik-dark/60">{system.notes}</p>
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => openModal(system.id)}
                className="inline-flex w-full items-center justify-center rounded-full border border-mavik-primary/40 px-5 py-3 text-sm font-semibold text-mavik-primary transition hover:-translate-y-0.5 hover:border-mavik-primary hover:text-mavik-secondary"
              >
                Ver detalhes
              </button>

              <button
                type="button"
                onClick={() => openCheckout({ mode: "system", systemId: system.id, systemModel: "SAAS" })}
                className="inline-flex w-full items-center justify-center rounded-full bg-mavik-primary px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-mavik-secondary"
              >
                Contratar sistema online
              </button>

              <button
                type="button"
                onClick={() => openCheckout({ mode: "system", systemId: system.id, systemModel: "LICENSE" })}
                className="inline-flex w-full items-center justify-center rounded-full border border-mavik-secondary/40 px-5 py-3 text-sm font-semibold text-mavik-dark transition hover:-translate-y-0.5 hover:border-mavik-secondary"
              >
                Quero esse sistema com adaptações
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {modal.open && modal.system && (
          <div
            className="fixed inset-0 z-40 overflow-y-auto bg-mavik-dark/60 px-4 py-6"
            onClick={closeModal}
          >
            <div className="flex min-h-full items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-[92vw] max-h-[85vh] overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:max-w-lg sm:rounded-3xl sm:p-6 md:max-w-2xl lg:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mavik-light text-mavik-primary">
                      <Info className="h-6 w-6" aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-mavik-primary">Contrato via WhatsApp</p>
                      <h3 className="text-2xl font-bold text-mavik-dark">{modal.system.name}</h3>
                      <p className="text-sm text-mavik-dark/70">
                        Sistema online a partir de {formatCurrency(modal.system.saasFromPriceMonthly)}/mês - Entrega estimada:{" "}
                        {modal.system.delivery}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="shrink-0 rounded-full border border-mavik-secondary/20 px-3 py-1 text-xs font-semibold text-mavik-dark/60 transition hover:text-mavik-dark"
                    aria-label="Fechar modal"
                  >
                    Fechar
                  </button>
                </div>

                <p className="mt-4 text-sm text-mavik-dark/70">{modal.system.description}</p>

                <div className="mt-4 rounded-2xl bg-mavik-light/70 p-4">
                  <p className="text-sm font-semibold text-mavik-dark">O que esta incluso</p>
                  <ul className="mt-2 space-y-1 text-sm text-mavik-dark/80">
                    {modal.system.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-mavik-primary" aria-hidden />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 rounded-2xl border border-mavik-secondary/20 bg-white p-4">
                  <p className="text-sm font-semibold text-mavik-dark">Detalhes da publicacao</p>
                  <ul className="mt-2 space-y-2 text-sm text-mavik-dark/80">
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">Dominio personalizado:</span>
                      <span>{modal.system.customDomain ? "Disponivel" : "Nao incluso"}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">Hospedagem:</span>
                      <span>{modal.system.hostingOptions}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">Publicação:</span>
                      <span>{modal.system.setup}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">Treinamento:</span>
                      <span>{modal.system.training}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">Suporte:</span>
                      <span>{modal.system.support}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 rounded-2xl bg-mavik-primary/10 p-4">
                  <p className="text-sm font-semibold text-mavik-dark">Sistema online vs Sistema próprio + manutenção</p>
                  <ul className="mt-2 space-y-2 text-sm text-mavik-dark/80">
                    <li>
                      <span className="font-semibold">Sistema online:</span> mensal fixo, tudo incluso, 12 meses e
                      estrutura pronta (com configurações disponíveis).
                    </li>
                    <li>
                      <span className="font-semibold">Sistema próprio + manutenção:</span> sistema adquirido, alterações
                      sob demanda e manutenção mensal para quem quer algo mais personalizado.
                    </li>
                  </ul>
                </div>

                <p className="mt-4 text-xs text-mavik-dark/60">{modal.system.notes}</p>

                <div className="mt-5 flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (!modal.system) return;
                      closeModal();
                      openCheckout({ mode: "system", systemId: modal.system.id, systemModel: "SAAS" });
                    }}
                    className="inline-flex w-full items-center justify-center rounded-full bg-mavik-primary px-5 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-mavik-secondary"
                  >
                    Contratar sistema online
                    <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (!modal.system) return;
                      closeModal();
                      openCheckout({ mode: "system", systemId: modal.system.id, systemModel: "LICENSE" });
                    }}
                    className="inline-flex w-full items-center justify-center rounded-full border border-mavik-secondary/40 px-5 py-3 text-sm font-semibold text-mavik-dark transition hover:-translate-y-0.5 hover:border-mavik-secondary"
                  >
                    Quero esse sistema com adaptacoes
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
