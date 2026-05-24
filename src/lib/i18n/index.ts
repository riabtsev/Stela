import { buildVerifyFlowCopy } from "@/lib/verify-flow-copy";
import { en } from "./en";
import { ru } from "./ru";
import type { Locale, Messages, StaticMessages } from "./types";

const CATALOG: Record<Locale, StaticMessages> = {
  en,
  ru,
};

export function getMessages(locale: Locale): Messages {
  return {
    ...CATALOG[locale],
    verifyFlow: buildVerifyFlowCopy(locale),
  };
}

export function localePath(locale: Locale, hash = ""): string {
  const base = locale === "en" ? "/" : "/ru";
  return hash ? `${base}${hash.startsWith("#") ? hash : `#${hash}`}` : base;
}

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "ru";
}

export type { Locale, Messages } from "./types";
export { DEFAULT_LOCALE, LOCALES } from "./types";
