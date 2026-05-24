import AttestationRecord from "@/components/attestation-record";
import SetHtmlLang from "@/components/set-html-lang";
import VerifyFlow from "@/components/verify-flow";
import { getMessages, type Locale } from "@/lib/i18n";
import { CONTACT_EMAIL, LINKS } from "@/lib/attestation-data";

type LandingPageProps = {
  locale: Locale;
};

export default function LandingPage({ locale }: LandingPageProps) {
  const m = getMessages(locale);

  const footerHref = (key: (typeof m.footer.links)[number]["key"]) => {
    switch (key) {
      case "registry":
        return LINKS.registryContract;
      case "tx":
        return LINKS.tx;
      case "ipfs":
        return LINKS.reportIpfsJson;
    }
  };

  return (
    <>
      <SetHtmlLang locale={locale} />
      <nav className="nav" aria-label={m.nav.aria}>
        <div className="nav-inner">
          <a className="brand" href="#top">
            <svg
              className="brand-mark"
              viewBox="0 0 32 32"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 4.5L27 9v8c0 5.8-4.8 9.8-11 11-6.2-1.2-11-5.2-11-11V9L16 4.5z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <polyline
                points="11,16.5 14.5,20 21,13"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Stela
          </a>
          <div className="nav-links">
            <a href="#problem">{m.nav.problem}</a>
            <a href="#solution">{m.nav.solution}</a>
            <a href="#verify-flow">{m.nav.verify}</a>
            <a href="#example">{m.nav.example}</a>
          </div>
        </div>
      </nav>

      <header className="hero hero-distill" id="top">
        <div className="wrap">
          <h1>{m.hero.title}</h1>
          <p className="lead">{m.hero.lead}</p>
          <a className="hero-jump" href="#example">
            {m.hero.jump} ↓
          </a>
        </div>
      </header>

      <section className="section-distill" id="problem">
        <div className="wrap block">
          <p className="section-label section-label--problem">{m.problem.label}</p>
          <h2 className="block-title">{m.problem.title}</h2>
          <p className="block-body">{m.problem.body}</p>
        </div>
      </section>

      <section className="section-distill" id="solution">
        <div className="wrap block block-wide">
          <p className="section-label section-label--solution">{m.solution.label}</p>
          <h2 className="block-title">{m.solution.title}</h2>
          <ol className="flow-list">
            {m.solution.steps.map((step) => (
              <li key={step.label}>
                <strong>{step.label}.</strong> {step.text}
              </li>
            ))}
          </ol>
          <VerifyFlow copy={m.verifyFlow} />
        </div>
      </section>

      <section className="section-distill section-example" id="example">
        <div className="wrap block">
          <h2 className="block-title">{m.record.title}</h2>
          <AttestationRecord copy={m.record} />
        </div>
      </section>

      <footer className="landing-footer landing-footer-distill">
        <div className="wrap block">
          <p className="foot-line">{m.footer.line}</p>
          <p className="foot-links">
            {m.footer.contact}:{" "}
            <a className="external-link" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
            {m.footer.links.map((link) => (
              <span key={link.key}>
                {" · "}
                <a
                  className="external-link"
                  href={footerHref(link.key)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </footer>
    </>
  );
}
