import { ProjectCard } from "../components/ProjectCard";
import { Language } from "../i118n/translations";
import { translations } from "../i118n/translations";
export function HomePage(prop: { language: Language }) {
  const texts = translations[prop.language];
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
        <a
          href="mailto:contact@szymon-michalek.dev"
          className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-[10px] border border-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--accent-hover)]"
        >
          {texts.emailLink}
        </a>
      </section>
    </>
  );
}
