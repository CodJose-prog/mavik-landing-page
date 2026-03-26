import { ImageResponse } from "next/og";
import { companyInfo } from "../content/home";

const baseStyles = {
  width: "100%",
  height: "100%",
  display: "flex",
  background:
    "radial-gradient(circle at top left, rgba(196, 145, 95, 0.22), transparent 34%), radial-gradient(circle at right center, rgba(94, 133, 150, 0.16), transparent 28%), linear-gradient(135deg, #05080d 0%, #0a1017 58%, #111a24 100%)",
  color: "#f3efe9",
  padding: "72px",
  fontFamily: "sans-serif",
} as const;

const cardStyles = {
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
  borderRadius: "40px",
  border: "1px solid rgba(255,255,255,0.09)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
  boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
  padding: "56px",
} as const;

const headline = "Software sob medida, plataformas web e automação para empresas.";
const subheadline = `Empresa de software no Pará, com base em ${companyInfo.primaryLocation}, atuação em ${companyInfo.secondaryLocation} e projetos em todo o Brasil.`;
const serviceLine = "Desenvolvimento de software sob medida";
const supportLine = "Aplicativos, plataformas web e sites institucionais premium";

export function renderSocialImage() {
  return new ImageResponse(
    (
      <div style={baseStyles}>
        <div style={cardStyles}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "22px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                alignSelf: "flex-start",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.04)",
                color: "#c4915f",
                padding: "10px 18px",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              MAVIK
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "18px",
                maxWidth: "860px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 72,
                  fontWeight: 700,
                  lineHeight: 1.02,
                  letterSpacing: "-0.05em",
                }}
              >
                {headline}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 28,
                  lineHeight: 1.5,
                  color: "rgba(243,239,233,0.76)",
                  maxWidth: "780px",
                }}
              >
                {subheadline}
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                color: "rgba(243,239,233,0.7)",
                fontSize: 22,
              }}
            >
              <div style={{ display: "flex" }}>{serviceLine}</div>
              <div style={{ display: "flex" }}>{supportLine}</div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "999px",
                border: "1px solid rgba(196,145,95,0.32)",
                background: "rgba(196,145,95,0.10)",
                color: "#f3efe9",
                padding: "14px 22px",
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              mavik.cloud
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

