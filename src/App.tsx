import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { Routes, Route, useLocation } from "react-router";
import { TsmProjectPage } from "./pages/TsmProjectPage";
import { AboutPage } from "./pages/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { useEffect, useState } from "react";
import { type Language, translations } from "./i118n/translations";
export function App() {
  const location = useLocation();
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("portfolio-language");
    if (
      savedLanguage === "pl" ||
      savedLanguage === "nl" ||
      savedLanguage === "en"
    ) {
      return savedLanguage;
    }
    const browserLanguage = navigator.language.slice(0, 2).toLowerCase();
    return browserLanguage === "nl" || browserLanguage === "en"
      ? browserLanguage
      : "pl";
  });
  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem("portfolio-language", language);
  }, [language]);
  useEffect(() => {
    const texts = translations[language];
    const path = location.pathname.replace(/\/$/, "") || "/";
    const isHome = path === "/";
    const isAbout = path === "/o-mnie";
    const isProject = path === "/projekty/tsm";
    const title = isHome
      ? "React & TypeScript"
      : isAbout ? texts.about : isProject ? "Support Ticket Manager" : texts.notFoundTitle;
    document.title = `${title} — Szymon Michałek`;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute("content", isHome ? texts.homeMeta : isAbout
      ? texts.aboutMeta : isProject ? texts.projectMeta : texts.notFoundDescription);
  }, [language, location.pathname]);
  return (
    <div className="flex flex-col min-h-screen">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="grow py-12 px-5 md:px-8 w-full max-w-[1120px] mx-auto">
        <Routes>
          <Route path="/" element={<HomePage language={language} />} />
          <Route path="/projekty/tsm/" element={<TsmProjectPage language={language} />} />
          <Route path="/o-mnie" element={<AboutPage language={language} />} />
          <Route path="*" element={<NotFoundPage language={language} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
