import { type Language, translations } from "../i118n/translations";

export function AboutPage(props: { language: Language }) {
  const texts = translations[props.language];
  return (
    <section className="py-6 md:py-10">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
        {texts.about}
      </p>
      <h1 className="mt-4 max-w-[800px] border-l-4 border-[var(--accent)] pl-5 text-[36px] font-semibold leading-tight tracking-tight md:text-[48px]">
        {texts.aboutTitle}
      </h1>
      <p className="mt-6 max-w-[680px] text-lg leading-relaxed text-[var(--text-muted)]">
        {texts.aboutIntro}
      </p>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <section className="min-w-0 rounded-2xl bg-[var(--surface)] p-6 md:p-8">
          <h2 className="text-xl font-semibold">{texts.buildTitle}</h2>
          <p className="mt-3 leading-relaxed text-[var(--text-muted)]">
            {texts.buildDescription}
          </p>
          <ul aria-label={texts.areasLabel} className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-[var(--text-muted)]">
            {texts.areas.map((area) => <li key={area}>{area}</li>)}
          </ul>
        </section>

        <section className="min-w-0 rounded-2xl bg-[var(--surface)] p-6 md:p-8">
          <h2 className="text-xl font-semibold">{texts.workTitle}</h2>
          <p className="mt-3 leading-relaxed text-[var(--text-muted)]">
            {texts.workDescription}
          </p>
        </section>
      </div>
      <a
        href="/#projekty"
        className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-[10px] bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
      >
        {texts.viewProjects}
      </a>
    </section>
  );
}
