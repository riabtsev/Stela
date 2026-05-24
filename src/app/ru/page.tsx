import type { Metadata } from "next";
import LandingPage from "@/components/landing-page";
import { ru } from "@/lib/i18n/ru";

export const metadata: Metadata = {
  title: ru.meta.title,
  description: ru.meta.description,
};

export default function RuHome() {
  return <LandingPage locale="ru" />;
}
