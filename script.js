const translations = {
  pl: {
    pageTitle: "Szymon Michałek — Frontend Development",
    pageDescription: "Portfolio Szymona Michałka — nauka frontendu aplikacyjnego, HTML, CSS i JavaScript oraz projekt Support Ticket Manager.",
    languageLabel: "Wybór języka",
    "nav.about": "O mnie",
    "nav.skills": "Umiejętności",
    "nav.projects": "Projekty",
    "nav.contact": "Kontakt",
    "hero.eyebrow": "Moja droga do frontendu aplikacyjnego",
    "hero.title": "Uczę się tworzyć interaktywne aplikacje webowe.",
    "hero.description": "Rozwijam umiejętności HTML, CSS i JavaScript, tworząc interfejsy, które reagują na działania użytkownika. Tutaj pokazuję projekty i postępy w nauce.",
    "hero.link": "Zobacz projekty",
    "about.title": "O mnie",
    "about.description": "Skupiam się na frontendzie aplikacyjnym: interakcjach, stanie i czytelnych interfejsach. Doświadczenie z C# i budowy API pomaga mi rozumieć przepływ danych między przeglądarką a backendem.",
    "skills.title": "Technologie i kierunek nauki",
    "skills.current": "Aktualnie rozwijam",
    "skills.focus": "Teraz: JavaScript — DOM, zdarzenia i stan interfejsu.",
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
    pageTitle: "Szymon Michałek — Frontend Development",
    pageDescription: "Portfolio van Szymon Michałek — frontendontwikkeling, HTML, CSS en JavaScript en het project Support Ticket Manager.",
    languageLabel: "Taal kiezen",
    "nav.about": "Over mij",
    "nav.skills": "Vaardigheden",
    "nav.projects": "Projecten",
    "nav.contact": "Contact",
    "hero.eyebrow": "Mijn weg naar frontendontwikkeling",
    "hero.title": "Ik leer interactieve webapplicaties bouwen.",
    "hero.description": "Ik ontwikkel mijn vaardigheden in HTML, CSS en JavaScript en bouw interfaces die reageren op gebruikersacties. Hier deel ik mijn projecten en leerproces.",
    "hero.link": "Bekijk projecten",
    "about.title": "Over mij",
    "about.description": "Ik richt me op frontendontwikkeling voor webapplicaties: interacties, statusbeheer en duidelijke interfaces. Mijn ervaring met C# en API-ontwikkeling helpt me de gegevensstroom tussen browser en backend te begrijpen.",
    "skills.title": "Technologieën en leertraject",
    "skills.current": "Waar ik nu aan werk",
    "skills.focus": "Nu: JavaScript — DOM, events en interfacestatus.",
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
    pageTitle: "Szymon Michałek — Frontend Development",
    pageDescription: "Szymon Michałek's portfolio — learning application frontend development, HTML, CSS and JavaScript, with the Support Ticket Manager project.",
    languageLabel: "Choose language",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.eyebrow": "My path to application frontend development",
    "hero.title": "Learning to build interactive web applications.",
    "hero.description": "I am developing my HTML, CSS and JavaScript skills by building interfaces that respond to user actions. Here I share my projects and learning progress.",
    "hero.link": "View projects",
    "about.title": "About me",
    "about.description": "I focus on application frontend development: interactions, state and clear interfaces. My experience with C# and API development helps me understand the flow of data between the browser and the backend.",
    "skills.title": "Technologies and learning path",
    "skills.current": "Currently practising",
    "skills.focus": "Current focus: JavaScript — DOM, events and interface state.",
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
