"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { buildWhatsAppLink } from "../utils/whatsapp";
import { formatBRPhone } from "../utils/phone";

const interests = ["Sistema online", "Sistema sob medida", "Manutenção", "Site"];
const plans = ["START", "PRO", "EVOLUTION"];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    whatsapp: "",
    interest: interests[0],
    plan: plans[0],
    message: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name || !form.email || !form.whatsapp) {
      setError("Preencha Nome, E-mail e WhatsApp.");
      return;
    }
    setError(null);
    const formatted = `Olá! Meu nome é ${form.name}. Empresa: ${form.company || "Não informada"}. Interesse: ${form.interest}. Plano: ${form.plan}. E-mail: ${form.email}. WhatsApp: ${form.whatsapp}. Mensagem: ${form.message || "Sem mensagem adicional."}`;
    window.open(buildWhatsAppLink(formatted), "_blank", "noopener,noreferrer");
  };

  const updateField = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <section id="contato" className="section-shell py-16">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm font-semibold text-mavik-primary">Contato</p>
          <h2 className="text-3xl font-bold text-mavik-dark sm:text-4xl">Fale com a MAVIK</h2>
          <p className="text-mavik-dark/70">
            Estamos em Santarém - Pará e atendemos empresas da região. Resposta rápida pelo WhatsApp para alinhar
            contrato, escopo e prazos.
          </p>
          <div className="space-y-3 text-sm text-mavik-dark">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-mavik-primary" aria-hidden />
              Santarém - Pará
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-mavik-primary" aria-hidden />
              (93) 99227-3046
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-mavik-primary" aria-hidden />
              mavikstm@gmail.com
            </div>
          </div>
          <a
            href={buildWhatsAppLink("Olá! Quero falar com a MAVIK sobre sistemas online, projetos sob medida e manutenção.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-fit items-center justify-center rounded-full bg-mavik-primary px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-mavik-secondary"
          >
            Chamar no WhatsApp
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="glass rounded-3xl p-6 shadow-soft"
        >
          <h3 className="text-xl font-semibold text-mavik-dark">Prefere que a gente chame?</h3>
          <p className="text-sm text-mavik-dark/70">
            Preencha e abriremos seu WhatsApp com a mensagem pronta para enviar.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-mavik-dark" htmlFor="name">
                  Nome*
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="w-full rounded-xl border border-mavik-secondary/30 bg-white px-4 py-3 text-sm text-mavik-dark shadow-inner focus:border-mavik-primary focus:outline-none"
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-mavik-dark" htmlFor="company">
                  Empresa (opcional)
                </label>
                <input
                  id="company"
                  value={form.company}
                  onChange={(e) => updateField("company", e.target.value)}
                  className="w-full rounded-xl border border-mavik-secondary/30 bg-white px-4 py-3 text-sm text-mavik-dark shadow-inner focus:border-mavik-primary focus:outline-none"
                  placeholder="Nome da empresa"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-mavik-dark" htmlFor="email">
                  E-mail*
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full rounded-xl border border-mavik-secondary/30 bg-white px-4 py-3 text-sm text-mavik-dark shadow-inner focus:border-mavik-primary focus:outline-none"
                  placeholder="seuemail@empresa.com"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-mavik-dark" htmlFor="whatsapp">
                  WhatsApp*
                </label>
                <input
                  id="whatsapp"
                  required
                  value={form.whatsapp}
                  onChange={(e) => updateField("whatsapp", formatBRPhone(e.target.value))}
                  inputMode="numeric"
                  autoComplete="tel"
                  className="w-full rounded-xl border border-mavik-secondary/30 bg-white px-4 py-3 text-sm text-mavik-dark shadow-inner focus:border-mavik-primary focus:outline-none"
                  placeholder="(93) 9 9227-3046"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-mavik-dark" htmlFor="interest">
                  Interesse
                </label>
                <select
                  id="interest"
                  value={form.interest}
                  onChange={(e) => updateField("interest", e.target.value)}
                  className="w-full rounded-xl border border-mavik-secondary/30 bg-white px-4 py-3 text-sm text-mavik-dark shadow-inner focus:border-mavik-primary focus:outline-none"
                >
                  {interests.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-semibold text-mavik-dark" htmlFor="plan">
                  Plano desejado
                </label>
                <select
                  id="plan"
                  value={form.plan}
                  onChange={(e) => updateField("plan", e.target.value)}
                  className="w-full rounded-xl border border-mavik-secondary/30 bg-white px-4 py-3 text-sm text-mavik-dark shadow-inner focus:border-mavik-primary focus:outline-none"
                >
                  {plans.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-mavik-dark" htmlFor="message">
                Mensagem (opcional)
              </label>
              <textarea
                id="message"
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                className="min-h-[100px] w-full rounded-xl border border-mavik-secondary/30 bg-white px-4 py-3 text-sm text-mavik-dark shadow-inner focus:border-mavik-primary focus:outline-none"
                placeholder="Conte o que precisa ou prazos importantes"
              />
            </div>

            {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-full bg-mavik-primary px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-mavik-secondary"
            >
              Enviar para WhatsApp
            </button>
          </form>
          <p className="mt-3 text-xs text-mavik-dark/60">
            Não armazenamos seus dados aqui. O envio abre diretamente o WhatsApp com a mensagem formatada.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

