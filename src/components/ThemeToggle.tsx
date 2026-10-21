import { useEffect, useState } from "react";
import { type Language, translations } from "../i118n/translations";

export function ThemeToggle(props: { language: Language }) {
  const texts = translations[props.language];
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);
  return (
    <button
      type="button"
      className="inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-[10px] border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
      aria-label={
        theme === "light" ? texts.darkTheme : texts.lightTheme
      }
      onClick={() => {
        setTheme((previous) => (previous === "light" ? "dark" : "light"));
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {theme === "light" ? (
          <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        )}
      </svg>
    </button>
  );
}
