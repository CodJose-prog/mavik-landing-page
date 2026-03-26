import type { SecretaryAnalyticsEventName, SecretaryLeadState } from "./types";

type SecretaryAnalyticsPayload = {
  name: SecretaryAnalyticsEventName;
  leadState?: SecretaryLeadState | null;
  messageLength?: number;
  source?: string;
};

export function trackSecretaryEvent(payload: SecretaryAnalyticsPayload) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("mavik:secretary", {
      detail: {
        ...payload,
        timestamp: new Date().toISOString(),
      },
    })
  );
}

