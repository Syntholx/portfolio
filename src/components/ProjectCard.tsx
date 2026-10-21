import { type Language, translations } from "../i118n/translations";

export function ProjectCard(props: { language: Language }) {
  const texts = translations[props.language];
  return (
    <article className="min-w-0 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 md:p-7">
      <h3 className="text-2xl font-semibold break-words">Support Ticket Manager</h3>
      <p className="mt-3 leading-relaxed text-[var(--text-muted)]">
        {texts.projectDescription}
      </p>
      <ul
        aria-label={texts.technologiesLabel}
        className="mt-5 flex flex-wrap gap-2 [&>li]:rounded-full [&>li]:border [&>li]:border-[var(--border)] [&>li]:px-3 [&>li]:py-1 [&>li]:text-sm [&>li]:text-[var(--text-muted)]"
      >
        <li>React</li>
        <li>TypeScript </li>
        <li>Tailwind CSS</li>
        <li>ASP.NET Core</li>
        <li> SQL Server</li>
      </ul>
      <a
        href="/projekty/tsm/"
        className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-[10px] bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)]"
      >
        {texts.projectLink}
      </a>
      <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
        {texts.projectNote}
      </p>
    </article>
  );
}
