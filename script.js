const translations = {
  pl: {
    pageTitle: "Szymon Michałek — C#/.NET Backend Developer",
    pageDescription:
      "Portfolio Szymona Michałka - nauka C# i .NET, rozwijane umiejętności backendowe oraz przyszłe projekty.",
    languageLabel: "Wybór języka",
    "nav.about": "O mnie",
    "nav.skills": "Umiejętności",
    "nav.projects": "Projekty",
    "nav.contact": "Kontakt",
    "hero.eyebrow": "Moja droga do backendu",
    "hero.title": "Rozwijam się w C# i .NET — projekt po projekcie.",
    "hero.description":
      "Uczę się tworzyć czytelne aplikacje backendowe i świadomie rozwiązywać problemy za pomocą kodu. Tutaj pokazuję swoją drogę oraz projekty, które tworzę w trakcie nauki.",
    "hero.link": "Zobacz projekty",
    "about.title": "O mnie",
    "about.description":
      "Rozwijam się w kierunku C#/.NET Backend Developmentu. Najważniejsze są dla mnie logika, czytelny przepływ danych i świadome rozwiązywanie problemów. Doświadczenie zdobyte przy HTML i CSS wykorzystuję do lepszego rozumienia całych aplikacji webowych.",
    "skills.title": "Aktualnie rozwijam",
    "skills.description":
      "Buduję solidne podstawy C# i przygotowuję się do pracy z platformą .NET oraz aplikacjami backendowymi.",
    "skills.logic": "Logika programowania",
    "projects.title": "Projekty",
    "projects.kicker": "Pierwszy projekt backendowy",
    "projects.status": "W trakcie rozwoju",
    "projects.description":
      "Konsolowa aplikacja pomagająca pracownikowi wsparcia szybko znaleźć zgłoszenia wymagające najpilniejszej reakcji.",
    "projects.featureFiltering": "Filtrowanie pilnych zgłoszeń",
    "projects.featureCritical": "Wykrywanie zgłoszeń krytycznych",
    "projects.featureSorting": "Sortowanie kolejki według priorytetu",
    "projects.codeSoon":
      "Kod źródłowy udostępnię po ukończeniu wersji alpha i dodaniu API.",
    "contact.title": "Kontakt",
    "contact.description": "Chcesz się skontaktować lub zobaczyć mój kod?",
    "contact.email": "E-mail",
  },
  nl: {
    pageTitle: "Szymon Michałek — C#/.NET Backend Developer",
    pageDescription:
      "Portfolio van Szymon Michałek - C# en .NET, backendvaardigheden en toekomstige projecten.",
    languageLabel: "Taal kiezen",
    "nav.about": "Over mij",
    "nav.skills": "Vaardigheden",
    "nav.projects": "Projecten",
    "nav.contact": "Contact",
    "hero.eyebrow": "Mijn weg naar backend development",
    "hero.title": "Ik ontwikkel mij in C# en .NET — project voor project.",
    "hero.description":
      "Ik leer leesbare backendapplicaties te bouwen en problemen bewust met code op te lossen. Hier laat ik mijn leerproces en de projecten zien die ik tijdens mijn opleiding maak.",
    "hero.link": "Bekijk projecten",
    "about.title": "Over mij",
    "about.description":
      "Ik ontwikkel mij richting C#/.NET Backend Development. Logica, een duidelijke gegevensstroom en het bewust oplossen van problemen staan voor mij centraal. Mijn ervaring met HTML en CSS helpt mij om complete webapplicaties beter te begrijpen.",
    "skills.title": "Wat ik momenteel ontwikkel",
    "skills.description":
      "Ik bouw een sterke basis in C# en bereid mij voor op het werken met .NET en backendapplicaties.",
    "skills.logic": "Programmeerlogica",
    "projects.title": "Projecten",
    "projects.kicker": "Eerste backendproject",
    "projects.status": "In ontwikkeling",
    "projects.description":
      "Een consoleapplicatie waarmee een supportmedewerker snel tickets kan vinden die de meest dringende aandacht vereisen.",
    "projects.featureFiltering": "Urgente tickets filteren",
    "projects.featureCritical": "Kritieke tickets detecteren",
    "projects.featureSorting": "De wachtrij op prioriteit sorteren",
    "projects.codeSoon":
      "Ik publiceer de broncode zodra de alpha-versie en de API gereed zijn.",
    "contact.title": "Contact",
    "contact.description": "Wil je contact opnemen of mijn code bekijken?",
    "contact.email": "E-mail",
  },
  en: {
    pageTitle: "Szymon Michałek — C#/.NET Backend Developer",
    pageDescription:
      "Szymon Michałek's portfolio - learning C# and .NET, developing backend skills, and building future projects.",
    languageLabel: "Choose language",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "hero.eyebrow": "My path to backend development",
    "hero.title": "I am growing in C# and .NET — one project at a time.",
    "hero.description":
      "I am learning to build readable backend applications and solve problems deliberately through code. Here I share my learning journey and the projects I create along the way.",
    "hero.link": "View projects",
    "about.title": "About me",
    "about.description":
      "I am developing toward C#/.NET Backend Development. I value logic, clear data flow, and deliberate problem-solving. My experience with HTML and CSS helps me understand complete web applications more effectively.",
    "skills.title": "Currently developing",
    "skills.description":
      "I am building strong C# foundations and preparing to work with .NET and backend applications.",
    "skills.logic": "Programming logic",
    "projects.title": "Projects",
    "projects.kicker": "First backend project",
    "projects.status": "In development",
    "projects.description":
      "A console application that helps a support employee quickly find tickets requiring the most urgent response.",
    "projects.featureFiltering": "Filtering urgent tickets",
    "projects.featureCritical": "Detecting critical tickets",
    "projects.featureSorting": "Sorting the queue by priority",
    "projects.codeSoon":
      "I will publish the source code once the alpha version and API are complete.",
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
