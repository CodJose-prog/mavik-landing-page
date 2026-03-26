import "server-only";
import OpenAI from "openai";

let openAIClient: OpenAI | null = null;

export function hasSecretaryCredentials() {
  return Boolean(process.env.OPENAI_API_KEY);
}

export function getSecretaryModel() {
  return process.env.OPENAI_MODEL || "gpt-5-mini";
}

export function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY não configurada.");
  }

  if (!openAIClient) {
    openAIClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      maxRetries: 1,
      timeout: 30_000,
    });
  }

  return openAIClient;
}

