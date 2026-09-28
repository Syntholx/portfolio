const translations = {
  pl: {
    pageTitle: "Szymon Michałek — C#/.NET i frontend",
    pageDescription: "Portfolio Szymona Michałka — nauka full-stack React i ASP.NET Core, aktualna praktyka HTML, CSS i JavaScript oraz projekt Support Ticket Manager.",
    languageLabel: "Wybór języka",
    "nav.about": "O mnie",
    "nav.skills": "Umiejętności",
    "nav.projects": "Projekty",
    "nav.contact": "Kontakt",
    "hero.eyebrow": "Moja droga do full-stack development",
    "hero.title": "Rozwijam aplikacje webowe — C#/.NET i frontend.",
    "hero.description": "Uczę się tworzyć kompletne aplikacje: interaktywne interfejsy oraz API z bazą danych. Rozwijam się w kierunku full-stack React + ASP.NET Core.",
    "hero.link": "Zobacz projekty",
    "about.title": "O mnie",
    "about.description": "Uczę się programowania, budując aplikacje webowe. Najbardziej interesuje mnie tworzenie funkcji, z których użytkownik może faktycznie korzystać — od interfejsu po działanie całej operacji. Rozwijam się w kierunku full-stack, a w nauce stawiam na praktykę, zrozumienie kodu i coraz większą samodzielność.",
    "skills.title": "Technologie i kierunek nauki",
    "skills.current": "Aktualnie rozwijam",
    "skills.focus": "Teraz: JavaScript — DOM, formularze, zdarzenia i zarządzanie stanem.",
    "skills.next": "Kolejne kroki",
    "skills.plannedNote": "Plan nauki — nie deklaracja obecnych umiejętności.",
    "skills.api": "Integracja API",
    "skills.testing": "Testowanie",
    "projects.kicker": "Projekt backendowy",
    "skills.description": "Ćwiczę HTML, CSS i JavaScript: responsywne układy, dostępność oraz logikę interfejsu.",
    "projects.title": "Projekty",    "projects.description": "Backend systemu zgłoszeń wsparcia. Umożliwia tworzenie i obsługę zgłoszeń, logowanie oraz dostęp zależny od roli użytkownika.",    "projects.codeLink": "Kod i dokumentacja ↗",

    "projects.demoNote": "Projekt edukacyjny · uruchamiany lokalnie",
    "contact.title": "Kontakt",
    "contact.description": "Chcesz się skontaktować lub zobaczyć mój kod?",
    "contact.email": "E-mail",
  },
  nl: {
    pageTitle: "Szymon Michałek — C#/.NET en frontend",
    pageDescription: "Portfolio van Szymon Michałek — leren werken met React en ASP.NET Core, huidige oefeningen in HTML, CSS en JavaScript en het project Support Ticket Manager.",
    languageLabel: "Taal kiezen",
    "nav.about": "Over mij",
    "nav.skills": "Vaardigheden",
    "nav.projects": "Projecten",
    "nav.contact": "Contact",
    "hero.eyebrow": "Mijn weg naar full-stack development",
    "hero.title": "Ik bouw webapplicaties — C#/.NET en frontend.",
    "hero.description": "Ik leer complete applicaties bouwen: interactieve interfaces en API’s met een database. Ik ontwikkel me richting full-stack met React en ASP.NET Core.",
    "hero.link": "Bekijk projecten",
    "about.title": "Over mij",
    "about.description": "Ik leer programmeren door webapplicaties te bouwen. Wat mij het meest interesseert, is functies maken die mensen daadwerkelijk kunnen gebruiken — van de interface tot de volledige werking erachter. Ik ontwikkel me richting full-stack en leg bij het leren de nadruk op oefenen, code begrijpen en steeds zelfstandiger werken.",
    "skills.title": "Technologieën en leertraject",
    "skills.current": "Waar ik nu aan werk",
    "skills.focus": "Nu: JavaScript — DOM, formulieren, events en statusbeheer.",
    "skills.next": "Volgende stappen",
    "skills.plannedNote": "Leerplan — geen overzicht van huidige vaardigheden.",
    "skills.api": "API-integratie",
    "skills.testing": "Testen",
    "projects.kicker": "Backendproject",
    "skills.description": "Ik oefen met HTML, CSS en JavaScript: responsieve layouts, toegankelijkheid en interfacelogica.",
    "projects.title": "Projecten",    "projects.description": "Backend voor een supportticketsysteem. Ondersteunt het aanmaken en behandelen van tickets, inloggen en toegang op basis van gebruikersrollen.",    "projects.codeLink": "Code en documentatie ↗",

    "projects.demoNote": "Leerproject · draait lokaal",
    "contact.title": "Contact",
    "contact.description": "Wil je contact opnemen of mijn code bekijken?",
    "contact.email": "E-mail",
  },
  en: {
    pageTitle: "Szymon Michałek — C#/.NET and frontend",
    pageDescription: "Szymon Michałek's portfolio — learning full-stack React and ASP.NET Core, currently practising HTML, CSS and JavaScript, with the Support Ticket Manager project.",
    languageLabel: "Choose language",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.eyebrow": "My path to full-stack development",
    "hero.title": "Building web applications — C#/.NET and frontend.",
    "hero.description": "I am learning to build complete applications: interactive interfaces and APIs backed by a database. My goal is full-stack development with React and ASP.NET Core.",
    "hero.link": "View projects",
    "about.title": "About me",
    "about.description": "I am learning to program by building web applications. What interests me most is creating features people can actually use — from the interface to the complete operation behind it. I am working towards full-stack development, focusing on practice, understanding the code and becoming increasingly independent.",
    "skills.title": "Technologies and learning path",
    "skills.current": "Currently practising",
    "skills.focus": "Current focus: JavaScript — DOM, forms, events and state management.",
    "skills.next": "Next steps",
    "skills.plannedNote": "Learning goals — not a claim of current proficiency.",
    "skills.api": "API integration",
    "skills.testing": "Testing",
    "projects.kicker": "Backend project",
    "skills.description": "I practise HTML, CSS and JavaScript: responsive layouts, accessibility and interface logic.",
    "projects.title": "Projects",    "projects.description": "Backend for a support ticket system. Supports creating and managing tickets, sign-in and role-based access.",    "projects.codeLink": "Code and documentation ↗",

    "projects.demoNote": "Learning project · runs locally",
    "contact.title": "Contact",
    "contact.description": "Would you like to get in touch or view my code?",
    "contact.email": "Email",
  },
};

const supportedLanguages = Object.keys(translations);
const languageButtons = document.querySelectorAll("[data-language]");
const translatableElements = document.querySelectorAll("[data-i18n]");
const description = document.querySelector('meta[name="description"]');
const languageSwitch = document.querySelector(".language-switch");

function setLanguage(language) {
  const selectedLanguage = supportedLanguages.includes(language) ? language : "pl";
  const selectedTranslations = translations[selectedLanguage];

  document.documentElement.lang = selectedLanguage;
  document.title = selectedTranslations.pageTitle;
  description.content = selectedTranslations.pageDescription;
  languageSwitch.setAttribute("aria-label", selectedTranslations.languageLabel);

  translatableElements.forEach((element) => {
    element.textContent = selectedTranslations[element.dataset.i18n];
  });

  languageButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.language === selectedLanguage),
    );
  });

  localStorage.setItem("portfolio-language", selectedLanguage);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

const savedLanguage = localStorage.getItem("portfolio-language");
const browserLanguage = navigator.language.slice(0, 2).toLowerCase();

setLanguage(savedLanguage ?? browserLanguage);
