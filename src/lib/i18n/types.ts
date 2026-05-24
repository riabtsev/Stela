export type Locale = "en" | "ru";

export const LOCALES: Locale[] = ["en", "ru"];
export const DEFAULT_LOCALE: Locale = "en";

export type SolutionStep = {
  label: string;
  text: string;
};

export type FooterLink = {
  key: "registry" | "tx" | "ipfs";
  label: string;
};

export type VerifyFlowStep = {
  id: string;
  label: string;
  title: string;
  detail: string;
  artifactLines: string[];
  link?: { label: string; href: string };
};

export type VerifyFlowCopy = {
  lead: string;
  railAria: string;
  artifactAria: string;
  back: string;
  next: string;
  play: string;
  replay: string;
  verified: string;
  steps: VerifyFlowStep[];
};

export type StaticMessages = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    aria: string;
    problem: string;
    solution: string;
    verify: string;
    example: string;
    localeSwitch: string;
  };
  locale: {
    en: string;
    ru: string;
  };
  hero: {
    title: string;
    lead: string;
    jump: string;
  };
  problem: {
    title: string;
    body: string;
  };
  solution: {
    title: string;
    steps: SolutionStep[];
  };
  record: {
    title: string;
    articleAria: string;
    agentId: string;
    validated: string;
    overallScore: string;
    metricsTitle: string;
    notableFailureTitle: string;
    notableFailureBody: string;
    transaction: string;
    fullReport: string;
    metricLabels: Record<string, string>;
  };
  footer: {
    line: string;
    contact: string;
    links: FooterLink[];
  };
};

export type Messages = StaticMessages & {
  verifyFlow: VerifyFlowCopy;
};
