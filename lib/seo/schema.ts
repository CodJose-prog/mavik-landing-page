import { companyInfo, homeContent } from "../content/home";
import { siteConfig } from "./site";

type FAQItem = (typeof homeContent.faqItems)[number];

const organizationId = `${siteConfig.url}#organization`;
const localBusinessId = `${siteConfig.url}#local-business`;
const websiteId = `${siteConfig.url}#website`;
const webpageId = `${siteConfig.url}/#webpage`;
const logoUrl = `${siteConfig.url}/brand/logo.svg`;
const socialImageUrl = `${siteConfig.url}/opengraph-image`;

function buildSharedEntityFields() {
  return {
    name: siteConfig.name,
    url: siteConfig.url,
    logo: logoUrl,
    image: socialImageUrl,
    description: siteConfig.description,
    email: companyInfo.email,
    telephone: companyInfo.phoneE164,
    areaServed: companyInfo.serviceAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
    knowsAbout: [...siteConfig.serviceKeywords],
    ...(siteConfig.sameAs.length ? { sameAs: [...siteConfig.sameAs] } : {}),
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    ...buildSharedEntityFields(),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: companyInfo.phoneE164,
        email: companyInfo.email,
        areaServed: "BR",
        availableLanguage: ["pt-BR"],
      },
    ],
  };
}

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": localBusinessId,
    ...buildSharedEntityFields(),
    address: {
      "@type": "PostalAddress",
      addressLocality: companyInfo.addressLocality,
      addressRegion: companyInfo.addressRegion,
      addressCountry: companyInfo.addressCountry,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: companyInfo.phoneE164,
        email: companyInfo.email,
        areaServed: "BR",
        availableLanguage: ["pt-BR"],
      },
    ],
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "pt-BR",
    description: siteConfig.description,
    publisher: {
      "@id": organizationId,
    },
  };
}

export function buildWebPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webpageId,
    name: "MAVIK | Software sob medida e desenvolvimento web no Pará",
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "pt-BR",
    isPartOf: {
      "@id": websiteId,
    },
    about: {
      "@id": organizationId,
    },
    primaryImageOfPage: socialImageUrl,
  };
}

export function buildServiceSchemas() {
  const services = [
    {
      name: "Desenvolvimento de software sob medida",
      description:
        "Projetos de software sob medida para empresas que precisam estruturar processos, integrar áreas e operar com mais controle.",
      category: "Software development",
    },
    {
      name: "Sistemas personalizados para empresas",
      description:
        "Sistemas personalizados para empresas com regras específicas, painéis administrativos e aderência ao fluxo real da operação.",
      category: "Business software",
    },
    {
      name: "Desenvolvimento de aplicativos",
      description:
        "Desenvolvimento de aplicativos mobile para clientes, equipes em campo, operação logística e rotinas com demanda de mobilidade.",
      category: "Mobile application development",
    },
    {
      name: "Plataformas web e SaaS",
      description:
        "Criação de plataformas web e produtos SaaS para operações que exigem escalabilidade, experiência consistente e clareza de gestão.",
      category: "Web application development",
    },
    {
      name: "Desenvolvimento web no Pará",
      description:
        "Desenvolvimento web no Pará para empresas que precisam de presença institucional premium, produtos digitais e sistemas com base sólida.",
      category: "Web development",
    },
    {
      name: "Automação de processos empresariais",
      description:
        "Automação de processos empresariais para reduzir retrabalho, aumentar previsibilidade e melhorar o fluxo de informação entre etapas da operação.",
      category: "Process automation",
    },
  ] as const;

  return services.map((service, index) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.url}/#service-${index + 1}`,
    name: service.name,
    serviceType: service.name,
    category: service.category,
    description: service.description,
    provider: {
      "@id": organizationId,
    },
    areaServed: companyInfo.serviceAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
  }));
}

export function buildFAQSchema(items: readonly FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildHomeSchemas(items: readonly FAQItem[]) {
  return [
    buildOrganizationSchema(),
    buildLocalBusinessSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema(),
    ...buildServiceSchemas(),
    buildFAQSchema(items),
  ];
}

