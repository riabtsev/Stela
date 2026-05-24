"use client";

import { useSyncExternalStore } from "react";
import { localePath, type Locale, type Messages } from "@/lib/i18n";

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function getHashSnapshot() {
  return window.location.hash;
}

function getServerHashSnapshot() {
  return "";
}

type LocaleSwitcherProps = {
  locale: Locale;
  messages: Messages;
};

export default function LocaleSwitcher({ locale, messages }: LocaleSwitcherProps) {
  const hash = useSyncExternalStore(subscribeHash, getHashSnapshot, getServerHashSnapshot);

  return (
    <div className="nav-locale" role="navigation" aria-label={messages.nav.localeSwitch}>
      <a
        href={`${localePath("en")}${hash}`}
        aria-current={locale === "en" ? "true" : undefined}
        lang="en"
      >
        {messages.locale.en}
      </a>
      <span className="nav-locale-sep" aria-hidden="true">
        /
      </span>
      <a
        href={`${localePath("ru")}${hash}`}
        aria-current={locale === "ru" ? "true" : undefined}
        lang="ru"
      >
        {messages.locale.ru}
      </a>
    </div>
  );
}
