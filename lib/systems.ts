import { PlanKey } from "./plans";

export type SystemKey = "clinicas" | "ecommerce" | "agendamentos";

export type SystemItem = {
  id: SystemKey;
  name: string;
  description: string;
  features: string[];
  includes: string[];
  planSuggested: PlanKey;
  delivery: string;
  customDomain: boolean;
  hostingOptions: string;
  setup: string;
  training: string;
  support: string;
  saasAvailable: boolean;
  saasFromPriceMonthly?: number;
  saasPlanSuggested?: PlanKey;
  licenseAvailable: boolean;
  notes: string;
};

export const SYSTEMS: Record<SystemKey, SystemItem> = {
  clinicas: {
    id: "clinicas",
    name: "Sistema para Clínicas",
    description: "Agende pacientes, registre evoluções e acompanhe tudo em um painel simples.",
    features: [
      "Cadastro de pacientes",
      "Agendamentos",
      "Prontuário simples",
      "Relatórios básicos",
      "Perfis de usuário",
    ],
    includes: [
      "Publicação guiada + início acompanhado",
      "Domínio personalizado incluso (ex: suaempresa.com.br)",
      "Hospedagem inclusa",
      "Atualizações contínuas",
      "Treinamento da equipe",
      "Suporte via WhatsApp",
    ],
    planSuggested: "PRO",
    delivery: "7-14 dias",
    customDomain: true,
    hostingOptions: "Hospedagem inclusa pela MAVIK ou hospedagem por conta do cliente.",
    setup: "Publicação e configuração do sistema",
    training: "Treinamento e início acompanhado",
    support: "Suporte via WhatsApp",
    saasAvailable: true,
    saasFromPriceMonthly: 299,
    saasPlanSuggested: "PRO",
    licenseAvailable: true,
    notes: "Domínio personalizado incluso, hospedagem inclusa e publicação guiada pela MAVIK.",
  },
  ecommerce: {
    id: "ecommerce",
    name: "Loja Virtual (E-commerce)",
    description: "Vitrine, carrinho e finalização de pedidos para vender rápido.",
    features: [
      "Catálogo e vitrine",
      "Carrinho e finalização de pedidos",
      "Cupons (opcional)",
      "Área do cliente",
      "Gestão de pedidos",
    ],
    includes: [
      "Publicação guiada + início acompanhado",
      "Domínio personalizado incluso (ex: suaempresa.com.br)",
      "Hospedagem inclusa",
      "Atualizações contínuas",
      "Treinamento da equipe",
      "Suporte via WhatsApp",
    ],
    planSuggested: "PRO",
    delivery: "7-14 dias",
    customDomain: true,
    hostingOptions: "Hospedagem inclusa pela MAVIK ou hospedagem por conta do cliente.",
    setup: "Publicação e configuração do sistema",
    training: "Treinamento e início acompanhado",
    support: "Suporte via WhatsApp",
    saasAvailable: true,
    saasFromPriceMonthly: 359,
    saasPlanSuggested: "PRO",
    licenseAvailable: true,
    notes: "Domínio personalizado incluso, hospedagem inclusa e publicação guiada pela MAVIK.",
  },
  agendamentos: {
    id: "agendamentos",
    name: "Sistema de Agendamentos",
    description: "Agenda por recurso, horários fixos/avulsos e painel admin.",
    features: [
      "Agenda por recurso",
      "Horários fixos e avulsos",
      "Painel administrativo",
      "Relatórios básicos",
      "Notificações configuráveis",
    ],
    includes: [
      "Publicação guiada + início acompanhado",
      "Domínio personalizado incluso (ex: suaempresa.com.br)",
      "Hospedagem inclusa",
      "Atualizações contínuas",
      "Treinamento da equipe",
      "Suporte via WhatsApp",
    ],
    planSuggested: "PRO",
    delivery: "5-10 dias",
    customDomain: true,
    hostingOptions: "Hospedagem inclusa pela MAVIK ou hospedagem por conta do cliente.",
    setup: "Publicação e configuração do sistema",
    training: "Treinamento e início acompanhado",
    support: "Suporte via WhatsApp",
    saasAvailable: true,
    saasFromPriceMonthly: 249,
    saasPlanSuggested: "START",
    licenseAvailable: true,
    notes: "Domínio personalizado incluso, hospedagem inclusa e publicação guiada pela MAVIK.",
  },
};

export function getSystemByKey(key?: string | null): SystemItem | null {
  if (!key) return null;
  const value = key as SystemKey;
  const found = SYSTEMS[value];
  return found ?? null;
}

export const SYSTEMS_LIST: SystemItem[] = Object.values(SYSTEMS);
