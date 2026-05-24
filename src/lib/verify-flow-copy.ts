import type { Locale, VerifyFlowCopy } from "@/lib/i18n/types";
import {
  LINKS,
  ONCHAIN,
  REPORT_VALUES,
  truncHex,
} from "@/lib/attestation-data";

export function buildVerifyFlowCopy(locale: Locale): VerifyFlowCopy {
  const cid = REPORT_VALUES.ipfsCidDisplay;
  const tx = truncHex(ONCHAIN.txHash, 10, 6);
  const scoreJson = REPORT_VALUES.overallScoreReport;
  const scoreChain = ONCHAIN.responseUint8;

  if (locale === "ru") {
    return {
      lead: "Три шага — без доверия к оператору.",
      railAria: "Шаги верификации",
      artifactAria: "Фрагмент данных",
      back: "Назад",
      next: "Дальше",
      play: "Авто",
      replay: "Сначала",
      verified: "Поля совпали — аттестация подтверждена.",
      steps: [
        {
          id: "json",
          label: "JSON",
          title: "Скачайте отчёт",
          detail: "Полный JSON в IPFS — источник метрик и провалов.",
          artifactLines: [
            `{ "overall_score": ${scoreJson},`,
            `  "metric_scores": { ... },`,
            `  "ipfs_cid": "${cid.slice(0, 18)}…" }`,
          ],
          link: { label: "Открыть JSON ↗", href: LINKS.reportIpfsJson },
        },
        {
          id: "tx",
          label: "Tx",
          title: "Откройте транзакцию",
          detail: "ValidationResponse в Sepolia — agent ID, балл, ссылка на CID.",
          artifactLines: [
            `agentId: ${ONCHAIN.agentId}`,
            `response (uint8): ${scoreChain}`,
            `responseURI: ipfs://${cid.slice(0, 16)}…`,
          ],
          link: { label: "Etherscan ↗", href: LINKS.tx },
        },
        {
          id: "match",
          label: "Сверка",
          title: "Сопоставьте поля",
          detail: `Балл ${scoreJson} в JSON → ${scoreChain} on-chain. CID в tx = CID файла.`,
          artifactLines: [
            `JSON overall_score  →  chain response`,
            `     ${scoreJson}          →       ${scoreChain}`,
            `ipfs://${cid.slice(0, 22)}…`,
            `tx ${tx}`,
          ],
        },
      ],
    };
  }

  return {
    lead: "Three steps — no need to trust the operator.",
    railAria: "Verification steps",
    artifactAria: "Data excerpt",
    back: "Back",
    next: "Next",
    play: "Auto",
    replay: "Restart",
    verified: "Fields match — attestation confirmed.",
    steps: [
      {
        id: "json",
        label: "JSON",
        title: "Fetch the report",
        detail: "Full JSON on IPFS — source of metrics and failures.",
        artifactLines: [
          `{ "overall_score": ${scoreJson},`,
          `  "metric_scores": { ... },`,
          `  "ipfs_cid": "${cid.slice(0, 18)}…" }`,
        ],
        link: { label: "Open JSON ↗", href: LINKS.reportIpfsJson },
      },
      {
        id: "tx",
        label: "Tx",
        title: "Open the transaction",
        detail: "ValidationResponse on Sepolia — agent ID, score, CID link.",
        artifactLines: [
          `agentId: ${ONCHAIN.agentId}`,
          `response (uint8): ${scoreChain}`,
          `responseURI: ipfs://${cid.slice(0, 16)}…`,
        ],
        link: { label: "Etherscan ↗", href: LINKS.tx },
      },
      {
        id: "match",
        label: "Match",
        title: "Compare the fields",
        detail: `Score ${scoreJson} in JSON → ${scoreChain} on-chain. Tx CID = file CID.`,
        artifactLines: [
          `JSON overall_score  →  chain response`,
          `     ${scoreJson}          →       ${scoreChain}`,
          `ipfs://${cid.slice(0, 22)}…`,
          `tx ${tx}`,
        ],
      },
    ],
  };
}
