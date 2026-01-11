"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Check, X } from "lucide-react";
import { SAAS_PRODUCTS, MAINTENANCE_PLANS } from "../../lib/offerings";
import { SYSTEMS_LIST } from "../../../lib/systems";
import {
  buildMaintenanceMessage,
  buildSaasMessage,
  buildSystemLicenseMessage,
  buildSystemSaasMessage,
  buildWhatsAppLink,
} from "../../../utils/whatsapp";
import { formatBRPhone } from "../../../utils/phone";

const WHATSAPP_EVENT = "mavik-open-checkout" as const;

type CheckoutMode = "saas" | "maintenance" | "system";

type SystemModel = "SAAS" | "LICENSE";

type HostingOption = "MAVIK" | "CLIENTE";

type ClientForm = {
  name: string;
  company: string;
  whatsapp: string;
  email: string;
  city: string;
  bestTime: string;
};

type SaasForm = {
  productId: string;
  users: string;
  units: string;
  customDomain: boolean | null;
  hosting: HostingOption | "";
  client: ClientForm;
  minTermAccepted: boolean;
};

type MaintenanceForm = {
  plan: string;
  scope: {
    site: boolean;
    sistema: boolean;
    automacoes: boolean;
  };
  customDomain: boolean | null;
  hosting: HostingOption | "";
  urgency: "baixa" | "media" | "alta" | "";
  client: ClientForm;
  minTermAccepted: boolean;
};

type SystemForm = {
  systemId: string;
  model: SystemModel | "";
  users: string;
  units: string;
  customizations: string[];
  maintenancePlan: string;
  customDomain: boolean | null;
  hosting: HostingOption | "";
  client: ClientForm;
  minTermAccepted: boolean;
};

type CheckoutOpenDetail = {
  mode: CheckoutMode;
  productId?: string;
  plan?: string;
  systemId?: string;
  systemModel?: SystemModel;
};

const defaultClient: ClientForm = {
  name: "",
  company: "",
  whatsapp: "",
  email: "",
  city: "",
  bestTime: "",
};

const createDefaultSaasForm = (): SaasForm => ({
  productId: "",
  users: "",
  units: "",
  customDomain: null,
  hosting: "",
  client: { ...defaultClient },
  minTermAccepted: false,
});

const createDefaultMaintenanceForm = (): MaintenanceForm => ({
  plan: "",
  scope: {
    site: false,
    sistema: false,
    automacoes: false,
  },
  customDomain: null,
  hosting: "",
  urgency: "",
  client: { ...defaultClient },
  minTermAccepted: false,
});

const createDefaultSystemForm = (): SystemForm => ({
  systemId: "",
  model: "",
  users: "",
  units: "",
  customizations: [],
  maintenancePlan: "",
  customDomain: null,
  hosting: "",
  client: { ...defaultClient },
  minTermAccepted: false,
});

const customOptions = [
  "Integrações com outras ferramentas",
  "Relatórios personalizados",
  "Fluxos específicos da operação",
  "Automatizações adicionais",
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

const parsePositiveNumber = (value: string) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return undefined;
  return parsed;
};

const isEmailValid = (value: string) => /\S+@\S+\.\S+/.test(value.trim());

const isPhoneValid = (value: string) => value.replace(/\D/g, "").length >= 10;

const canSubmitQuantity = (value: string) => value.trim() === "" || Number(value) > 0;

export default function CheckoutWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<CheckoutMode>("saas");
  const [currentStep, setCurrentStep] = useState(0);
  const [showErrors, setShowErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saasForm, setSaasForm] = useState<SaasForm>(() => createDefaultSaasForm());
  const [maintenanceForm, setMaintenanceForm] = useState<MaintenanceForm>(() => createDefaultMaintenanceForm());
  const [systemForm, setSystemForm] = useState<SystemForm>(() => createDefaultSystemForm());
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const selectedSaasProduct = useMemo(
    () => SAAS_PRODUCTS.find((product) => product.id === saasForm.productId) ?? null,
    [saasForm.productId]
  );

  const selectedSystem = useMemo(
    () => SYSTEMS_LIST.find((system) => system.id === systemForm.systemId) ?? null,
    [systemForm.systemId]
  );

  const steps = useMemo(() => {
    if (mode === "saas") {
      return [
        { id: "produto", label: "Sistema online" },
        { id: "plano", label: "Informações operacionais" },
        { id: "dominio", label: "Domínio incluso" },
        { id: "cliente", label: "Dados do cliente" },
        { id: "confirmacao", label: "Confirmação" },
        { id: "resumo", label: "Resumo" },
      ].filter((step) => step.id !== "plano");
    }

    if (mode === "maintenance") {
      return [
        { id: "plano", label: "Plano" },
        { id: "escopo", label: "O que será mantido" },
        { id: "contexto", label: "Contexto" },
        { id: "cliente", label: "Dados do cliente" },
        { id: "confirmacao", label: "Confirmação" },
        { id: "resumo", label: "Resumo" },
      ];
    }

    if (systemForm.model === "LICENSE") {
      return [
        { id: "modelo", label: "Modelo" },
        { id: "custom", label: "Alterações sob demanda" },
        { id: "dominio", label: "Domínio e hospedagem" },
        { id: "cliente", label: "Dados do cliente" },
        { id: "confirmacao", label: "Confirmação" },
        { id: "resumo", label: "Resumo" },
      ];
    }

    return [
      { id: "modelo", label: "Modelo" },
      { id: "plano", label: "Informações operacionais" },
      { id: "dominio", label: "Domínio incluso" },
      { id: "cliente", label: "Dados do cliente" },
      { id: "confirmacao", label: "Confirmação" },
      { id: "resumo", label: "Resumo" },
    ].filter((step) => step.id !== "plano");
  }, [mode, systemForm.model]);

  const activeStep = Math.min(currentStep, steps.length - 1);

  const progress = useMemo(() => {
    if (steps.length <= 1) return 0;
    return Math.round((activeStep / (steps.length - 1)) * 100);
  }, [activeStep, steps.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    dialogRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<CheckoutOpenDetail>).detail;
      if (!detail?.mode) return;

      setMode(detail.mode);
      setCurrentStep(0);
      setShowErrors(false);
      setIsSubmitting(false);

      const nextSaas = createDefaultSaasForm();
      const nextMaintenance = createDefaultMaintenanceForm();
      const nextSystem = createDefaultSystemForm();

      if (detail.mode === "saas") {
        if (detail.productId) nextSaas.productId = detail.productId;
      }

      if (detail.mode === "maintenance") {
        if (detail.plan) nextMaintenance.plan = detail.plan;
      }

      if (detail.mode === "system") {
        if (detail.systemId) nextSystem.systemId = detail.systemId;
        if (detail.systemModel) nextSystem.model = detail.systemModel;
      }

      setSaasForm(nextSaas);
      setMaintenanceForm(nextMaintenance);
      setSystemForm(nextSystem);
      setIsOpen(true);
    };

    window.addEventListener(WHATSAPP_EVENT, handler as EventListener);
    return () => window.removeEventListener(WHATSAPP_EVENT, handler as EventListener);
  }, []);

  const baseInputClass =
    "w-full rounded-2xl border border-mavik-secondary/30 bg-white px-4 py-3 text-sm text-mavik-dark shadow-inner focus:border-mavik-primary focus:outline-none";

  const clientIsValid = (client: ClientForm) =>
    client.name.trim() !== "" &&
    client.whatsapp.trim() !== "" &&
    isPhoneValid(client.whatsapp) &&
    client.email.trim() !== "" &&
    isEmailValid(client.email);

  const saasStepValid = () => {
    switch (activeStep) {
      case 0:
        return saasForm.productId !== "";
      case 1:
        return canSubmitQuantity(saasForm.users) && canSubmitQuantity(saasForm.units);
      case 2:
        return clientIsValid(saasForm.client);
      case 3:
        return saasForm.minTermAccepted;
      default:
        return true;
    }
  };

  const maintenanceStepValid = () => {
    switch (activeStep) {
      case 0:
        return maintenanceForm.plan !== "";
      case 1:
        return maintenanceForm.scope.site || maintenanceForm.scope.sistema || maintenanceForm.scope.automacoes;
      case 2:
        return (
          maintenanceForm.customDomain !== null &&
          maintenanceForm.hosting !== "" &&
          maintenanceForm.urgency !== ""
        );
      case 3:
        return clientIsValid(maintenanceForm.client);
      case 4:
        return maintenanceForm.minTermAccepted;
      default:
        return true;
    }
  };

  const systemStepValid = () => {
    const isSaasModel = systemForm.model !== "LICENSE";

    switch (activeStep) {
      case 0:
        return systemForm.systemId !== "" && systemForm.model !== "";
      case 1:
        if (isSaasModel) {
          return canSubmitQuantity(systemForm.users) && canSubmitQuantity(systemForm.units);
        }
        return systemForm.maintenancePlan !== "";
      case 2:
        if (isSaasModel) return clientIsValid(systemForm.client);
        return systemForm.customDomain !== null && systemForm.hosting !== "";
      case 3:
        if (isSaasModel) return systemForm.minTermAccepted;
        return clientIsValid(systemForm.client);
      case 4:
        return systemForm.minTermAccepted;
      default:
        return true;
    }
  };

  const isCurrentStepValid = () => {
    if (mode === "saas") return saasStepValid();
    if (mode === "maintenance") return maintenanceStepValid();
    return systemStepValid();
  };

  const handleNext = () => {
    if (!isCurrentStepValid()) {
      setShowErrors(true);
      return;
    }
    setShowErrors(false);
    setCurrentStep(Math.min(activeStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setShowErrors(false);
    setCurrentStep(Math.max(activeStep - 1, 0));
  };

  const summaryMessage = useMemo(() => {
    if (mode === "saas") {
      if (!selectedSaasProduct) return "";
      return buildSaasMessage({
        product: selectedSaasProduct.name,
        users: parsePositiveNumber(saasForm.users),
        units: parsePositiveNumber(saasForm.units),
        customDomain: saasForm.customDomain ?? false,
        hosting: (saasForm.hosting || "CLIENTE") as HostingOption,
        minTermAccepted: saasForm.minTermAccepted,
        client: {
          name: saasForm.client.name.trim(),
          company: saasForm.client.company.trim() || undefined,
          whatsapp: saasForm.client.whatsapp.trim(),
          email: saasForm.client.email.trim(),
          city: saasForm.client.city.trim() || undefined,
          bestTime: saasForm.client.bestTime.trim() || undefined,
        },
      });
    }

    if (mode === "maintenance") {
      const scopeList = [
        maintenanceForm.scope.site ? "Site" : null,
        maintenanceForm.scope.sistema ? "Sistema" : null,
        maintenanceForm.scope.automacoes ? "Automações" : null,
      ].filter(Boolean) as string[];

      return buildMaintenanceMessage({
        plan: maintenanceForm.plan,
        scope: scopeList,
        urgency: maintenanceForm.urgency as "baixa" | "media" | "alta",
        customDomain: maintenanceForm.customDomain ?? false,
        hosting: (maintenanceForm.hosting || "CLIENTE") as HostingOption,
        minTermAccepted: maintenanceForm.minTermAccepted,
        client: {
          name: maintenanceForm.client.name.trim(),
          company: maintenanceForm.client.company.trim() || undefined,
          whatsapp: maintenanceForm.client.whatsapp.trim(),
          email: maintenanceForm.client.email.trim(),
          city: maintenanceForm.client.city.trim() || undefined,
          bestTime: maintenanceForm.client.bestTime.trim() || undefined,
        },
      });
    }

    if (!selectedSystem) return "";

    if (systemForm.model === "LICENSE") {
      return buildSystemLicenseMessage({
        systemName: selectedSystem.name,
        maintenancePlan: systemForm.maintenancePlan,
        customizations: systemForm.customizations,
        customDomain: systemForm.customDomain ?? false,
        hosting: (systemForm.hosting || "CLIENTE") as HostingOption,
        minTermAccepted: systemForm.minTermAccepted,
        client: {
          name: systemForm.client.name.trim(),
          company: systemForm.client.company.trim() || undefined,
          whatsapp: systemForm.client.whatsapp.trim(),
          email: systemForm.client.email.trim(),
          city: systemForm.client.city.trim() || undefined,
          bestTime: systemForm.client.bestTime.trim() || undefined,
        },
      });
    }

    return buildSystemSaasMessage({
      systemName: selectedSystem.name,
      users: parsePositiveNumber(systemForm.users),
      units: parsePositiveNumber(systemForm.units),
      customDomain: systemForm.customDomain ?? false,
      hosting: (systemForm.hosting || "CLIENTE") as HostingOption,
      minTermAccepted: systemForm.minTermAccepted,
      client: {
        name: systemForm.client.name.trim(),
        company: systemForm.client.company.trim() || undefined,
        whatsapp: systemForm.client.whatsapp.trim(),
        email: systemForm.client.email.trim(),
        city: systemForm.client.city.trim() || undefined,
        bestTime: systemForm.client.bestTime.trim() || undefined,
      },
    });
  }, [
    mode,
    maintenanceForm,
    saasForm,
    systemForm,
    selectedSaasProduct,
    selectedSystem,
  ]);

  const handleWhatsApp = () => {
    if (!summaryMessage) return;
    setIsSubmitting(true);
    const href = buildWhatsAppLink(summaryMessage);
    window.open(href, "_blank", "noopener,noreferrer");
    setTimeout(() => setIsSubmitting(false), 600);
  };

  const handleCopySummary = async () => {
    if (!summaryMessage) return;
    try {
      await navigator.clipboard.writeText(summaryMessage);
    } catch {
      return;
    }
  };

  const renderClientFields = (client: ClientForm, onChange: (next: ClientForm) => void) => (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-mavik-dark" htmlFor="client-name">
          Nome*
        </label>
        <input
          id="client-name"
          value={client.name}
          onChange={(event) => onChange({ ...client, name: event.target.value })}
          className={baseInputClass}
          placeholder="Seu nome"
          autoComplete="name"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-mavik-dark" htmlFor="client-company">
          Empresa (opcional)
        </label>
        <input
          id="client-company"
          value={client.company}
          onChange={(event) => onChange({ ...client, company: event.target.value })}
          className={baseInputClass}
          placeholder="Nome da empresa"
          autoComplete="organization"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-mavik-dark" htmlFor="client-whatsapp">
          WhatsApp*
        </label>
        <input
          id="client-whatsapp"
          value={client.whatsapp}
          onChange={(event) => onChange({ ...client, whatsapp: formatBRPhone(event.target.value) })}
          className={baseInputClass}
          placeholder="(93) 9 9999-9999"
          inputMode="numeric"
          autoComplete="tel"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-mavik-dark" htmlFor="client-email">
          E-mail*
        </label>
        <input
          id="client-email"
          type="email"
          value={client.email}
          onChange={(event) => onChange({ ...client, email: event.target.value })}
          className={baseInputClass}
          placeholder="seuemail@empresa.com"
          autoComplete="email"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-mavik-dark" htmlFor="client-city">
          Cidade/UF (opcional)
        </label>
        <input
          id="client-city"
          value={client.city}
          onChange={(event) => onChange({ ...client, city: event.target.value })}
          className={baseInputClass}
          placeholder="Santarém-PA"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-mavik-dark" htmlFor="client-best">
          Melhor horário para contato (opcional)
        </label>
        <input
          id="client-best"
          value={client.bestTime}
          onChange={(event) => onChange({ ...client, bestTime: event.target.value })}
          className={baseInputClass}
          placeholder="Manhã, tarde ou noite"
        />
      </div>
    </div>
  );

  const renderDomainHosting = (
    customDomain: boolean | null,
    hosting: HostingOption | "",
    onUpdate: (next: { customDomain: boolean | null; hosting: HostingOption | "" }) => void
  ) => (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-sm font-semibold text-mavik-dark">Domínio personalizado?</p>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Sim", value: true },
            { label: "Não", value: false },
          ].map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => onUpdate({ customDomain: option.value, hosting })}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                customDomain === option.value
                  ? "border-mavik-primary bg-mavik-primary text-white"
                  : "border-mavik-secondary/40 text-mavik-dark hover:border-mavik-secondary"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-sm font-semibold text-mavik-dark">Hospedagem inclusa ou própria</p>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            {
              value: "MAVIK" as HostingOption,
              label: "Hospedagem inclusa pela MAVIK",
              description: "A MAVIK cuida do domínio e da hospedagem.",
            },
            {
              value: "CLIENTE" as HostingOption,
              label: "Hospedagem por conta do cliente",
              description: "Você já possui domínio e hospedagem.",
            },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onUpdate({ customDomain, hosting: option.value })}
              className={`rounded-2xl border px-4 py-3 text-left text-sm transition ${
                hosting === option.value
                  ? "border-mavik-primary bg-mavik-primary/10 text-mavik-dark"
                  : "border-mavik-secondary/30 text-mavik-dark hover:border-mavik-secondary"
              }`}
            >
              <p className="font-semibold">{option.label}</p>
              <p className="text-xs text-mavik-dark/70">{option.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIncludedDomain = () => (
    <div className="space-y-4">
      <div className="rounded-2xl border border-mavik-secondary/30 bg-mavik-light p-4 text-sm text-mavik-dark">
        <p className="font-semibold">Domínio e hospedagem inclusos</p>
        <p className="mt-1 text-mavik-dark/70">
          No sistema online, o domínio, a hospedagem, o suporte e as atualizações já estão inclusos.
        </p>
      </div>
      <ul className="space-y-2 text-sm text-mavik-dark/70">
        {[
          "Domínio incluso",
          "Hospedagem inclusa",
          "Suporte e atualizações inclusos",
        ].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-mavik-primary" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  const renderSummaryList = (items: Array<{ label: string; value: string }>) => (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label} className="flex flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold text-mavik-dark">{item.label}:</span>
          <span className="text-mavik-dark/80 break-words">{item.value}</span>
        </div>
      ))}
    </div>
  );

  const renderSaasStep = () => {
    const saasStep = activeStep === 0 ? 0 : activeStep + 1;
    if (saasStep === 0) {
      return (
        <div className="space-y-4">
          <p className="text-sm text-mavik-dark/70">
            Escolha o sistema online ideal. Todos têm contrato mínimo de 12 meses.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {SAAS_PRODUCTS.map((product) => {
              const selected = saasForm.productId === product.id;
              return (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setSaasForm({ ...saasForm, productId: product.id })}
                  className={`rounded-2xl border p-4 text-left transition ${
                    selected
                      ? "border-mavik-primary bg-mavik-primary/10"
                      : "border-mavik-secondary/30 hover:border-mavik-secondary"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mavik-secondary">
                        Sistema online
                      </p>
                      <h4 className="text-lg font-semibold text-mavik-dark">{product.name}</h4>
                      <p className="text-sm text-mavik-dark/70">{product.tagline}</p>
                    </div>
                    <div className="text-sm font-semibold text-mavik-primary">
                      a partir de {formatCurrency(product.fromPriceMonthly)}/mês
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1 text-xs text-mavik-dark/70">
                    {product.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-mavik-secondary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
          {showErrors && saasForm.productId === "" && (
            <p className="text-sm font-semibold text-red-600">Selecione um sistema para continuar.</p>
          )}
        </div>
      );
    }

    if (saasStep === 2) {
      return (
        <div className="space-y-6">
          {renderIncludedDomain()}
          <div>
            <p className="text-sm font-semibold text-mavik-dark">Informações operacionais (opcional)</p>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-mavik-dark" htmlFor="saas-users">
                  Usuários (opcional)
                </label>
                <input
                  id="saas-users"
                  value={saasForm.users}
                  onChange={(event) => setSaasForm({ ...saasForm, users: event.target.value })}
                  className={baseInputClass}
                  inputMode="numeric"
                  placeholder="Ex: 3"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-mavik-dark" htmlFor="saas-units">
                  Unidades (opcional)
                </label>
                <input
                  id="saas-units"
                  value={saasForm.units}
                  onChange={(event) => setSaasForm({ ...saasForm, units: event.target.value })}
                  className={baseInputClass}
                  inputMode="numeric"
                  placeholder="Ex: 1"
                />
              </div>
            </div>
          </div>
          {showErrors && (!canSubmitQuantity(saasForm.users) || !canSubmitQuantity(saasForm.units)) && (
            <p className="text-sm font-semibold text-red-600">
              Informe valores positivos para usuarios e unidades.
            </p>
          )}
        </div>
      );
    }
    if (saasStep === 3) {
      return (
        <div className="space-y-3">
          {renderClientFields(saasForm.client, (next) => setSaasForm({ ...saasForm, client: next }))}
          {showErrors && !clientIsValid(saasForm.client) && (
            <p className="text-sm font-semibold text-red-600">Preencha nome, WhatsApp e e-mail válidos.</p>
          )}
        </div>
      );
    }

    if (saasStep === 4) {
      return (
        <div className="space-y-4">
          <div className="rounded-2xl border border-mavik-secondary/30 bg-mavik-light p-4 text-sm text-mavik-dark">
            <p className="font-semibold">Contrato mínimo</p>
            <p className="mt-1 text-mavik-dark/70">
              Este sistema online possui vigência mínima de 12 meses. Ao marcar abaixo você confirma ciência.
            </p>
          </div>
          <label className="flex items-start gap-3 text-sm text-mavik-dark">
            <input
              type="checkbox"
              checked={saasForm.minTermAccepted}
              onChange={(event) => setSaasForm({ ...saasForm, minTermAccepted: event.target.checked })}
              className="mt-1 h-4 w-4 rounded border-mavik-secondary"
            />
            Estou ciente da vigência mínima de 12 meses.
          </label>
          {showErrors && !saasForm.minTermAccepted && (
            <p className="text-sm font-semibold text-red-600">Confirme a vigência para continuar.</p>
          )}
        </div>
      );
    }

    const summaryItems = [
      { label: "Sistema online", value: selectedSaasProduct?.name ?? "" },
      {
        label: "Usuários",
        value: saasForm.users.trim() || "Não informado",
      },
      {
        label: "Unidades",
        value: saasForm.units.trim() || "Não informado",
      },
      {
        label: "Inclui",
        value: "domínio, hospedagem, suporte e atualizações",
      },
      {
        label: "Contrato mínimo",
        value: saasForm.minTermAccepted ? "12 meses (ciente)" : "não confirmado",
      },
      {
        label: "Cliente",
        value: saasForm.client.company
          ? `${saasForm.client.name} / ${saasForm.client.company}`
          : saasForm.client.name,
      },
    ];

    return (
      <div className="space-y-4">
        {renderSummaryList(summaryItems)}
        <div className="rounded-2xl bg-mavik-light p-4 text-xs text-mavik-dark/70">
          A mensagem será enviada para o WhatsApp com todos os detalhes preenchidos.
        </div>
      </div>
    );
  };

  const renderMaintenanceStep = () => {
    if (activeStep === 0) {
      return (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            {MAINTENANCE_PLANS.map((plan) => {
              const selected = maintenanceForm.plan === plan.key;
              return (
                <button
                  key={plan.key}
                  type="button"
                  onClick={() => setMaintenanceForm({ ...maintenanceForm, plan: plan.key })}
                  className={`rounded-2xl border p-4 text-left transition ${
                    selected
                      ? "border-mavik-primary bg-mavik-primary/10"
                      : "border-mavik-secondary/30 hover:border-mavik-secondary"
                  }`}
                >
                  <p className="text-sm font-semibold text-mavik-dark">{plan.name}</p>
                  <p className="text-lg font-bold text-mavik-primary">{plan.priceMonthly}</p>
                  <p className="mt-2 text-xs text-mavik-dark/70">{plan.sla}</p>
                </button>
              );
            })}
          </div>
          {showErrors && maintenanceForm.plan === "" && (
            <p className="text-sm font-semibold text-red-600">Selecione um plano para continuar.</p>
          )}
        </div>
      );
    }

    if (activeStep === 1) {
      return (
        <div className="space-y-4">
          <p className="text-sm text-mavik-dark/70">Selecione o que será mantido.</p>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { key: "site", label: "Site" },
              { key: "sistema", label: "Sistema" },
              { key: "automacoes", label: "Automações" },
            ].map((option) => (
              <label
                key={option.key}
                className="flex items-center gap-3 rounded-2xl border border-mavik-secondary/30 px-4 py-3 text-sm font-semibold text-mavik-dark"
              >
                <input
                  type="checkbox"
                  checked={maintenanceForm.scope[option.key as keyof MaintenanceForm["scope"]]}
                  onChange={(event) =>
                    setMaintenanceForm({
                      ...maintenanceForm,
                      scope: {
                        ...maintenanceForm.scope,
                        [option.key]: event.target.checked,
                      },
                    })
                  }
                  className="h-4 w-4 rounded border-mavik-secondary"
                />
                {option.label}
              </label>
            ))}
          </div>
          {showErrors &&
            !maintenanceForm.scope.site &&
            !maintenanceForm.scope.sistema &&
            !maintenanceForm.scope.automacoes && (
              <p className="text-sm font-semibold text-red-600">Selecione ao menos um item.</p>
            )}
        </div>
      );
    }

    if (activeStep === 2) {
      return (
        <div className="space-y-6">
          {renderDomainHosting(maintenanceForm.customDomain, maintenanceForm.hosting, (next) =>
            setMaintenanceForm({ ...maintenanceForm, ...next })
          )}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-mavik-dark" htmlFor="maintenance-urgency">
              Urgência
            </label>
            <select
              id="maintenance-urgency"
              value={maintenanceForm.urgency}
              onChange={(event) =>
                setMaintenanceForm({
                  ...maintenanceForm,
                  urgency: event.target.value as MaintenanceForm["urgency"],
                })
              }
              className={baseInputClass}
            >
              <option value="">Selecione</option>
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          {showErrors &&
            (maintenanceForm.customDomain === null ||
              maintenanceForm.hosting === "" ||
              maintenanceForm.urgency === "") && (
              <p className="text-sm font-semibold text-red-600">Preencha domínio, hospedagem e urgência.</p>
            )}
        </div>
      );
    }

    if (activeStep === 3) {
      return (
        <div className="space-y-3">
          {renderClientFields(maintenanceForm.client, (next) =>
            setMaintenanceForm({ ...maintenanceForm, client: next })
          )}
          {showErrors && !clientIsValid(maintenanceForm.client) && (
            <p className="text-sm font-semibold text-red-600">Preencha nome, WhatsApp e e-mail válidos.</p>
          )}
        </div>
      );
    }

    if (activeStep === 4) {
      return (
        <div className="space-y-4">
          <div className="rounded-2xl border border-mavik-secondary/30 bg-mavik-light p-4 text-sm text-mavik-dark">
            <p className="font-semibold">Vigência mínima</p>
            <p className="mt-1 text-mavik-dark/70">
              Os planos de manutenção têm vigência mínima de 12 meses.
            </p>
          </div>
          <label className="flex items-start gap-3 text-sm text-mavik-dark">
            <input
              type="checkbox"
              checked={maintenanceForm.minTermAccepted}
              onChange={(event) =>
                setMaintenanceForm({ ...maintenanceForm, minTermAccepted: event.target.checked })
              }
              className="mt-1 h-4 w-4 rounded border-mavik-secondary"
            />
            Estou ciente e aceito a vigência mínima de 12 meses.
          </label>
          {showErrors && !maintenanceForm.minTermAccepted && (
            <p className="text-sm font-semibold text-red-600">Confirme a vigência para continuar.</p>
          )}
        </div>
      );
    }

    const scopeItems = [
      maintenanceForm.scope.site ? "Site" : null,
      maintenanceForm.scope.sistema ? "Sistema" : null,
      maintenanceForm.scope.automacoes ? "Automações" : null,
    ].filter(Boolean) as string[];

    const summaryItems = [
      { label: "Plano", value: maintenanceForm.plan },
      { label: "O que será mantido", value: scopeItems.join(", ") || "Não informado" },
      { label: "Urgência", value: maintenanceForm.urgency || "Não informada" },
      {
        label: "Domínio personalizado",
        value: maintenanceForm.customDomain ? "Sim" : "Não",
      },
      {
        label: "Hospedagem",
        value: maintenanceForm.hosting === "MAVIK" ? "Inclusa pela MAVIK" : "Por conta do cliente",
      },
      {
        label: "Cliente",
        value: maintenanceForm.client.company
          ? `${maintenanceForm.client.name} / ${maintenanceForm.client.company}`
          : maintenanceForm.client.name,
      },
    ];

    return (
      <div className="space-y-4">
        {renderSummaryList(summaryItems)}
        <div className="rounded-2xl bg-mavik-light p-4 text-xs text-mavik-dark/70">
          A mensagem final será montada e aberta no WhatsApp para envio.
        </div>
      </div>
    );
  };

  const renderSystemStep = () => {
    const systemStep = systemForm.model !== "LICENSE" && activeStep > 0 ? activeStep + 1 : activeStep;
    if (systemStep === 0) {
      return (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-mavik-dark" htmlFor="system-select">
              Sistema escolhido
            </label>
            <select
              id="system-select"
              value={systemForm.systemId}
              onChange={(event) => setSystemForm({ ...systemForm, systemId: event.target.value })}
              className={baseInputClass}
            >
              <option value="">Selecione um sistema</option>
              {SYSTEMS_LIST.map((system) => (
                <option key={system.id} value={system.id}>
                  {system.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-mavik-dark">Modelo de contratação</p>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  value: "SAAS" as SystemModel,
                  title: "Sistema online",
                  description:
                    "Mensal fixo, tudo incluso, 12 meses e estrutura pronta (com configurações disponíveis).",
                },
                {
                  value: "LICENSE" as SystemModel,
                  title: "Sistema próprio + manutenção",
                  description:
                    "Sistema adquirido, alterações sob demanda e manutenção mensal (12 meses). Ideal para quem quer algo mais personalizado.",
                },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSystemForm({ ...systemForm, model: option.value })}
                  className={`rounded-2xl border p-4 text-left transition ${
                    systemForm.model === option.value
                      ? "border-mavik-primary bg-mavik-primary/10"
                      : "border-mavik-secondary/30 hover:border-mavik-secondary"
                  }`}
                >
                  <p className="text-sm font-semibold text-mavik-dark">{option.title}</p>
                  <p className="text-xs text-mavik-dark/70">{option.description}</p>
                </button>
              ))}
            </div>
          </div>
          {showErrors && (systemForm.systemId === "" || systemForm.model === "") && (
            <p className="text-sm font-semibold text-red-600">Escolha o sistema e o modelo.</p>
          )}
        </div>
      );
    }

    if (systemStep === 1 && systemForm.model === "LICENSE") {
      return (
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold text-mavik-dark">Alterações sob demanda</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {customOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-3 rounded-2xl border border-mavik-secondary/30 px-4 py-3 text-sm font-semibold text-mavik-dark"
                >
                  <input
                    type="checkbox"
                    checked={systemForm.customizations.includes(option)}
                    onChange={(event) => {
                      const next = event.target.checked
                        ? [...systemForm.customizations, option]
                        : systemForm.customizations.filter((item) => item !== option);
                      setSystemForm({ ...systemForm, customizations: next });
                    }}
                    className="h-4 w-4 rounded border-mavik-secondary"
                  />
                  {option}
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs text-mavik-dark/60">Opcional. Ajuda a MAVIK a estimar escopo.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-mavik-dark" htmlFor="system-maintenance-plan">
              Manutenção mensal desejada
            </label>
            <select
              id="system-maintenance-plan"
              value={systemForm.maintenancePlan}
              onChange={(event) => setSystemForm({ ...systemForm, maintenancePlan: event.target.value })}
              className={baseInputClass}
            >
              <option value="">Selecione</option>
              {MAINTENANCE_PLANS.map((plan) => (
                <option key={plan.key} value={plan.key}>
                  {plan.name} ({plan.priceMonthly})
                </option>
              ))}
            </select>
          </div>
          {showErrors && systemForm.maintenancePlan === "" && (
            <p className="text-sm font-semibold text-red-600">Escolha a manutenção mensal.</p>
          )}
        </div>
      );
    }

    if (systemStep === 2) {
      if (systemForm.model !== "LICENSE") {
        return (
          <div className="space-y-6">
            {renderIncludedDomain()}
            <div>
              <p className="text-sm font-semibold text-mavik-dark">Informações operacionais (opcional)</p>
              <div className="mt-3 grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-mavik-dark" htmlFor="system-users">
                    Usuários (opcional)
                  </label>
                  <input
                    id="system-users"
                    value={systemForm.users}
                    onChange={(event) => setSystemForm({ ...systemForm, users: event.target.value })}
                    className={baseInputClass}
                    inputMode="numeric"
                    placeholder="Ex: 5"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-mavik-dark" htmlFor="system-units">
                    Unidades (opcional)
                  </label>
                  <input
                    id="system-units"
                    value={systemForm.units}
                    onChange={(event) => setSystemForm({ ...systemForm, units: event.target.value })}
                    className={baseInputClass}
                    inputMode="numeric"
                    placeholder="Ex: 2"
                  />
                </div>
              </div>
            </div>
            {showErrors && (!canSubmitQuantity(systemForm.users) || !canSubmitQuantity(systemForm.units)) && (
              <p className="text-sm font-semibold text-red-600">
                Informe valores positivos para usuarios e unidades.
              </p>
            )}
          </div>
        );
      }

      return (
        <div className="space-y-4">
          {renderDomainHosting(systemForm.customDomain, systemForm.hosting, (next) =>
            setSystemForm({ ...systemForm, ...next })
          )}
          {showErrors && (systemForm.customDomain === null || systemForm.hosting === "") && (
            <p className="text-sm font-semibold text-red-600">Selecione dominio e hospedagem.</p>
          )}
        </div>
      );
    }
    if (systemStep === 3) {
      return (
        <div className="space-y-3">
          {renderClientFields(systemForm.client, (next) => setSystemForm({ ...systemForm, client: next }))}
          {showErrors && !clientIsValid(systemForm.client) && (
            <p className="text-sm font-semibold text-red-600">Preencha nome, WhatsApp e e-mail válidos.</p>
          )}
        </div>
      );
    }

    if (systemStep === 4) {
      return (
        <div className="space-y-4">
          <div className="rounded-2xl border border-mavik-secondary/30 bg-mavik-light p-4 text-sm text-mavik-dark">
            <p className="font-semibold">Vigência mínima</p>
            <p className="mt-1 text-mavik-dark/70">
              Para sistema online ou manutenção, a vigência mínima é de 12 meses.
            </p>
          </div>
          <label className="flex items-start gap-3 text-sm text-mavik-dark">
            <input
              type="checkbox"
              checked={systemForm.minTermAccepted}
              onChange={(event) => setSystemForm({ ...systemForm, minTermAccepted: event.target.checked })}
              className="mt-1 h-4 w-4 rounded border-mavik-secondary"
            />
            Estou ciente da vigência mínima de 12 meses.
          </label>
          {showErrors && !systemForm.minTermAccepted && (
            <p className="text-sm font-semibold text-red-600">Confirme a vigência para continuar.</p>
          )}
        </div>
      );
    }

    const summaryItems = [
      { label: "Sistema", value: selectedSystem?.name ?? "" },
      {
        label: "Modelo",
        value: systemForm.model === "LICENSE" ? "Sistema próprio + manutenção" : "Sistema online",
      },
    ];

    if (systemForm.model === "LICENSE") {
      summaryItems.push({
        label: "Manutenção mensal",
        value: systemForm.maintenancePlan || "Não informado",
      });
      summaryItems.push({
        label: "Alterações sob demanda",
        value: systemForm.customizations.length ? systemForm.customizations.join(", ") : "Não informadas",
      });
      summaryItems.push({
        label: "Domínio personalizado",
        value: systemForm.customDomain ? "Sim" : "Não",
      });
      summaryItems.push({
        label: "Hospedagem",
        value: systemForm.hosting === "MAVIK" ? "Inclusa pela MAVIK" : "Por conta do cliente",
      });
    } else {
      summaryItems.push({
        label: "Usuários",
        value: systemForm.users.trim() || "Não informado",
      });
      summaryItems.push({
        label: "Unidades",
        value: systemForm.units.trim() || "Não informado",
      });
      summaryItems.push({
        label: "Inclui",
        value: "domínio, hospedagem, suporte e atualizações",
      });
    }

    summaryItems.push({
      label: "Contrato mínimo",
      value: systemForm.minTermAccepted ? "12 meses (ciente)" : "não confirmado",
    });
    summaryItems.push({
      label: "Cliente",
      value: systemForm.client.company
        ? `${systemForm.client.name} / ${systemForm.client.company}`
        : systemForm.client.name,
    });

    return (
      <div className="space-y-4">
        {renderSummaryList(summaryItems)}
        <div className="rounded-2xl bg-mavik-light p-4 text-xs text-mavik-dark/70">
          A mensagem será enviada para o WhatsApp com todas as escolhas.
        </div>
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-mavik-dark/50 px-4 py-6 sm:items-center"
      onClick={() => setIsOpen(false)}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        tabIndex={-1}
        className="w-full max-w-4xl rounded-3xl bg-white shadow-2xl outline-none"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-mavik-secondary/20 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mavik-secondary">Atendimento guiado</p>
            <h2 id="checkout-title" className="text-xl font-semibold text-mavik-dark">
              Monte seu pedido para enviar no WhatsApp
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full p-2 text-mavik-dark transition hover:bg-mavik-secondary/20"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="px-6 pb-6 pt-4">
          <div className="mb-6 space-y-2">
            <div className="h-2 w-full rounded-full bg-mavik-secondary/20">
              <div className="h-2 rounded-full bg-mavik-primary transition" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex items-center justify-between text-xs text-mavik-dark/70">
              <span>{steps[activeStep]?.label}</span>
              <span>
                {activeStep + 1} de {steps.length}
              </span>
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto pr-1">
            {mode === "saas" && renderSaasStep()}
            {mode === "maintenance" && renderMaintenanceStep()}
            {mode === "system" && renderSystemStep()}
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-mavik-secondary/20 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={activeStep === 0 ? () => setIsOpen(false) : handleBack}
                className="rounded-full border border-mavik-secondary/40 px-5 py-2 text-sm font-semibold text-mavik-dark transition hover:border-mavik-secondary"
              >
                {activeStep === 0 ? "Cancelar" : "Voltar"}
              </button>
              {activeStep === steps.length - 1 && summaryMessage && (
                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="rounded-full border border-mavik-secondary/40 px-5 py-2 text-sm font-semibold text-mavik-dark transition hover:border-mavik-secondary"
                >
                  Copiar resumo
                </button>
              )}
            </div>

            {activeStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center rounded-full bg-mavik-primary px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-mavik-secondary"
              >
                Próximo
                <Check className="ml-2 h-4 w-4" aria-hidden />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleWhatsApp}
                disabled={!summaryMessage || isSubmitting}
                className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-glow transition ${
                  !summaryMessage || isSubmitting
                    ? "cursor-not-allowed bg-mavik-secondary/60"
                    : "bg-mavik-primary hover:-translate-y-0.5 hover:bg-mavik-secondary"
                }`}
              >
                {isSubmitting ? "Abrindo WhatsApp..." : "Enviar pedido no WhatsApp"}
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
