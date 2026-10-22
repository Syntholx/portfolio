# Portfolio Szymona Michałka

Portfolio w React i TypeScript prezentujące naukę frontendu oraz projekt
Support Ticket Manager. Strona ma wersje PL, NL i EN, jasny i ciemny motyw
oraz responsywny układ. Wybór języka i motywu jest zapisywany w localStorage.
Przy pierwszym wejściu strona korzysta z języka przeglądarki i motywu systemowego;
dla języków innych niż PL/NL/EN wybierany jest polski.

## Technologie i struktura

React, TypeScript, React Router, Vite i Tailwind CSS.

- `src/pages/` — strona główna, opis autora, prezentacja TSM i widok nieznanej trasy.
- `src/components/` — wspólny nagłówek, stopka, karta projektu i przełącznik motywu.
- `src/i118n/translations.ts` — treści w trzech językach.
- `src/styles.css` — Tailwind i zmienne kolorów obu motywów.
- `public/images/tsm/` — trzy zrzuty aplikacji na fikcyjnych danych.
- `public/_redirects` — przekierowania dawnych adresów TSM.

Trasy aplikacji: `/`, `/o-mnie` i `/projekty/tsm/`. Nagłówek i stopka są wspólne.
Pozostałe adresy obsługuje komponent z informacją o nieznalezionej stronie.

## Uruchomienie lokalne

W głównym folderze repozytorium, z zainstalowanymi Node.js 24 LTS i npm:

```sh
npm ci
npm run dev
```

Adres developerski: `http://localhost:5501`. Nie otwieraj `index.html` bezpośrednio.
Samo portfolio nie wymaga API, bazy danych ani sekretów.

Podgląd gotowej wersji:

```sh
npm run build
npm run preview
```

Build trafia do `dist`, a podgląd działa na porcie 5501. Zatrzymaj wcześniej
serwer developerski, jeśli korzysta z tego portu. Podgląd Vite nie emuluje
przekierowań Cloudflare z pliku `_redirects`.

## Prezentacja Support Ticket Managera

Podstrona projektu opisuje aplikację React i TypeScript z API ASP.NET Core
oraz SQL Server. Pokazuje role użytkownika i Supportu, obsługę zgłoszeń,
rozwiązania techniczne i galerię listy, szczegółów oraz archiwum.
Zdjęcia przedstawiają polski interfejs; podpisy i opisy alternatywne są tłumaczone.
Kliknięcie otwiera pełny obraz w nowej karcie.

[Kod i instrukcja uruchomienia TSM](https://github.com/Syntholx/support-ticket-manager).
[Publiczne demo TSM](https://tsm.szymon-michalek.dev) działa na osobnym VPS.
Portfolio zawiera linki do demo na karcie projektu i jego podstronie.
Demo ma wspólne konta Użytkownik i Support oraz fikcyjne dane przywracane codziennie.
Nie wpisuj danych osobowych ani poufnych informacji. Rejestracja, odzyskiwanie
hasła i wysyłka e-maili są w demo wyłączone; pełna wersja lokalna je zachowuje.
Projekt powstaje w ramach nauki, z prowadzeniem, pomocą AI i review;
nie jest deklaracją samodzielnego wykonania całego systemu.

## Weryfikacja

```sh
npm test
```

Polecenie uruchamia kontrolę TypeScript, build oraz siedem testów kontrolnych
w `portfolio.test.mjs`. Testy sprawdzają kompletność i niepuste treści tłumaczeń,
powiązanie zdjęć z podpisami i plikami, deklaracje tras, przekierowania,
zasoby w buildzie, odnośniki do publicznego demo oraz brak usuniętej makiety.
Są to kontrole źródeł, danych i plików wynikowych, nie testy interakcji w przeglądarce.

Ręcznie sprawdź przełączanie PL/NL/EN, motyw i zachowanie wyborów po odświeżeniu,
nawigację klawiaturą, układ przy szerokości 375 px, otwieranie zdjęć oraz F5
na podstronach. Po wdrożeniu sprawdź też dawne adresy i bezpośrednie wejście
na `/projekty/tsm/` oraz `/o-mnie`.

## Publikacja na Cloudflare Pages

Istniejąca integracja z GitHub publikuje gałąź `main`. Push na tę gałąź
uruchamia automatyczne wdrożenie.

- Build command: `npm run build`.
- Build output directory: `dist`.
- Root directory: puste, czyli główny folder repozytorium.

Vite kopiuje pliki z `public` do `dist`. Dawne adresy `/tsm-demo`, `/tsm-demo/*`,
`/tsm` i `/tsm/*` przekierowują do `/#projekty`. Zdjęcia mają osobne adresy
`/images/tsm/`, więc nie kolidują z tymi regułami.

Nie dodajemy głównego `404.html`: Cloudflare Pages korzysta wtedy z domyślnej
obsługi SPA i przekazuje trasy aplikacji do `index.html`. Widok nieznanej trasy
w React nie oznacza odpowiedzi HTTP 404.
[Dokumentacja obsługi SPA](https://developers.cloudflare.com/pages/configuration/serving-pages/#single-page-application-spa-rendering)
i [przekierowań](https://developers.cloudflare.com/pages/configuration/redirects/).

## Historia interfejsu

Główne `script.js` i `styles.css` pochodzą ze starego portfolio i nie są używane
przez wersję React ani kopiowane do `dist`. Historyczny katalog `tsm-demo`
z makietą i dawnym lokalnym klientem został usunięty. Można odzyskać go
z historii Git. Przekierowania dawnych adresów pozostają aktywne;
aktualna galeria znajduje się w `public/images/tsm/`, a aplikacja na osobnej subdomenie.

## Kontakt

- E-mail: contact@szymon-michalek.dev
- GitHub: https://github.com/Syntholx
