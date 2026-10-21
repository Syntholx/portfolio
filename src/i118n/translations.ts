export type Language = "pl" | "nl" | "en";

type Translation = {
  projects: string;
  about: string;
  contact: string;
  heroTitle: string;
  heroDescription: string;
  navigationLabel: string;
  languageLabel: string;
  darkTheme: string;
  lightTheme: string;
  viewProjects: string;
  contactDescription: string;
  emailLink: string;
  copyEmail: string;
  emailCopied: string;
  emailCopyError: string;
  technologiesLabel: string;
  projectDescription: string;
  projectLink: string;
  projectNote: string;
  backProjects: string;
  codeLink: string;
  notFoundTitle: string;
  notFoundDescription: string;
  backHome: string;
  aboutTitle: string;
  aboutIntro: string;
  buildTitle: string;
  buildDescription: string;
  workTitle: string;
  workDescription: string;
  areasLabel: string;
  areas: string[];
  projectKicker: string;
  projectIntro: string;
  projectStatus: string;
  rolesTitle: string;
  rolesIntro: string;
  userTitle: string;
  userFeatures: string[];
  supportFeatures: string[];
  technicalTitle: string;
  technical: { title: string; description: string }[];
  contributionTitle: string;
  contribution: string;
  limitations: string;
  homeMeta: string;
  aboutMeta: string;
  projectMeta: string;
  galleryTitle: string;
  galleryNote: string;
  galleryListCaption: string;
  galleryListAlt: string;
  galleryDetailsCaption: string;
  galleryDetailsAlt: string;
  galleryArchiveCaption: string;
  galleryArchiveAlt: string;
};

export const translations: Record<Language, Translation> = {
  pl: {
    projects: "Projekty",
    about: "O mnie",
    contact: "Kontakt",
    heroTitle: "Buduję interfejsy aplikacji webowych.",
    heroDescription: `Tworzę aplikacje w React i TypeScript, rozwijając umiejętności
          frontendowe. Pracuję z formularzami, stanem interfejsu i API, a
          działanie sprawdzam ręcznie oraz testami automatycznymi.`,
    navigationLabel: "Nawigacja główna",
    languageLabel: "Wybór języka",
    darkTheme: "Włącz ciemny motyw",
    lightTheme: "Włącz jasny motyw",
    viewProjects: "Zobacz projekty",
    contactDescription: "Chcesz porozmawiać o projekcie lub współpracy?",
    emailLink: "Napisz do mnie",
    copyEmail: "Kopiuj adres",
    emailCopied: "Adres e-mail został skopiowany.",
    emailCopyError: "Nie udało się skopiować adresu. Zaznacz go i skopiuj ręcznie.",
    technologiesLabel: "Technologie projektu",
    projectDescription:
      "Aplikacja do zgłaszania problemów i obsługi zgłoszeń przez pracowników wsparcia.",
    projectLink: "Poznaj projekt",
    projectNote: "Projekt edukacyjny. Demo online w przygotowaniu.",
    backProjects: "Wróć do projektów",
    codeLink: "Zobacz kod i dokumentację",
    notFoundTitle: "Nie znaleziono strony",
    notFoundDescription:
      "Podany adres nie istnieje. Wróć na stronę główną, aby zobaczyć projekty.",
    backHome: "Wróć na stronę główną",
    aboutTitle: "Lubię budować rzeczy, które działają.",
    aboutIntro:
      "Jestem Szymon. Rozwijam się we frontendzie, tworząc aplikacje w React i TypeScript. Lubię moment, w którym interfejs przestaje być samym widokiem i zaczyna odpowiadać na działania użytkownika.",
    buildTitle: "Co tworzę",
    buildDescription:
      "Pracuję nad interfejsami z formularzami, nawigacją i danymi z API. W Support Ticket Managerze połączyłem frontend z backendem ASP.NET Core, który rozwijałem wcześniej w C#.",
    workTitle: "Jak pracuję",
    workDescription:
      "Dzielę zadania na mniejsze kroki i korzystam z dokumentacji. Sprawdzam nie tylko poprawny przebieg, ale też błędy, wolne połączenie i zachowanie na telefonie. Testy automatyczne pomagają mi wracać do tych samych przypadków po zmianach kodu.",
    areasLabel: "Obszary pracy",
    areas: ["React i TypeScript", "Integracja API", "Testowanie"],
    projectKicker: "Projekt aplikacji webowej",
    projectIntro:
      "Od zgłoszenia problemu do zakończenia obsługi. Aplikacja łączy panel użytkownika i narzędzia pracownika wsparcia we wspólnym przepływie pracy — z aktualnym statusem, priorytetem i archiwum spraw.",
    projectStatus:
      "Projekt edukacyjny · działa lokalnie · demo online w przygotowaniu",
    rolesTitle: "Jeden proces, dwie perspektywy",
    rolesIntro:
      "Użytkownik śledzi własne sprawy, a Support zarządza kolejką zgłoszeń. Dostęp do danych i operacji kontroluje API, nie tylko widoczność przycisków w interfejsie.",
    userTitle: "Użytkownik",
    userFeatures: [
      "Tworzenie zgłoszenia i bezpośrednie przejście do szczegółów.",
      "Podgląd statusu i priorytetu, zamknięcie własnej sprawy.",
      "Aktywne zgłoszenia i archiwum z paginacją.",
      "Potwierdzanie konta i odzyskiwanie dostępu przez e-mail.",
    ],
    supportFeatures: [
      "Dostęp do kolejki zgłoszeń wszystkich użytkowników.",
      "Rozpoczęcie obsługi i aktualizacja statusu sprawy.",
      "Zmiana priorytetu w zakresie od 1 do 5.",
      "Zamknięcie zgłoszenia i ponowne otwarcie zamkniętej sprawy.",
    ],
    technicalTitle: "Nie tylko poprawny przebieg",
    technical: [
      {
        title: "Spójny interfejs",
        description:
          "Wspólne komponenty listy, wyszukiwania oraz etykiet statusu i priorytetu. Hooki oddzielają sesję i operacje API od prezentacji ekranów. Układ dostosowuje się do wąskich ekranów.",
      },
      {
        title: "Reakcja na błędy",
        description:
          "Osobne stany ładowania, pustych wyników i błędów. Blokady przycisków podczas operacji, ponawianie po utracie połączenia i obsługa wygasłej sesji oraz konfliktów zapisu.",
      },
      {
        title: "Sprawdzone zachowania",
        description:
          "Testy Vitest i React Testing Library sprawdzają logikę oraz reakcje formularzy na symulowane odpowiedzi. Uzupełniają je ręczne próby z API, wolnym połączeniem, klawiaturą i widokiem mobilnym.",
      },
    ],
    contributionTitle: "Mój wkład i dalszy kierunek",
    contribution:
      "Frontend rozwijałem podczas prowadzonej nauki, korzystając z kontraktów, przykładów i review AI. Implementowałem ekrany, integrację API i testy. Wcześniejsza praca nad backendem C# pomogła mi zrozumieć przepływ danych między interfejsem a serwerem. Projekt nie powstał całkowicie samodzielnie.",
    limitations:
      "Kolejnym etapem jest publiczne demo z fikcyjnymi danymi. Obecnie aplikacja wymaga lokalnego uruchomienia. Wyszukiwanie i sortowanie dotyczą pobranej strony zgłoszeń, nie całej bazy. Szczegóły uruchomienia i pozostałe ograniczenia opisuje README projektu.",
    homeMeta:
      "Portfolio Szymona Michałka — aplikacje w React i TypeScript, integracja API i testy.",
    aboutMeta:
      "Poznaj Szymona Michałka: rozwój frontendowy, React, TypeScript i sposób pracy nad aplikacjami.",
    projectMeta:
      "Support Ticket Manager — interfejs React i TypeScript, obsługa zgłoszeń, role użytkownika i Support oraz testy.",
    galleryTitle: "Podgląd aplikacji",
    galleryNote:
      "Zrzuty przedstawiają polską wersję interfejsu. Kliknij obraz, aby otworzyć go w pełnym rozmiarze.",
    galleryListCaption: "Lista aktywnych zgłoszeń użytkownika",
    galleryListAlt: "Lista zgłoszeń z oznaczeniami statusów i priorytetów",
    galleryDetailsCaption: "Szczegóły zgłoszenia i operacje Supportu",
    galleryDetailsAlt:
      "Widok szczegółów zgłoszenia z opisem, zmianą priorytetu i przyciskiem zamknięcia",
    galleryArchiveCaption: "Archiwum zamkniętych zgłoszeń",
    galleryArchiveAlt: "Lista zamkniętych zgłoszeń z ich priorytetami",
  },
  nl: {
    projects: "Projecten",
    about: "Over mij",
    contact: "Contact",
    heroTitle: "Ik bouw interfaces voor webapplicaties.",
    heroDescription: `Ik bouw applicaties met React en TypeScript en ontwikkel daarbij mijn frontendvaardigheden.
Ik werk met formulieren, interfacestatus en API’s en controleer de werking met handmatige en geautomatiseerde tests.`,
    navigationLabel: "Hoofdnavigatie",
    languageLabel: "Taal kiezen",
    darkTheme: "Donker thema inschakelen",
    lightTheme: "Licht thema inschakelen",
    viewProjects: "Bekijk projecten",
    contactDescription: "Wil je praten over een project of samenwerking?",
    emailLink: "Stuur me een e-mail",
    copyEmail: "E-mailadres kopiëren",
    emailCopied: "Het e-mailadres is gekopieerd.",
    emailCopyError: "Kopiëren is niet gelukt. Selecteer het adres en kopieer het handmatig.",
    technologiesLabel: "Projecttechnologieën",
    projectDescription:
      "Een applicatie om problemen te melden en supporttickets te behandelen.",
    projectLink: "Bekijk het project",
    projectNote: "Leerproject. Online demo in voorbereiding.",
    backProjects: "Terug naar projecten",
    codeLink: "Bekijk code en documentatie",
    notFoundTitle: "Pagina niet gevonden",
    notFoundDescription:
      "Dit adres bestaat niet. Ga terug naar de startpagina om de projecten te bekijken.",
    backHome: "Terug naar de startpagina",
    aboutTitle: "Ik bouw graag dingen die werken.",
    aboutIntro:
      "Ik ben Szymon. Ik ontwikkel mijn frontendvaardigheden door applicaties met React en TypeScript te bouwen. Ik houd van het moment waarop een interface meer wordt dan een scherm en reageert op wat de gebruiker doet.",
    buildTitle: "Wat ik bouw",
    buildDescription:
      "Ik werk aan interfaces met formulieren, navigatie en gegevens uit API’s. In Support Ticket Manager heb ik de frontend gekoppeld aan een ASP.NET Core-backend die ik eerder in C# ontwikkelde.",
    workTitle: "Hoe ik werk",
    workDescription:
      "Ik verdeel taken in kleinere stappen en gebruik documentatie. Ik controleer niet alleen het normale verloop, maar ook fouten, trage verbindingen en de weergave op een telefoon. Geautomatiseerde tests helpen me dezelfde scenario’s na codewijzigingen opnieuw te controleren.",
    areasLabel: "Werkgebieden",
    areas: ["React en TypeScript", "API-integratie", "Testen"],
    projectKicker: "Webapplicatieproject",
    projectIntro:
      "Van het melden van een probleem tot het afronden van de behandeling. De applicatie verbindt een gebruikerspaneel met de tools van supportmedewerkers in één werkproces, met een actuele status, prioriteit en ticketarchief.",
    projectStatus: "Leerproject · draait lokaal · online demo in voorbereiding",
    rolesTitle: "Eén proces, twee perspectieven",
    rolesIntro:
      "Gebruikers volgen hun eigen tickets, terwijl Support de volledige wachtrij beheert. De API controleert de toegang tot gegevens en acties; beveiliging berust niet alleen op zichtbare knoppen.",
    userTitle: "Gebruiker",
    userFeatures: [
      "Een ticket aanmaken en direct de details openen.",
      "Status en prioriteit bekijken en eigen tickets sluiten.",
      "Actieve tickets en een archief met paginering.",
      "Het account bevestigen en toegang herstellen via e-mail.",
    ],
    supportFeatures: [
      "Toegang tot de tickets van alle gebruikers.",
      "De behandeling starten en de ticketstatus bijwerken.",
      "De prioriteit wijzigen van 1 tot en met 5.",
      "Tickets sluiten en gesloten tickets opnieuw openen.",
    ],
    technicalTitle: "Meer dan alleen het normale verloop",
    technical: [
      {
        title: "Een consistente interface",
        description:
          "Gedeelde componenten voor lijsten, zoeken en status- en prioriteitslabels. Hooks scheiden de sessie en API-acties van de schermweergave. De lay-out past zich aan smalle schermen aan.",
      },
      {
        title: "Omgaan met fouten",
        description:
          "Aparte toestanden voor laden, lege resultaten en fouten. Knoppen worden tijdens acties geblokkeerd. De applicatie ondersteunt opnieuw proberen na verbindingsverlies en handelt verlopen sessies en opslagconflicten af.",
      },
      {
        title: "Getest gedrag",
        description:
          "Vitest en React Testing Library controleren de logica en de reactie van formulieren op gesimuleerde antwoorden. Handmatige controles met de API, een trage verbinding, het toetsenbord en een mobiel scherm vullen deze tests aan.",
      },
    ],
    contributionTitle: "Mijn bijdrage en volgende stappen",
    contribution:
      "Ik ontwikkelde de frontend tijdens een begeleid leertraject, met specificaties, voorbeelden en AI-review. Ik implementeerde schermen, API-integratie en tests. Eerder werk aan de C#-backend hielp me de gegevensstroom tussen interface en server te begrijpen. Het project is niet volledig zelfstandig gemaakt.",
    limitations:
      "De volgende stap is een publieke demo met fictieve gegevens. Momenteel moet de applicatie lokaal worden gestart. Zoeken en sorteren werken alleen op de opgehaalde pagina met tickets, niet op de volledige database. De README beschrijft de installatie en overige beperkingen.",
    homeMeta:
      "Portfolio van Szymon Michałek — applicaties met React en TypeScript, API-integratie en tests.",
    aboutMeta:
      "Maak kennis met Szymon Michałek: frontendontwikkeling, React, TypeScript en zijn werkwijze.",
    projectMeta:
      "Support Ticket Manager — een React- en TypeScript-interface met tickets, gebruikers- en Supportrollen en tests.",
    galleryTitle: "Applicatievoorbeeld",
    galleryNote:
      "De schermafbeeldingen tonen de Poolse interface. Klik op een afbeelding om deze op volledige grootte te bekijken.",
    galleryListCaption: "Actieve tickets van de gebruiker",
    galleryListAlt: "Ticketlijst met status- en prioriteitslabels",
    galleryDetailsCaption: "Ticketdetails en acties voor supportmedewerkers",
    galleryDetailsAlt:
      "Ticketdetails met een beschrijving, prioriteitskeuze en sluitknop",
    galleryArchiveCaption: "Archief van gesloten tickets",
    galleryArchiveAlt: "Lijst van gesloten tickets met hun prioriteiten",
  },
  en: {
    projects: "Projects",
    about: "About me",
    contact: "Contact",
    heroTitle: "I build interfaces for web applications.",
    heroDescription: `I build applications with React and TypeScript while developing my frontend skills.
I work with forms, interface state and APIs, and check how things work through manual and automated tests.`,
    navigationLabel: "Main navigation",
    languageLabel: "Choose language",
    darkTheme: "Switch to dark theme",
    lightTheme: "Switch to light theme",
    viewProjects: "View projects",
    contactDescription: "Would you like to discuss a project or collaboration?",
    emailLink: "Email me",
    copyEmail: "Copy email address",
    emailCopied: "Email address copied.",
    emailCopyError: "Could not copy the address. Select it and copy it manually.",
    technologiesLabel: "Project technologies",
    projectDescription:
      "An application for reporting problems and managing support tickets.",
    projectLink: "Explore the project",
    projectNote: "Learning project. Online demo in preparation.",
    backProjects: "Back to projects",
    codeLink: "View code and documentation",
    notFoundTitle: "Page not found",
    notFoundDescription:
      "This address does not exist. Return to the home page to explore the projects.",
    backHome: "Back to home",
    aboutTitle: "I like building things that work.",
    aboutIntro:
      "I’m Szymon. I’m developing my frontend skills by building applications with React and TypeScript. I enjoy the moment when an interface becomes more than a static view and starts responding to what users do.",
    buildTitle: "What I build",
    buildDescription:
      "I work on interfaces with forms, navigation and API data. In Support Ticket Manager, I connected the frontend to an ASP.NET Core backend that I had previously developed in C#.",
    workTitle: "How I work",
    workDescription:
      "I break tasks into smaller steps and use documentation. I check not only the happy path, but also errors, slow connections and behaviour on a phone. Automated tests help me revisit the same scenarios after code changes.",
    areasLabel: "Areas of work",
    areas: ["React and TypeScript", "API integration", "Testing"],
    projectKicker: "Web application project",
    projectIntro:
      "From reporting a problem to completing its resolution workflow. The application connects a user dashboard with support staff tools in a shared workflow, with an up-to-date status, priority and ticket archive.",
    projectStatus:
      "Learning project · runs locally · online demo in preparation",
    rolesTitle: "One workflow, two perspectives",
    rolesIntro:
      "Users follow their own tickets, while Support manages the full queue. The API controls access to data and actions; security does not rely solely on which buttons are visible.",
    userTitle: "User",
    userFeatures: [
      "Create a ticket and open its details directly.",
      "View status and priority, and close your own tickets.",
      "Browse active tickets and a paginated archive.",
      "Confirm an account and recover access by email.",
    ],
    supportFeatures: [
      "Access tickets from all users.",
      "Start handling a ticket and update its status.",
      "Change priority on a scale from 1 to 5.",
      "Close tickets and reopen closed ones.",
    ],
    technicalTitle: "Beyond the happy path",
    technical: [
      {
        title: "A consistent interface",
        description:
          "Shared components for lists, search, and status and priority badges. Hooks separate session handling and API operations from screen presentation. The layout adapts to narrow screens.",
      },
      {
        title: "Handling errors",
        description:
          "Separate loading, empty and error states. Buttons are disabled during operations. Users can retry after a connection failure, while the application handles expired sessions and write conflicts.",
      },
      {
        title: "Tested behaviour",
        description:
          "Vitest and React Testing Library check logic and form responses to simulated API results. Manual checks with the API, slow connections, keyboard navigation and mobile layouts complement these tests.",
      },
    ],
    contributionTitle: "My contribution and next steps",
    contribution:
      "I developed the frontend through guided learning, using specifications, examples and AI review. I implemented screens, API integration and tests. Earlier work on the C# backend helped me understand the flow of data between the interface and the server. The project was not built entirely independently.",
    limitations:
      "The next step is a public demo with fictional data. Currently, the application must be run locally. Search and sorting apply to the fetched page of tickets, not the entire database. The project README covers setup and other limitations.",
    homeMeta:
      "Szymon Michałek portfolio — React and TypeScript applications, API integration and testing.",
    aboutMeta:
      "Meet Szymon Michałek: frontend development, React, TypeScript and his approach to building applications.",
    projectMeta:
      "Support Ticket Manager — a React and TypeScript interface with tickets, user and Support roles, and tests.",
    galleryTitle: "Application preview",
    galleryNote:
      "The screenshots show the Polish interface. Click an image to view it at full size.",
    galleryListCaption: "User’s active tickets",
    galleryListAlt: "Ticket list with status and priority badges",
    galleryDetailsCaption: "Ticket details and support actions",
    galleryDetailsAlt:
      "Ticket details with a description, priority selector and close button",
    galleryArchiveCaption: "Closed ticket archive",
    galleryArchiveAlt: "List of closed tickets with their priorities",
  },
};
