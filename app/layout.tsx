import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MAVIK - sistemas online, sob medida e manutenção em Santarém",
  description: "Sistemas online prontos, projetos sob medida e manutenção contínua para empresas de Santarém e região.",
  openGraph: {
    title: "MAVIK - sistemas online, sob medida e manutenção",
    description:
      "Sistemas online com tudo incluso, projetos sob medida e manutenção com vigência mínima de 12 meses. Contrato via WhatsApp.",
    url: "https://mavik.site",
    siteName: "MAVIK",
    locale: "pt_BR",
    type: "website",
  },
  metadataBase: new URL("https://mavik.site"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${spaceGrotesk.variable} antialiased bg-mavik-light text-mavik-dark`}>
        {children}
      </body>
    </html>
  );
}
