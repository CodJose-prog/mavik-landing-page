import { renderSocialImage } from "../lib/seo/social-image";

export const alt = "MAVIK, software sob medida, aplicativos e plataformas web";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return renderSocialImage();
}

