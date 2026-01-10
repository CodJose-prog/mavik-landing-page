import type { PlanKey } from "../../lib/plans";

export type SaasPlanTier = {
  key: PlanKey;
  label: string;
  priceMonthly: number;
  highlights: string[];
};

export type SaasProduct = {
  id: string;
  name: string;
  tagline: string;
  fromPriceMonthly: number;
  plans: SaasPlanTier[];
  features: string[];
  limits: string[];
  supportsCustomizations: false;
};

const DEFAULT_SAAS_PLANS: SaasPlanTier[] = [
  {
    key: "START",
    label: "Start",
    priceMonthly: 189,
    highlights: ["Essencial para começar", "Configuração rápida", "Suporte comercial"],
  },
  {
    key: "PRO",
    label: "Pro",
    priceMonthly: 289,
    highlights: ["Mais usuários", "Automatizações básicas", "Suporte prioritário"],
  },
  {
    key: "EVOLUTION",
    label: "Evolution",
    priceMonthly: 389,
    highlights: ["Operação robusta", "Evolução contínua", "Tempo de resposta prioritário"],
  },
];

export const SAAS_PRODUCTS: SaasProduct[] = [
  {
    id: "saas-agendamentos",
    name: "ArenaCalendar",
    tagline: "Arenas de Esportes de Areia",
    fromPriceMonthly: 249,
    plans: DEFAULT_SAAS_PLANS,
    features: [
      "Agenda por reserva",
      "Página de agendamento rápido",
      "Painel administrativo",
      "Controle de disponibilidade",
    ],
    limits: ["Unidades conforme plano", "Mais recursos sob demanda"],
    supportsCustomizations: false,
  },
];

export type MaintenancePlan = {
  key: PlanKey;
  name: string;
  priceMonthly: string;
  includes: string[];
  sla: string;
};

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    key: "START",
    name: "Start",
    priceMonthly: "R$ 99/mês",
    includes: ["Correções simples", "Atualizações pontuais", "Backup mensal", "Suporte comercial"],
    sla: "Tempo de resposta em até 48h úteis",
  },
  {
    key: "PRO",
    name: "Pro",
    priceMonthly: "R$ 189/mês",
    includes: [
      "Atualizações de conteúdo",
      "Pequenas automações",
      "Monitoramento básico",
      "Backup semanal",
      "Suporte prioritário",
    ],
    sla: "Tempo de resposta em até 24h úteis",
  },
  {
    key: "EVOLUTION",
    name: "Evolution",
    priceMonthly: "R$ 349/mês",
    includes: [
      "Evolução contínua",
      "Correções urgentes",
      "Monitoramento ativo",
      "Backup diário",
      "Consultoria técnica",
    ],
    sla: "Tempo de resposta em até 12h úteis",
  },
];

