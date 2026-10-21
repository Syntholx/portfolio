import { ThemeToggle } from "./ThemeToggle";
import { type Language, translations } from "../i118n/translations";
export function Header(prop: {
  language: Language;
  onLanguageChange: (language: Language) => void;
}) {
  const texts = translations[prop.language];
  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface)]">
      <nav
        className="max-w-[1120px] mx-auto px-5 md:px-8 py-5 flex flex-col md:flex-row md:justify-between md:items-center gap-4 "
        aria-label={texts.navigationLabel}
      >
        <a
          href="/"
          className="inline-flex min-h-[44px] items-center self-start text-[18px] font-semibold"
        >
          Szymon Michałek
        </a>
        <div className="flex flex-wrap gap-x-5 gap-y-2 [&>a]:inline-flex [&>a]:min-h-[44px] [&>a]:items-center [&>a]:transition-colors [&>a:hover]:text-[var(--accent)]">
          <a href="/#projekty" className="text-sm font-semibold">
            {texts.projects}
          </a>
          <a href="/o-mnie" className="text-sm font-semibold">
            {texts.about}
          </a>
          <a href="/#kontakt" className="text-sm font-semibold">
            {texts.contact}
          </a>
          <div role="group" aria-label={texts.languageLabel} className="flex items-center gap-1">
            {(["pl", "nl", "en"] as const).map((language) => (
              <button
                key={language}
                type="button"
                lang={language}
                aria-label={language === "pl" ? "Polski" : language === "nl" ? "Nederlands" : "English"}
                aria-pressed={prop.language === language}
                onClick={() => prop.onLanguageChange(language)}
                className="inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-lg border border-[var(--border)] text-sm font-semibold transition-colors hover:bg-[var(--surface)] aria-pressed:bg-[var(--accent)] aria-pressed:text-white"
              >
                {language.toUpperCase()}
              </button>
            ))}
          </div>
          <ThemeToggle language={prop.language} />
        </div>
      </nav>
    </header>
  );
}
