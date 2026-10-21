export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] text-[var(--text-muted)]">
      <div className="max-w-[1120px] mx-auto  text-sm px-5 md:px-8 py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        <p className="m-0">© 2026 Szymon Michałek</p>
        <a
          href="https://github.com/Syntholx"
          rel="noopener noreferrer"
          target="_blank"
          className="inline-flex min-h-[44px] items-center self-start font-semibold transition-colors hover:text-[var(--accent)]"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
