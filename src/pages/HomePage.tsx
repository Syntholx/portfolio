import { ProjectCard } from "../components/ProjectCard";
import { Language } from "../i118n/translations";
import { translations } from "../i118n/translations";
import { useState } from "react";

const contactEmail = "contact@szymon-michalek.dev";

export function HomePage(prop: { language: Language }) {
  const texts = translations[prop.language];
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle");
  const [isCopying, setIsCopying] = useState(false);

  async function copyEmail() {
    if (isCopying) return;
    setIsCopying(true);
    setCopyStatus("idle");
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    } finally {
      setIsCopying(false);
    }
  }
  return (
    <>
      <section className="py-[48px] md:py-[64px]">
        <h1 className="text-[36px] md:text-[56px] font-semibold leading-tight max-w-[800px]">
          {texts.heroTitle}
        </h1>
        <p className="mt-[24px] text-[18px] max-w-[680px] text-[var(--text-muted)] leading-relaxed">
          {texts.heroDescription}
        </p>
        <a
          href="/#projekty"
          className="inline-flex mt-[32px] items-center justify-center min-h-[44px] px-[20px] py-[12px] rounded-[10px] text-[white] text-[14px] font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] bg-[var(--accent)] hover:bg-[var(--accent-hover)] "
        >
          {texts.viewProjects}
        </a>
      </section>
      <section id="projekty" className="border-t border-[var(--border)] py-12">
        <h2 className="mb-6 text-[28px] font-semibold">{texts.projects}</h2>
        <ProjectCard language={prop.language} />
      </section>
      <section id="kontakt" className="border-t border-[var(--border)] py-12">
        <h2 className="text-[28px] font-semibold">{texts.contact}</h2>
        <p className="mt-3 leading-relaxed text-[var(--text-muted)]">
          {texts.contactDescription}
        </p>
        <p className="mt-4 break-words text-lg font-semibold select-all">
          {contactEmail}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] border border-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--accent-hover)]"
          >
            {texts.emailLink}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            disabled={isCopying}
            className="inline-flex min-h-[44px] cursor-pointer items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-sm font-semibold text-[var(--text)] transition-colors hover:border-[var(--accent)] disabled:cursor-wait disabled:opacity-60"
          >
            {texts.copyEmail}
          </button>
        </div>
        <p role="status" className="mt-3 min-h-5 text-sm leading-relaxed text-[var(--text-muted)]">
          {copyStatus === "copied" ? texts.emailCopied : copyStatus === "error" ? texts.emailCopyError : ""}
        </p>
      </section>
    </>
  );
}
