import type { ReactNode } from "react";
import type { Messages } from "@/lib/i18n";
import type { MetricTier } from "@/lib/attestation-data";
import {
  getMetricBars,
  LINKS,
  ONCHAIN,
  REPORT_VALUES,
  truncHex,
} from "@/lib/attestation-data";

function ExternalLink(props: { href: string; children: ReactNode }) {
  return (
    <a
      className="external-link"
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

function tierClass(tier: MetricTier): string {
  return `metric-bar-fill metric-bar-fill--${tier}`;
}

type AttestationRecordProps = {
  copy: Messages["record"];
};

export default function AttestationRecord({ copy }: AttestationRecordProps) {
  const score = ONCHAIN.responseUint8;
  const metrics = getMetricBars();

  return (
    <article className="report report-distill" aria-label={copy.articleAria}>
      <div className="report-summary">
        <div className="report-meta report-meta-distill">
          <div>
            <span className="k">{copy.agentId}</span>
            <span className="v">{ONCHAIN.agentId}</span>
          </div>
          <div>
            <span className="k">{copy.validated}</span>
            <span className="v">{ONCHAIN.validatedLabel}</span>
          </div>
        </div>
        <div className="overall overall-distill">
          <span className="k">{copy.overallScore}</span>
          <span className="score">
            {score}
            <small> / 100</small>
          </span>
        </div>
      </div>

      <section className="report-metrics" aria-labelledby="report-metrics-title">
        <h3 className="report-metrics-title" id="report-metrics-title">
          {copy.metricsTitle}
        </h3>
        <ul className="metric-bars">
          {metrics.map((metric) => (
            <li className="metric-bar-row" key={metric.key}>
              <div className="metric-bar-label">
                <span className="metric-bar-name">
                  {copy.metricLabels[metric.key] ?? metric.key}
                </span>
                <span className={`metric-bar-value metric-bar-value--${metric.tier}`}>
                  {metric.display}
                </span>
              </div>
              <div className="metric-bar-track" aria-hidden="true">
                <span
                  className={tierClass(metric.tier)}
                  style={{ width: `${metric.barPercent}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      <footer className="report-foot report-foot-distill">
        <div>
          <span className="k">{copy.transaction}</span>
          <span className="v">
            <ExternalLink href={LINKS.tx}>{truncHex(ONCHAIN.txHash)}</ExternalLink>
          </span>
        </div>
        <div>
          <span className="k">{copy.fullReport}</span>
          <span className="v">
            <ExternalLink href={LINKS.reportIpfsJson}>
              {REPORT_VALUES.ipfsCidDisplay.slice(0, 12)}…
            </ExternalLink>
          </span>
        </div>
      </footer>
    </article>
  );
}
