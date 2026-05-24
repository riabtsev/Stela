import type { Metadata } from "next";
import LandingPage from "@/components/landing-page";
import { en } from "@/lib/i18n/en";

export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
};

export default function Home() {
  return <LandingPage locale="en" />;
}
