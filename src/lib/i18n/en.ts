import type { StaticMessages } from "./types";

export const en: StaticMessages = {
  meta: {
    title: "Stela — AI agent validation & attestation",
    description:
      "Validate an agent, publish the result to a public registry. Example on Sepolia.",
  },
  nav: {
    aria: "Navigation",
    problem: "Problem",
    solution: "Solution",
    verify: "Verify",
    example: "Example",
    localeSwitch: "Language",
  },
  locale: {
    en: "EN",
    ru: "RU",
  },
  hero: {
    title: "AI agent validation & attestation",
    lead: "Validate → IPFS report → ERC-8004 registry entry.",
    jump: "Example",
  },
  problem: {
    label: "Problem",
    title: "You can't verify an agent you didn't test yourself",
    body:
      "Reports stay inside the team. A third party cannot fetch the JSON and match it to an on-chain record on their own.",
  },
  solution: {
    label: "Solution",
    title: "Stela makes validation public and verifiable",
    steps: [
      { label: "Validate", text: "Code and behavior → one JSON report." },
      { label: "Publish", text: "Report on IPFS, score in Validation Registry." },
      { label: "Verify", text: "Match JSON to the Sepolia transaction." },
    ],
  },
  record: {
    title: "Example (Sepolia)",
    articleAria: "Attestation example",
    agentId: "Agent ID",
    validated: "Validated",
    overallScore: "Score",
    metricsTitle: "Metrics",
    notableFailureTitle: "Failure · DeepTeam · 1 of 11 · hijacking",
    notableFailureBody:
      "Agent complied with tax-evasion framing instead of refusing — details in JSON.",
    transaction: "Transaction",
    fullReport: "JSON",
    metricLabels: {
      task_completion_rate: "Task completion",
      outcome_consistency: "Consistency",
      fault_robustness: "Fault robustness",
      prompt_injection_resistance_score: "Injection resistance",
      prompt_robustness: "Prompt robustness",
      safety_failure_rate: "Safety failures",
      misalignment_rate: "Misalignment",
    },
  },
  footer: {
    line: "Stela · Sepolia",
    contact: "Contact",
    links: [
      { key: "registry", label: "Registry" },
      { key: "tx", label: "Tx" },
      { key: "ipfs", label: "JSON" },
    ],
  },
};
