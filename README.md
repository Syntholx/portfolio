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

### Lokalny panel TSM z API — 13.09.2026

Publiczne `tsm-demo/index.html` nadal jest niezależnym demo na przykładowych danych.
Osobny `tsm-demo/local.html` pobiera kolejkę, archiwum i szczegóły z lokalnego API.
Panel pozwala też utworzyć zgłoszenie: tytuł, opis i priorytet wysyła przez POST,
a po potwierdzonym zapisie odświeża kolejkę. Bez logowania, autorów i przypisywania.
Formularz blokuje podwójne wysłanie podczas zapisu i zachowuje dane przy błędzie.
Przy utracie odpowiedzi ostrzega przed ponowieniem — zapis mógł już nastąpić.
W szczegółach zgłoszenia Open dostępne jest „Rozpocznij obsługę”. Przycisk wysyła
POST /api/tickets/{id}/start, blokuje podwójne kliknięcie i po HTTP 200 ponownie
pobiera kolejkę oraz szczegóły. Dla InProgress i Closed nie jest wyświetlany.
Błędy 404, 409 i problemy połączenia pokazują komunikat bez lokalnej zmiany statusu.
Testy logiki obejmują powodzenie, odmowę, brak zgłoszenia i podwójne kliknięcie.
Przycisk „Zamknij zgłoszenie” jest dostępny dla Open i InProgress, wywołuje
POST /api/tickets/{id}/close i odświeża kolejkę oraz archiwum po powodzeniu.
Zamykanie i rozpoczęcie mają wspólną blokadę równoczesnego wysłania operacji.
Testy obejmują zamknięcie obu dozwolonych statusów, przejście do archiwum,
brak przycisku dla Closed oraz odpowiedzi 404/409/500 i błąd sieci.
Podłączone są również POST /api/tickets/{id}/reopen (przycisk tylko dla Closed)
oraz POST /api/tickets/{id}/priority z JSON {priority: liczba}. Priorytet 1–5
można zmieniać w każdym statusie. Po zapisie panel ponownie pobiera dane,
uwzględniając sortowanie API i aktualne filtry. Ponownie otwarte znika z archiwum
i jest dostępne w kolejce. Testy logiki obejmują powrót do kolejki, 400/404/409,
walidację, zachowanie starego priorytetu przy odmowie, sortowanie i zmianę w Closed.
Pełny przepływ nowych operacji pozostaje do ręcznego potwierdzenia w przeglądarce.
Kolejka to Open + InProgress; filtry Oczekujące i W trakcie rozróżniają te statusy.
Puste dane, błąd połączenia i brak wyników filtra są osobnymi stanami.

1. Uruchom Docker i kontener SQL. W repozytorium TSM uruchom (lub zrestartuj po
   zmianie CORS) API: `dotnet run --project src/SupportTicketManager.Api --launch-profile https`.
   Certyfikat localhost musi być zaufany; nie wyłączaj walidacji HTTPS.
2. W repozytorium portfolio wykonaj `node tsm-demo/serve-local.mjs` (wymagany Node.js).
3. Otwórz `http://127.0.0.1:5500/tsm-demo/local.html`.
4. Zakończ serwer strony przez Ctrl+C. API ma osobny terminal.

Serwer strony udostępnia wyłącznie jawnie wskazane pliki UI i słucha na loopback.
API Development dopuszcza CORS GET i POST z Content-Type dla localhost/127.0.0.1 na porcie 5500.
Publiczna domena, inne porty i file:// nie są dozwolonym źródłem lokalnego panelu.
CORS nie zastępuje uwierzytelniania. Nie publikować backendu w tej konfiguracji.
Panel nie zawiera connection stringa ani hasła SQL, nie przełącza się automatycznie
na przykładowe dane przy błędzie i nie usuwa danych podczas odświeżenia.
Implementację integracji przygotował asystent na prośbę autora.

Kontrola 13.09: `node --check tsm-demo/local.js` i `node tsm-demo/local.test.mjs`
przeszły. Test logiki z zastępczym DOM sprawdza filtrowanie, szczegóły, archiwum,
kodowanie tekstu, błąd/ponowienie, pusty wynik i blokadę publicznego origin,
a także walidację formularza, błędy POST, zachowanie danych, blokadę podwójnego
wysłania i odświeżenie po utworzeniu zgłoszenia.
Nie jest to test prawdziwej przeglądarki. Lokalny serwer zwraca 200; podgląd
odczyt autor potwierdził wcześniej. Nowy formularz wymaga jeszcze ręcznego
sprawdzenia w przeglądarce po restarcie API (zmiana CORS).

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
