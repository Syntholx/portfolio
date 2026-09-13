"use strict";

// Explicit local-only client. No secrets or automatic demo fallback.
const apiBase = "https://localhost:7280";
const localOrigin = ["http://localhost:5500", "http://127.0.0.1:5500"].includes(location.origin);
const el = id => document.getElementById(id);
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
const statuses = {Open: "Oczekujące", InProgress: "W trakcie", Closed: "Zamknięte"};
const priorities = {1: "Niski", 2: "Normalny", 3: "Wysoki", 4: "Pilny", 5: "Krytyczny"};
let queue = [], archive = [], page = "queue", selectedId = null;
let loaded = false, loading = false, detailRequest = 0;
let submitting = false;
let starting = false;

function validateTicket(ticket) {
  if (!ticket || !Number.isSafeInteger(ticket.id) || ticket.id < 1 ||
      typeof ticket.title !== "string" || typeof ticket.description !== "string" ||
      !Object.hasOwn(statuses, ticket.status) || !Number.isInteger(ticket.priority) ||
      ticket.priority < 1 || ticket.priority > 5) {
    throw new Error("API zwróciło nieprawidłowe dane zgłoszenia.");
  }
  return ticket;
}

async function requestJson(path) {
  if (!localOrigin) throw new Error("Ten panel działa tylko pod http://localhost:5500 lub http://127.0.0.1:5500. Publiczne demo nie łączy się z lokalnym API.");
  let response;
  try {
    response = await fetch(`${apiBase}${path}`, {
      method: "GET", credentials: "omit", cache: "no-store",
      signal: AbortSignal.timeout(10000)
    });
  } catch {
    throw new Error("Nie można połączyć się z API. Sprawdź, czy API i SQL działają, certyfikat HTTPS jest zaufany, a API zostało zrestartowane po konfiguracji CORS.");
  }
  if (!response.ok) {
    // Do not show development exception bodies or connection details to the UI.
    if (response.status === 404) throw new Error("Nie znaleziono zgłoszenia. Odśwież listę.");
    throw new Error(`API zwróciło błąd HTTP ${response.status}. Spróbuj odświeżyć dane.`);
  }
  try { return await response.json(); }
  catch { throw new Error("API nie zwróciło poprawnego JSON."); }
}

function visibleTickets() {
  const query = el("search").value.trim().toLocaleLowerCase("pl").replace(/^#/, "");
  const status = el("status-filter").value, priority = el("priority-filter").value;
  return (page === "queue" ? queue : archive).filter(t =>
    (!query || String(t.id).includes(query) || t.title.toLocaleLowerCase("pl").includes(query)) &&
    (status === "all" || t.status === status) &&
    (priority === "all" || t.priority === Number(priority)));
}

function hideDetails() {
  detailRequest++;
  selectedId = null;
  el("details").hidden = true;
  el("details").replaceChildren();
  el("queue-layout").classList.remove("has-details");
}

function render() {
  const archived = page === "archive";
  el("heading").textContent = archived ? "Archiwum zgłoszeń" : "Kolejka zgłoszeń";
  el("subtitle").textContent = archived ? "Zamknięte zgłoszenia." : "Niezamknięte: oczekujące i w trakcie obsługi.";
  el("list-heading").textContent = archived ? "Zamknięte zgłoszenia" : "Niezamknięte zgłoszenia";
  for (const button of el("navigation").querySelectorAll("[data-page]")) {
    if (button.dataset.page === page) button.setAttribute("aria-current", "page");
    else button.removeAttribute("aria-current");
  }
  const stats = [["Kolejka", queue.length], ["Oczekujące", queue.filter(t => t.status === "Open").length], ["W trakcie", queue.filter(t => t.status === "InProgress").length]];
  el("stats").innerHTML = stats.map(([label, count]) => `<div class="stat"><div><small>${label}</small><strong>${loaded ? count : "—"}</strong></div></div>`).join("");
  const visible = visibleTickets();
  if (selectedId !== null && !visible.some(t => t.id === selectedId)) hideDetails();
  el("tickets").innerHTML = visible.map(t => `<tr class="${t.id === selectedId ? "selected" : ""}"><td>#${t.id}</td><td><button type="button" class="ticket-link" data-ticket="${t.id}" aria-pressed="${t.id === selectedId}">${escapeHtml(t.title)}</button></td><td><span class="badge status-${t.status}">${statuses[t.status]}</span></td><td><span class="badge p-${t.priority}">${t.priority} — ${priorities[t.priority]}</span></td></tr>`).join("");
  el("result-count").textContent = loaded ? `Liczba: ${visible.length}` : "—";
  el("empty").hidden = !loaded || visible.length !== 0;
  el("empty").textContent = (archived ? archive : queue).length === 0
    ? (archived ? "Archiwum jest puste." : "Nie ma niezamkniętych zgłoszeń.")
    : "Brak zgłoszeń pasujących do filtrów.";
}

async function reload() {
  if (loading) return;
  loading = true;
  el("refresh").disabled = true;
  el("new-ticket").disabled = true;
  el("connection-error").hidden = true;
  el("connection-state").textContent = "Pobieranie kolejki i archiwum…";
  el("tickets").setAttribute("aria-busy", "true");
  hideDetails();
  try {
    const [nextQueue, nextArchive] = await Promise.all([
      requestJson("/api/tickets"), requestJson("/api/tickets/archived")
    ]);
    if (!Array.isArray(nextQueue) || !Array.isArray(nextArchive)) throw new Error("API nie zwróciło kolekcji zgłoszeń.");
    nextQueue.forEach(validateTicket);
    nextArchive.forEach(validateTicket);
    if (nextQueue.some(t => t.status === "Closed") || nextArchive.some(t => t.status !== "Closed")) throw new Error("API zwróciło nieprawidłowy podział kolejki i archiwum.");
    queue = nextQueue;
    archive = nextArchive;
    loaded = true;
    el("connection-state").textContent = `Pobrano z API · ${new Date().toLocaleTimeString("pl-PL")} · odśwież, aby zobaczyć późniejsze zmiany.`;
  } catch (error) {
    el("connection-error").textContent = error.message;
    el("connection-error").hidden = false;
    el("connection-state").textContent = loaded ? "Błąd odświeżenia — widoczne dane mogą być nieaktualne." : "Nie pobrano danych. To nie oznacza pustej bazy.";
  } finally {
    loading = false;
    el("refresh").disabled = false;
    el("new-ticket").disabled = !localOrigin;
    el("tickets").setAttribute("aria-busy", "false");
    render();
  }
}

async function showDetails(id) {
  selectedId = id;
  const version = ++detailRequest;
  render();
  el("details").hidden = false;
  el("queue-layout").classList.add("has-details");
  el("details").textContent = `Pobieranie zgłoszenia #${id}…`;
  try {
    const ticket = validateTicket(await requestJson(`/api/tickets/${id}`));
    if (version !== detailRequest) return;
    if (ticket.id !== id) throw new Error("API zwróciło inne zgłoszenie niż wskazane.");
    el("details").innerHTML = `<div class="section-heading"><span class="detail-label">ZGŁOSZENIE #${ticket.id}</span><button type="button" class="text-button" id="hide-details">Ukryj</button></div><h2>${escapeHtml(ticket.title)}</h2><span class="badge status-${ticket.status}">${statuses[ticket.status]}</span><span class="badge p-${ticket.priority}">${ticket.priority} — ${priorities[ticket.priority]}</span><p class="detail-label">OPIS PROBLEMU</p><p class="description">${escapeHtml(ticket.description)}</p><p class="muted">Szczegóły pobrane osobnym żądaniem GET. Brak informacji o autorze — API nie obsługuje jeszcze kont.</p>`;
    el("hide-details").addEventListener("click", () => { hideDetails(); render(); el("tickets").querySelector(`[data-ticket="${id}"]`)?.focus(); });
    if (ticket.status === "Open") {
      el("details").insertAdjacentHTML("beforeend", '<button type="button" class="primary" id="start-ticket">Rozpocznij obsługę</button>');
      el("start-ticket").disabled = starting;
      el("start-ticket").addEventListener("click", () => void startTicket(id));
    }
    if (ticket.status !== "Closed") {
      el("details").insertAdjacentHTML("beforeend", '<button type="button" class="secondary" id="close-ticket">Zamknij zgłoszenie</button>');
      el("close-ticket").disabled = starting;
      el("close-ticket").addEventListener("click", () => void closeTicket(id));
    } else {
      el("details").insertAdjacentHTML("beforeend", '<button type="button" class="primary" id="reopen-ticket">Otwórz ponownie</button>');
      el("reopen-ticket").disabled = starting;
      el("reopen-ticket").addEventListener("click", () => void reopenTicket(id));
    }
    el("details").insertAdjacentHTML("beforeend", `<form id="priority-form"><label>Nowy priorytet<select id="ticket-priority">${Object.entries(priorities).map(([value, name]) => `<option value="${value}" ${Number(value) === ticket.priority ? "selected" : ""}>${value} — ${name}</option>`).join("")}</select></label><button class="secondary" type="submit" id="save-priority">Zapisz priorytet</button></form>`);
    el("save-priority").disabled = starting;
    el("priority-form").addEventListener("submit", event => { event.preventDefault(); void changePriority(id); });
  } catch (error) {
    if (version !== detailRequest) return;
    el("details").textContent = error.message;
  }
}

async function startTicket(id) {
  return changeTicketStatus(id, "start", "start-ticket", "Rozpocznij obsługę", "Rozpoczęto obsługę");
}

async function closeTicket(id) {
  return changeTicketStatus(id, "close", "close-ticket", "Zamknij zgłoszenie", "Zamknięto zgłoszenie");
}

async function reopenTicket(id) {
  return changeTicketStatus(id, "reopen", "reopen-ticket", "Otwórz ponownie", "Otwarto ponownie zgłoszenie");
}

async function changePriority(id) {
  const priority = Number(el("ticket-priority").value);
  if (!Number.isInteger(priority) || priority < 1 || priority > 5) {
    el("operation-message").textContent = "Priorytet musi być od 1 do 5.";
    return;
  }
  return changeTicketStatus(id, "priority", "save-priority", "Zapisz priorytet", "Zapisano priorytet zgłoszenia", { priority });
}

async function changeTicketStatus(id, action, buttonId, label, success, payload) {
  if (!localOrigin || starting || loading || submitting) return;
  starting = true;
  const button = el(buttonId);
  button.disabled = true;
  button.textContent = "Zapisywanie…";
  el("operation-message").textContent = "";
  try {
    let response;
    try {
      response = await fetch(`${apiBase}/api/tickets/${id}/${action}`, {
        method: "POST", credentials: "omit", signal: AbortSignal.timeout(10000),
        ...(payload ? { headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) } : {})
      });
    } catch {
      throw new Error("Nie otrzymano odpowiedzi. Status lub priorytet mógł zostać zapisany — odśwież dane przed ponowieniem.");
    }
    if ([400, 404, 409].includes(response.status)) {
      const fallback = response.status === 404 ? "Nie znaleziono zgłoszenia." : "Nie można wykonać operacji w obecnym stanie zgłoszenia.";
      let body;
      try { body = await response.json(); } catch { /* Use the safe fallback. */ }
      throw new Error(`${typeof body?.message === "string" ? body.message : fallback} (HTTP ${response.status}). Odśwież dane.`);
    }
    if (response.status !== 200) throw new Error(`Nie potwierdzono operacji (HTTP ${response.status}). Odśwież dane przed ponowieniem.`);
    el("operation-message").textContent = `${success} #${id}. Zapis potwierdzony przez API.${action === "close" ? " Zgłoszenie znajdziesz w archiwum." : action === "reopen" ? " Zgłoszenie wróciło do kolejki." : ""}`;
    const reopenDetails = selectedId === id;
    // Read actual state again, rather than changing a local status optimistically.
    await reload();
    starting = false;
    if (reopenDetails && visibleTickets().some(ticket => ticket.id === id)) await showDetails(id);
  } catch (error) {
    el("operation-message").textContent = error.message;
  } finally {
    starting = false;
    button.disabled = false;
    button.textContent = label;
  }
}

el("navigation").addEventListener("click", event => {
  const button = event.target.closest("[data-page]");
  if (!button) return;
  page = button.dataset.page;
  hideDetails();
  el("search").value = "";
  el("priority-filter").value = "all";
  el("status-filter").innerHTML = page === "archive"
    ? '<option value="all">Zamknięte</option>'
    : '<option value="all">Wszystkie niezamknięte</option><option value="Open">Oczekujące</option><option value="InProgress">W trakcie</option>';
  render();
});
for (const id of ["search", "status-filter", "priority-filter"]) el(id).addEventListener("input", render);
el("tickets").addEventListener("click", event => {
  const button = event.target.closest("[data-ticket]");
  if (button) void showDetails(Number(button.dataset.ticket));
});
el("refresh").addEventListener("click", reload);

async function createTicket(data) {
  if (!localOrigin) throw new Error("Tworzenie jest dostępne wyłącznie w lokalnym panelu.");
  let response;
  try {
    response = await fetch(`${apiBase}/api/tickets`, {
      method: "POST", credentials: "omit",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data), signal: AbortSignal.timeout(10000)
    });
  } catch {
    throw new Error("Nie otrzymano odpowiedzi API. Zgłoszenie mogło zostać zapisane — przed ponowieniem zamknij formularz i odśwież kolejkę. Sprawdź też API, certyfikat i CORS.");
  }
  if (response.status === 400) {
    let error;
    try { error = await response.json(); } catch { /* Generic message below. */ }
    throw new Error(typeof error?.message === "string" ? error.message : "API odrzuciło dane formularza (400). Sprawdź tytuł, opis i priorytet.");
  }
  if (response.status !== 201) {
    throw new Error(`Nie potwierdzono utworzenia (HTTP ${response.status}). Dane formularza zachowano. Przed ponowieniem sprawdź kolejkę.`);
  }
  try { return validateTicket(await response.json()); }
  catch { throw new Error("API potwierdziło zapis, ale odpowiedź jest nieczytelna. Nie wysyłaj ponownie — zamknij formularz i odśwież kolejkę."); }
}

el("new-ticket").addEventListener("click", () => {
  if (!localOrigin || submitting || loading || starting) return;
  // Keep an unfinished draft, including after closing an error dialog.
  el("create-dialog").showModal();
});
el("cancel-create").addEventListener("click", () => {
  if (!submitting) el("create-dialog").close();
});
el("create-dialog").addEventListener("cancel", event => {
  if (submitting) event.preventDefault();
});
el("create-form").addEventListener("submit", submitTicket);

async function submitTicket(event) {
  event.preventDefault();
  if (submitting || starting) return;
  const title = el("create-title").value.trim();
  const description = el("create-description").value.trim();
  const priority = Number(el("create-priority").value);
  if (!title || !description || !Number.isInteger(priority) || priority < 1 || priority > 5) {
    el("form-error").textContent = "Podaj tytuł, opis i priorytet od 1 do 5. Same spacje nie wystarczą.";
    return;
  }
  submitting = true;
  el("form-error").textContent = "";
  el("create-success").hidden = true;
  el("submit-create").disabled = true;
  el("submit-create").textContent = "Zapisywanie…";
  el("create-fields").disabled = true;
  el("cancel-create").disabled = true;
  el("create-form").setAttribute("aria-busy", "true");
  try {
    const ticket = await createTicket({ title, description, priority });
    el("create-dialog").close();
    el("create-form").reset();
    el("create-success").textContent = `Utworzono zgłoszenie #${ticket.id}. Zapisano w SQL.`;
    el("create-success").hidden = false;
    page = "queue";
    el("search").value = "";
    el("priority-filter").value = "all";
    el("status-filter").innerHTML = '<option value="all">Wszystkie niezamknięte</option><option value="Open">Oczekujące</option><option value="InProgress">W trakcie</option>';
    el("status-filter").value = "all";
    // A failed refresh is shown separately; the confirmed POST must not be repeated.
    await reload();
    el("new-ticket").focus();
  } catch (error) {
    el("form-error").textContent = error.message;
  } finally {
    submitting = false;
    el("submit-create").disabled = false;
    el("submit-create").textContent = "Utwórz zgłoszenie";
    el("create-fields").disabled = false;
    el("cancel-create").disabled = false;
    el("create-form").setAttribute("aria-busy", "false");
  }
}
render();
void reload();
