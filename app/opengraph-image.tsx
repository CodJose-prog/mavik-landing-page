import { renderSocialImage } from "../lib/seo/social-image";

export const alt = "MAVIK, empresa de software no Pará com atuação nacional";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderSocialImage();
}

