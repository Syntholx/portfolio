# Portfolio — Szymon Michałek

Osobista strona prezentująca naukę frontendu aplikacyjnego: HTML, CSS i JavaScript.
Jedynym prezentowanym projektem pozostaje backend Support Ticket Manager.
OrderFlow usunięto z portfolio; repozytorium projektu pozostaje bez zmian.
HTML, CSS i JavaScript; treści w językach PL/NL/EN.

Sekcja technologii oddziela aktualną praktykę od planowanych tematów.
JavaScript jest bieżącym tematem, a TypeScript, React, API i testowanie planem,
nie deklaracją opanowanych umiejętności. Układ grup przechodzi na jedną kolumnę
na węższych ekranach. TSM pozostaje jedyną kartą projektu.

## Projekt TSM

Portfolio prezentuje Support Ticket Manager v1.0.0: lokalne API z SQL Server,
EF Core, Identity, kontrolą właściciela, rolą Support i 101 testami.
Link prowadzi do kodu oraz instrukcji uruchomienia na GitHubie.
Nie deklarujemy publicznego API ani gotowości produkcyjnej.

## Uruchomienie i publikacja

Lokalnie otwórz index.html. Cloudflare Pages publikuje główną gałąź repozytorium
przez istniejącą integrację GitHub. Nie zmieniono dostawcy hostingu.

Plik _redirects kieruje dawne adresy /tsm-demo i /tsm-demo/* oraz /tsm i /tsm/*
do sekcji projektów. Nie wystarczy samo usunięcie przycisku: przekierowania
wyłączają również wejście przez dawny bezpośredni adres demo.
Zasady: https://developers.cloudflare.com/pages/configuration/redirects/

## Zachowany kod interfejsu

Katalog tsm-demo pozostaje w repozytorium na prośbę autora:

- index.html, demo.js i demo.css — historyczna makieta na przykładowych danych;
- local.html, local.js, local.css — wcześniejszy lokalny panel podłączony do API;
- serve-local.mjs — pomocniczy serwer loopback;
- local.test.mjs — testy logiki panelu z zastępczym DOM.

Lokalny panel nie obsługuje aktualnego logowania i sesji cookies.
Po zabezpieczeniu API nie jest działającym klientem obecnej wersji TSM.
Nie osłabiać ochrony API, żeby uruchomić stary panel.
Makietę można przeglądać lokalnie, ale nie prezentujemy jej jako aktualnego produktu.

Interfejs i jego testy przygotowano z pomocą AI. Nie oznacza to zaliczenia
frontendu ani samodzielnego wykonania całej aplikacji przez autora.
Dalsze wykorzystanie wymaga osobnego zadania integracji i zabezpieczeń.

## Weryfikacja

`node --check script.js`, `node portfolio.test.mjs` oraz `node tsm-demo/local.test.mjs`.
Testy panelu korzystają z atrap; nie potwierdzają działania z chronionym API.

## Kontakt

- E-mail: contact@szymon-michalek.dev
- GitHub: https://github.com/Syntholx
