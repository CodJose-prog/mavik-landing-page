export type SecretaryRole = "assistant" | "user";

export type SecretaryMessageStatus = "ready" | "streaming" | "error";

export type SecretaryMessage = {
  id: string;
  role: SecretaryRole;
  content: string;
  createdAt: string;
  status?: SecretaryMessageStatus;
};

export type LeadProjectType =
  | "software_sob_medida"
  | "sistema_interno"
  | "aplicativo_mobile"
  | "plataforma_web"
  | "automacao"
  | "site_institucional"
  | "portfolio"
  | "nao_definido";

export type LeadUrgency = "imediata" | "curto_prazo" | "medio_prazo" | "exploratoria";

export type SecretaryRecommendedCta = "none" | "whatsapp" | "portfolio";

export type SecretaryLeadField =
  | "name"
  | "company"
  | "projectType"
  | "context"
  | "urgency"
  | "objective"
  | "additionalInfo";

export type SecretaryLeadData = {
  name?: string | null;
  company?: string | null;
  projectType?: LeadProjectType | string | null;
  urgency?: LeadUrgency | string | null;
  context?: string | null;
  objective?: string | null;
  additionalInfo?: string | null;
};

export type SecretaryLeadQualification = {
  isComplete?: boolean | null;
  missingFields?: SecretaryLeadField[] | null;
  summary?: string | null;
};

export type SecretaryLeadState = {
  language?: "pt-BR" | "en" | string | null;
  lead?: SecretaryLeadData | null;
  qualification?: SecretaryLeadQualification | null;
  recommendedCta?: SecretaryRecommendedCta | null;
  shouldOfferCases?: boolean | null;
};

export type SecretaryRequestMessage = Pick<SecretaryMessage, "role" | "content">;

export type SecretaryRequestBody = {
  messages: SecretaryRequestMessage[];
  pagePath?: string;
};

export type SecretaryDeltaEvent = {
  text: string;
};

export type SecretaryMetaEvent = {
  leadState: SecretaryLeadState | null;
  responseId?: string | null;
};

export type SecretaryErrorEvent = {
  message: string;
};

export type SecretaryAnalyticsEventName =
  | "widget_opened"
  | "widget_closed"
  | "message_sent"
  | "response_completed"
  | "response_failed"
  | "handoff_clicked"
  | "portfolio_clicked";

