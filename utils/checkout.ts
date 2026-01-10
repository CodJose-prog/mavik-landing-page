export type CheckoutMode = "saas" | "maintenance" | "system";
export type SystemModel = "SAAS" | "LICENSE";

export type CheckoutOpenDetail = {
  mode: CheckoutMode;
  productId?: string;
  plan?: string;
  systemId?: string;
  systemModel?: SystemModel;
};

export const openCheckout = (detail: CheckoutOpenDetail) => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("mavik-open-checkout", { detail }));
};
