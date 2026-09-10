# Portfolio — Szymon Michałek

Moja osobista strona prezentująca drogę nauki C#/.NET Backend Developmentu.
Portfolio będzie rozwijane wraz z kolejnymi umiejętnościami i samodzielnymi
projektami backendowymi.

## Technologie

- HTML
- CSS
- JavaScript (przełączanie języka PL/NL/EN)

Aktualny kierunek prezentowany na stronie:

- C#
- .NET
- Backend Development

## Uruchomienie lokalne

Otwórz plik `index.html` w przeglądarce.

## Kontakt

- E-mail: contact@szymon-michalek.dev
- GitHub: https://github.com/Syntholx

## Demo interfejsu TSM — podgląd MVP 7

`tsm-demo/index.html` to osobna makieta funkcjonalna w języku polskim,
inspirowana projektem dostarczonym przez autora. Link i opis demo na portfolio
są dostępne w PL/NL/EN. Portfolio prezentuje wydanie v0.7.0 backendu,
ale samo demo nie jest z nim połączone.

Demo ma pulpit użytkownika i widok pracownika wsparcia, wyszukiwanie,
filtrowanie, szczegóły, tworzenie, zmianę priorytetu, rozpoczęcie obsługi,
zamykanie oraz ponowne otwieranie zgłoszeń. Dane są wyłącznie przykładowe,
w pamięci JavaScript: odświeżenie usuwa zmiany. Nie ma połączenia z API,
bazą danych, logowania ani rzeczywistej autoryzacji. Widoki ról i autorzy
są symulacją. Nie należy wpisywać prawdziwych danych ani sekretów.
Limity 120/2000 znaków są ograniczeniem formularza demo, nie kontraktem API.

Interfejs przygotował asystent na prośbę autora; nie oznacza to zaliczenia
tych zagadnień frontendowych w kursie. Późniejsze podłączenie do API wymaga
osobnego etapu integracji oraz przygotowania backendu.

Sprawdzenie ręczne: oba widoki, filtr bez wyników, wybór zgłoszenia,
utworzenie (w tym same spacje), rozpoczęcie, zamknięcie/archiwum, ponowne
otwarcie, zmiana priorytetu, reset, obsługa klawiaturą i wąski ekran.

Weryfikacja 10.09.2026: składnia obu plików JS oraz test logiki w Node z
zastępczym DOM (dane, role demonstracyjne, sortowanie, filtry, cykl życia,
priorytet, formularz, bezpieczne wyświetlanie tekstu, reset) zakończone
powodzeniem. Lokalny serwer zwraca 200 dla strony, JS i CSS. Nie wykonano
wizualnego testu przeglądarkowego ani testu rzeczywistego układu mobilnego.
Powyższa lista ręczna pozostaje listą do sprawdzenia, nie deklaracją wyniku.

## Projekty

- Support Ticket Manager `v0.7.0` — ukończony etap edukacyjnego API, tworzenie,
  start/close/reopen, zmiana priorytetu, walidacja i 60 testów (29 jednostkowych,
  31 integracyjnych API). API lokalne, bez bazy, autoryzacji i zabezpieczenia
  współbieżnych zapisów. Nie jest to produkcyjne wdrożenie backendu.
  Kod: https://github.com/Syntholx/support-ticket-manager/tree/v0.7.0

### Historia — opis v0.5.0

- Support Ticket Manager `v0.5.0` — ukończone interaktywne MVP konsolowe w
  C#/.NET. Obsługuje menu operacji, wyszukiwanie po `Id`, filtrowanie i
  sortowanie kolejki, kontrolowane zmiany statusu oraz priorytetu, podsumowanie
  i walidację danych zgłoszenia. Odpowiedzialności zostały rozdzielone między
  model, zapytania, widok, sterowanie aplikacją i dane demonstracyjne. Użytkownik
  może tworzyć zgłoszenia z automatycznym `Id`, a status `Closed` tworzy archiwum
  oddzielone od aktywnej kolejki. MVP 5 dodaje typ statusu `TicketStatus`,
  serwis tworzenia zgłoszeń niezależny od konsoli i 22 testy jednostkowe xUnit.
  Opis i odnośnik wydania są dostępne w PL/NL/EN. Kod źródłowy:
  https://github.com/Syntholx/support-ticket-manager/tree/v0.5.0
