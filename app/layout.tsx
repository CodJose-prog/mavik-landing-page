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
  title: "MAVIK — Sistemas online e soluções digitais",
  description: "Sistemas online, soluções sob medida e manutenção digital para empresas.",
  icons: {
    icon: [
      { url: "/brand/favicon.ico" },
      { url: "/brand/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "MAVIK — Sistemas online e soluções digitais",
    description: "Sistemas online, soluções sob medida e manutenção digital para empresas.",
    url: "https://mavik.cloud",
    siteName: "MAVIK",
    locale: "pt_BR",
    type: "website",
  },
  metadataBase: new URL("https://mavik.cloud"),
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
