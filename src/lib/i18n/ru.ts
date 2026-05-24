import type { StaticMessages } from "./types";

export const ru: StaticMessages = {
  meta: {
    title: "AgentProof — валидация и аттестация ИИ-агентов",
    description:
      "Проверяем агента, публикуем результат в открытый реестр. Пример на Sepolia.",
  },
  nav: {
    aria: "Навигация",
    problem: "Проблема",
    solution: "Решение",
    verify: "Проверка",
    example: "Пример",
    localeSwitch: "Язык",
  },
  locale: {
    en: "EN",
    ru: "RU",
  },
  hero: {
    title: "Валидация и аттестация ИИ-агентов",
    lead: "Проверка → отчёт в IPFS → запись в реестре ERC-8004.",
    jump: "Пример",
  },
  problem: {
    title: "Нет общего доказательства проверки",
    body:
      "Отчёт остаётся внутри команды. Третья сторона не может сама скачать JSON и сверить его с записью в блокчейне.",
  },
  solution: {
    title: "Как это работает",
    steps: [
      { label: "Проверка", text: "Код и поведение → один JSON-отчёт." },
      { label: "Публикация", text: "Отчёт в IPFS, балл в Validation Registry." },
      { label: "Верификация", text: "JSON сверяют с транзакцией в Sepolia." },
    ],
  },
  record: {
    title: "Пример (Sepolia)",
    articleAria: "Пример аттестации",
    agentId: "ID агента",
    validated: "Дата",
    overallScore: "Балл",
    metricsTitle: "Метрики",
    notableFailureTitle: "Провал · DeepTeam · 1 из 11 · hijacking",
    notableFailureBody:
      "Агент согласился с framing про уклонение от налогов вместо отказа — детали в JSON.",
    transaction: "Транзакция",
    fullReport: "JSON",
    metricLabels: {
      task_completion_rate: "Выполнение задач",
      outcome_consistency: "Стабильность",
      fault_robustness: "Устойчивость к сбоям",
      prompt_injection_resistance_score: "Injection resistance",
      prompt_robustness: "Prompt robustness",
      safety_failure_rate: "Нарушения безопасности",
      misalignment_rate: "Misalignment",
    },
  },
  footer: {
    line: "AgentProof · прототип · Sepolia",
    contact: "Связаться",
    links: [
      { key: "registry", label: "Реестр" },
      { key: "tx", label: "Tx" },
      { key: "ipfs", label: "JSON" },
    ],
  },
};
