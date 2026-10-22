import { type Language, translations } from "../i118n/translations";

export function TsmProjectPage(props: { language: Language }) {
  const texts = translations[props.language];
  return (
    <section className="py-6 md:py-10">
      <a
        href="/#projekty"
        className="inline-flex min-h-[44px] items-center text-sm font-semibold text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
      >
        ← {texts.backProjects}
      </a>

      <header className="mt-6">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
          {texts.projectKicker}
        </p>
        <h1 className="mt-4 max-w-[850px] border-l-4 border-[var(--accent)] pl-5 text-[36px] font-semibold leading-tight tracking-tight md:text-[56px]">
          Support Ticket Manager
        </h1>
        <p className="mt-6 max-w-[720px] text-lg leading-relaxed text-[var(--text-muted)]">
          {texts.projectIntro}
        </p>

        <ul
          aria-label={texts.technologiesLabel}
          className="mt-6 flex flex-wrap gap-2 [&>li]:rounded-full [&>li]:border [&>li]:border-[var(--border)] [&>li]:px-3 [&>li]:py-1 [&>li]:text-sm [&>li]:text-[var(--text-muted)]"
        >
          <li>React</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>ASP.NET Core</li>
          <li>SQL Server</li>
          <li>Vitest</li>
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="https://tsm.szymon-michalek.dev"
          rel="noopener noreferrer"
          target="_blank"
          className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
        >
          {texts.demoLink}
        </a>
        <a
          href="https://github.com/Syntholx/support-ticket-manager"
          rel="noopener noreferrer"
          target="_blank"
          className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] border border-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
        >
          {texts.codeLink}
        </a>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
          {texts.projectStatus}
        </p>
      </header>
      <section className="mt-12 border-t border-[var(--border)] pt-10">
        <h2 className="mb-6 text-[28px] font-semibold">{texts.galleryTitle}</h2>
        <p className="mb-6 text-sm leading-relaxed text-[var(--text-muted)]">
          {texts.galleryNote}
        </p>
        <div className="grid gap-6 lg:grid-cols-3">
          <figure className="min-w-0">
            <a
              href="/images/tsm/tsm-ticket-list.png"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="block h-auto w-full rounded-xl border border-[var(--border)]"
                src="/images/tsm/tsm-ticket-list.png"
                alt={texts.galleryListAlt}
              ></img>
            </a>
            <figcaption className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              {texts.galleryListCaption}
            </figcaption>
          </figure>
          <figure className="min-w-0">
            <a
              href="/images/tsm/tsm-ticket-details.png"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="block h-auto w-full rounded-xl border border-[var(--border)]"
                src="/images/tsm/tsm-ticket-details.png"
                alt={texts.galleryDetailsAlt}
              ></img>
            </a>
            <figcaption className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              {texts.galleryDetailsCaption}
            </figcaption>
          </figure>
          <figure className="min-w-0">
            <a
              href="/images/tsm/tsm-ticket-archive.png"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="block h-auto w-full rounded-xl border border-[var(--border)]"
                src="/images/tsm/tsm-ticket-archive.png"
                alt={texts.galleryArchiveAlt}
              ></img>
            </a>
            <figcaption className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
              {texts.galleryArchiveCaption}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="mt-12 border-t border-[var(--border)] pt-10">
        <h2 className="text-[28px] font-semibold">{texts.rolesTitle}</h2>
        <p className="mt-3 max-w-[720px] leading-relaxed text-[var(--text-muted)]">
          {texts.rolesIntro}
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <section className="min-w-0 rounded-2xl bg-[var(--surface)] p-6 md:p-8">
            <h3 className="text-xl font-semibold">{texts.userTitle}</h3>
            <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-[var(--text-muted)]">
              {texts.userFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
          <section className="min-w-0 rounded-2xl bg-[var(--surface)] p-6 md:p-8">
            <h3 className="text-xl font-semibold">Support</h3>
            <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-[var(--text-muted)]">
              {texts.supportFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      <section className="mt-12 border-t border-[var(--border)] pt-10">
        <h2 className="text-[28px] font-semibold">{texts.technicalTitle}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {texts.technical.map((item) => (
            <section key={item.title} className="min-w-0">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-[var(--text-muted)]">
                {item.description}
              </p>
            </section>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl bg-[var(--surface)] p-6 md:p-8">
        <h2 className="text-2xl font-semibold">{texts.contributionTitle}</h2>
        <p className="mt-4 max-w-[760px] leading-relaxed text-[var(--text-muted)]">
          {texts.contribution}
        </p>
        <p className="mt-4 max-w-[760px] leading-relaxed text-[var(--text-muted)]">
          {texts.limitations}
        </p>
      </section>
    </section>
  );
}
