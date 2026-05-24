/** Source of truth: IPFS JSON + Sepolia ValidationResponse tx (see Links). */

export const LINKS = {
  eip8004: "https://eips.ethereum.org/EIPS/eip-8004",
  tx: "https://sepolia.etherscan.io/tx/0x91f0582c3e7b394c61c91a7b9b8de4fbc97b35adbcea9e834be0f8275d88bbaf",
  registryContract:
    "https://sepolia.etherscan.io/address/0x85C0e69BfB3483d78F73F5AE102E59981AD40755",
  /** Pinata gateway for the immutable report artifact */
  reportIpfsJson:
    "https://rose-added-gopher-345.mypinata.cloud/ipfs/QmNdvmcqoRm4xtUfsxh79s4mHSipir6PLCrpivaWmpWkcj",
} as const;

export const CONTACT_EMAIL = "absurdstr3@gmail.com" as const;

export const ONCHAIN = {
  validator: "0x69AEd14eA885e944abB54A8C7F5A9f18c85ed40F" as const,
  registryContract: "0x85C0e69BfB3483d78F73F5AE102E59981AD40755" as const,
  txHash:
    "0x91f0582c3e7b394c61c91a7b9b8de4fbc97b35adbcea9e834be0f8275d88bbaf" as const,
  agentId: 3498,
  requestHashFull:
    "a3db59bf6938b3d41e936deb68e28a0062c3e4079f0330a60135072ffd69eaa5",
  /** response (uint8) from ValidationResponse event */
  responseUint8: 65,
  /** ISO date from explorer (transaction timestamp Apr-21-2026) */
  validatedLabel: "2026-04-21 · Sepolia · ~15:47 UTC",
} as const;

export const REPORT_VALUES = {
  overallScoreReport: 64.66,
  ipfsCidDisplay: "QmNdvmcqoRm4xtUfsxh79s4mHSipir6PLCrpivaWmpWkcj",
} as const;

export type MetricScoreRow = {
  key: string;
  label: string;
  /** Display value pulled from JSON */
  value: string;
};

export type MetricTier = "good" | "warn" | "bad";

export type MetricBarRow = {
  key: string;
  value: number;
  display: string;
  barPercent: number;
  tier: MetricTier;
  higherIsBetter: boolean;
};

const METRIC_META: Record<string, { higherIsBetter: boolean }> = {
  task_completion_rate: { higherIsBetter: true },
  outcome_consistency: { higherIsBetter: true },
  fault_robustness: { higherIsBetter: true },
  prompt_injection_resistance_score: { higherIsBetter: true },
  prompt_robustness: { higherIsBetter: true },
  safety_failure_rate: { higherIsBetter: false },
  misalignment_rate: { higherIsBetter: false },
};

function tierFor(value: number, higherIsBetter: boolean): MetricTier {
  if (higherIsBetter) {
    if (value >= 85) return "good";
    if (value >= 55) return "warn";
    return "bad";
  }
  if (value <= 12) return "good";
  if (value <= 32) return "warn";
  return "bad";
}

function formatMetricValue(value: number): string {
  if (Number.isInteger(value)) return `${value}%`;
  return `${value.toFixed(1).replace(/\.0$/, "")}%`;
}

/** Bar rows derived from IPFS `metric_scores` with display tier for the live report. */
export function getMetricBars(): MetricBarRow[] {
  return METRIC_SCORES.map((row) => {
    const value = Number.parseFloat(row.value);
    const meta = METRIC_META[row.key] ?? { higherIsBetter: true };
    const tier = tierFor(value, meta.higherIsBetter);
    const barPercent = Math.min(100, Math.max(0, value));

    return {
      key: row.key,
      value,
      display: formatMetricValue(value),
      barPercent,
      tier,
      higherIsBetter: meta.higherIsBetter,
    };
  });
}

/** From IPFS artifact `metric_scores` */
export const METRIC_SCORES: MetricScoreRow[] = [
  {
    key: "task_completion_rate",
    label: "Task completion rate",
    value: "100",
  },
  {
    key: "outcome_consistency",
    label: "Outcome consistency",
    value: "95",
  },
  {
    key: "fault_robustness",
    label: "Fault robustness",
    value: "100",
  },
  {
    key: "prompt_injection_resistance_score",
    label: "Prompt injection resistance (score)",
    value: "100",
  },
  {
    key: "prompt_robustness",
    label: "Prompt robustness",
    value: "50",
  },
  {
    key: "safety_failure_rate",
    label: "Safety failure rate",
    value: "30.3333",
  },
  {
    key: "misalignment_rate",
    label: "Misalignment rate",
    value: "25",
  },
];

/** Counts derived from Deepteam section in IPFS artifact (classification cases). */
export const EVALUATION_SUMMARY = {
  stack: ["semgrep", "deepteam", "deepeval", "pyrit"] as const,
  deepteamCasesTotal: 11,
  deepteamPassed: 10,
  deepteamFailed: 1,
} as const;

export function truncAddr(addr: string, head = 6, tail = 4): string {
  if (!addr.startsWith("0x") || addr.length < head + tail + 2) return addr;
  return `${addr.slice(0, head)}…${addr.slice(-tail)}`;
}

export function truncHex(hex: string, head = 8, tail = 8): string {
  const clean = hex.startsWith("0x") ? hex.slice(2) : hex;
  if (clean.length <= head + tail) return hex;
  const pref = hex.startsWith("0x") ? "0x" : "";
  return `${pref}${clean.slice(0, head)}…${clean.slice(-tail)}`;
}
