type ClientInfo = {
  name: string;
  company?: string;
  whatsapp: string;
  email: string;
  city?: string;
  bestTime?: string;
};

type HostingOption = "MAVIK" | "CLIENTE";

type DomainHostingInfo = {
  customDomain: boolean;
  hosting: HostingOption;
};

export type SaasQuotePayload = DomainHostingInfo & {
  product: string;
  users?: number;
  units?: number;
  minTermAccepted: boolean;
  client: ClientInfo;
};

export type MaintenanceQuotePayload = DomainHostingInfo & {
  plan: string;
  scope: string[];
  urgency: "baixa" | "media" | "alta";
  minTermAccepted: boolean;
  client: ClientInfo;
};

export type SystemSaasQuotePayload = DomainHostingInfo & {
  systemName: string;
  users?: number;
  units?: number;
  minTermAccepted: boolean;
  client: ClientInfo;
};

export type SystemLicenseQuotePayload = DomainHostingInfo & {
  systemName: string;
  customizations: string[];
  maintenancePlan: string;
  minTermAccepted: boolean;
  client: ClientInfo;
};

const formatYesNo = (value: boolean) => (value ? "sim" : "não");

const formatHosting = (value: HostingOption) =>
  value === "MAVIK" ? "Inclusa pela MAVIK" : "Por conta do cliente";

const formatClientLine = (client: ClientInfo) =>
  client.company ? `${client.name} / ${client.company}` : client.name;

const formatLines = (lines: Array<string | null | undefined>) =>
  lines.filter(Boolean).join("\n");

const formatOptional = (label: string, value?: string) =>
  value ? `*${label}:* ${value}` : null;

const formatList = (label: string, items: string[]) => {
  if (!items.length) return null;
  const bullets = items.map((item) => `- ${item}`).join("\n");
  return `*${label}:*\n${bullets}`;
};

export const buildSaasMessage = (payload: SaasQuotePayload) =>
  formatLines([
    "Olá! Quero contratar com a MAVIK.",
    "",
    "*Tipo:* Sistema online",
    `*Sistema:* ${payload.product}`,
    "*Valor:* mensal fixo",
    `*Contrato mínimo:* ${payload.minTermAccepted ? "12 meses (ciente ✅)" : "não confirmado"}`,
    "*Inclui:* domínio, hospedagem, suporte e atualizações",
    payload.users ? `*Usuários:* ${payload.users}` : null,
    payload.units ? `*Unidades:* ${payload.units}` : null,
    "",
    `*Cliente:* ${formatClientLine(payload.client)}`,
    `*WhatsApp:* ${payload.client.whatsapp}`,
    `*E-mail:* ${payload.client.email}`,
    formatOptional("Cidade", payload.client.city),
    formatOptional("Melhor horário", payload.client.bestTime),
    "",
    "Pode me enviar o contrato e as formas de pagamento?",
  ]);

export const buildMaintenanceMessage = (payload: MaintenanceQuotePayload) =>
  formatLines([
    "Olá! Quero contratar com a MAVIK.",
    "",
    "*Tipo:* Manutenção",
    `*Plano:* ${payload.plan}`,
    `*Contrato mínimo:* ${payload.minTermAccepted ? "12 meses (ciente ✅)" : "não confirmado"}`,
    formatList("O que será mantido", payload.scope),
    `*Domínio personalizado:* ${formatYesNo(payload.customDomain)}`,
    `*Hospedagem:* ${formatHosting(payload.hosting)}`,
    `*Urgência:* ${payload.urgency}`,
    "",
    `*Cliente:* ${formatClientLine(payload.client)}`,
    `*WhatsApp:* ${payload.client.whatsapp}`,
    `*E-mail:* ${payload.client.email}`,
    formatOptional("Cidade", payload.client.city),
    formatOptional("Melhor horário", payload.client.bestTime),
    "",
    "Pode me enviar o contrato e as formas de pagamento?",
  ]);

export const buildSystemSaasMessage = (payload: SystemSaasQuotePayload) =>
  formatLines([
    "Olá! Quero contratar com a MAVIK.",
    "",
    "*Tipo:* Sistema online",
    `*Sistema:* ${payload.systemName}`,
    "*Valor:* mensal fixo",
    `*Contrato mínimo:* ${payload.minTermAccepted ? "12 meses (ciente ✅)" : "não confirmado"}`,
    "*Inclui:* domínio, hospedagem, suporte e atualizações",
    payload.users ? `*Usuários:* ${payload.users}` : null,
    payload.units ? `*Unidades:* ${payload.units}` : null,
    "",
    `*Cliente:* ${formatClientLine(payload.client)}`,
    `*WhatsApp:* ${payload.client.whatsapp}`,
    `*E-mail:* ${payload.client.email}`,
    formatOptional("Cidade", payload.client.city),
    formatOptional("Melhor horário", payload.client.bestTime),
    "",
    "Pode me enviar o contrato e as formas de pagamento?",
  ]);

export const buildSystemLicenseMessage = (payload: SystemLicenseQuotePayload) =>
  formatLines([
    "Olá! Quero contratar com a MAVIK.",
    "",
    "*Tipo:* Sistema próprio + manutenção",
    `*Sistema:* ${payload.systemName}`,
    `*Manutenção mensal:* ${payload.maintenancePlan}`,
    `*Contrato mínimo:* ${payload.minTermAccepted ? "12 meses (ciente ✅)" : "não confirmado"}`,
    formatList("Alterações sob demanda", payload.customizations),
    `*Domínio personalizado:* ${formatYesNo(payload.customDomain)}`,
    `*Hospedagem:* ${formatHosting(payload.hosting)}`,
    "",
    `*Cliente:* ${formatClientLine(payload.client)}`,
    `*WhatsApp:* ${payload.client.whatsapp}`,
    `*E-mail:* ${payload.client.email}`,
    formatOptional("Cidade", payload.client.city),
    formatOptional("Melhor horário", payload.client.bestTime),
    "",
    "Pode me enviar o contrato e as formas de pagamento?",
  ]);

