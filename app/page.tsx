import type { Metadata } from "next";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import StructuredData from "../components/seo/StructuredData";
import CasesSection from "../components/sections/CasesSection";
import DifferentialsSection from "../components/sections/DifferentialsSection";
import FAQSection from "../components/sections/FAQSection";
import FinalCTASection from "../components/sections/FinalCTASection";
import HeroSection from "../components/sections/HeroSection";
import ProblemsSection from "../components/sections/ProblemsSection";
import ProcessSection from "../components/sections/ProcessSection";
import SolutionsSection from "../components/sections/SolutionsSection";
import ValuePropositionSection from "../components/sections/ValuePropositionSection";
import { homeContent } from "../lib/content/home";
import { buildHomeSchemas } from "../lib/seo/schema";
import { siteConfig } from "../lib/seo/site";

export const metadata: Metadata = {
  title: {
    absolute: "MAVIK | Software Sob Medida e Desenvolvimento Web no Pará",
  },
  description:
    "Software sob medida, sistemas personalizados, aplicativos, plataformas web e automação para empresas no Pará, com atuação em Santarém, Óbidos e no Brasil.",
  keywords: [...siteConfig.keywords],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MAVIK | Empresa de software no Pará com atuação nacional",
    description:
      "Software sob medida, aplicativos, plataformas web, automação de processos e presença institucional premium para empresas de Santarém, Óbidos, Pará e outras regiões do Brasil.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "MAVIK, empresa de software no Pará com atuação nacional.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MAVIK | Software sob medida, apps e plataformas web",
    description:
      "Empresa de software no Pará para projetos de sistemas personalizados, aplicativos, plataformas web e automação de processos empresariais.",
    images: ["/twitter-image"],
  },
};

export default function Home() {
  const schemas = buildHomeSchemas(homeContent.faqItems);

  return (
    <>
      <StructuredData data={schemas} />
      <Header />
      <main id="conteudo">
        <HeroSection />
        <ValuePropositionSection />
        <ProblemsSection />
        <SolutionsSection />
        <CasesSection />
        <DifferentialsSection />
        <ProcessSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}

