"use client";

import { useCallback, useEffect, useState } from "react";
import type { Messages } from "@/lib/i18n";

type VerifyFlowProps = {
  copy: Messages["verifyFlow"];
};

export default function VerifyFlow({ copy }: VerifyFlowProps) {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const lastStep = copy.steps.length - 1;
  const done = step === lastStep;

  const goTo = useCallback(
    (index: number) => {
      setStep(Math.max(0, Math.min(index, lastStep)));
    },
    [lastStep],
  );

  useEffect(() => {
    if (!playing || done) {
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setStep((current) => Math.min(current + 1, lastStep));
    }, 2200);
    return () => window.clearTimeout(timer);
  }, [playing, step, done, lastStep]);

  useEffect(() => {
    if (done) setPlaying(false);
  }, [done]);

  return (
    <div className="verify-flow" id="verify-flow">
      <p className="verify-flow-lead">{copy.lead}</p>

      <ol className="verify-flow-rail" aria-label={copy.railAria}>
        {copy.steps.map((item, index) => {
          const state =
            index < step ? "done" : index === step ? "active" : "pending";
          return (
            <li
              key={item.id}
              className={`verify-flow-rail-item verify-flow-rail-item--${state}`}
            >
              <button
                type="button"
                className="verify-flow-rail-btn"
                aria-current={index === step ? "step" : undefined}
                onClick={() => {
                  setPlaying(false);
                  goTo(index);
                }}
              >
                <span className="verify-flow-rail-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="verify-flow-rail-label">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="verify-flow-progress" aria-hidden="true">
        <span
          className="verify-flow-progress-fill"
          style={{ width: `${((step + 1) / copy.steps.length) * 100}%` }}
        />
      </div>

      <div className="verify-flow-stage-wrap">
        <div
          key={copy.steps[step].id}
          className={`verify-flow-stage verify-flow-stage--${copy.steps[step].id}${done ? " verify-flow-stage--done" : ""}`}
          role="region"
          aria-labelledby={`verify-step-title-${step}`}
        >
          <h3 className="verify-flow-stage-title" id={`verify-step-title-${step}`}>
            {copy.steps[step].title}
          </h3>
          <p className="verify-flow-stage-detail">{copy.steps[step].detail}</p>

          <pre className="verify-flow-artifact" aria-label={copy.artifactAria}>
            {copy.steps[step].artifactLines.map((line) => (
              <code key={line} className="verify-flow-artifact-line">
                {line}
              </code>
            ))}
          </pre>

          {copy.steps[step].link ? (
            <a
              className="verify-flow-link external-link"
              href={copy.steps[step].link!.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {copy.steps[step].link!.label}
            </a>
          ) : null}

          {done ? (
            <p className="verify-flow-verified" role="status">
              <span className="verify-flow-check" aria-hidden="true">
                ✓
              </span>
              {copy.verified}
            </p>
          ) : null}
        </div>
      </div>

      <div className="verify-flow-controls">
        <button
          type="button"
          className="verify-flow-btn"
          disabled={step === 0}
          onClick={() => {
            setPlaying(false);
            goTo(step - 1);
          }}
        >
          {copy.back}
        </button>
        {!done ? (
          <button
            type="button"
            className="verify-flow-btn verify-flow-btn-primary"
            onClick={() => {
              setPlaying(false);
              goTo(step + 1);
            }}
          >
            {copy.next}
          </button>
        ) : (
          <button
            type="button"
            className="verify-flow-btn verify-flow-btn-primary"
            onClick={() => {
              setPlaying(false);
              goTo(0);
            }}
          >
            {copy.replay}
          </button>
        )}
        <button
          type="button"
          className="verify-flow-btn verify-flow-btn-ghost"
          disabled={playing || done}
          onClick={() => {
            setPlaying(true);
            if (step === lastStep) goTo(0);
          }}
        >
          {copy.play}
        </button>
      </div>
    </div>
  );
}
