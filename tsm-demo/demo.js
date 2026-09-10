"use strict";
// Independent UI simulation: no API, authentication, database or persistence.
const seed = [
 {id:40,title:"Problem z logowaniem",description:"Po zmianie hasła nie mogę zalogować się do systemu.",priority:5,status:"InProgress",author:"Szymon"},
 {id:39,title:"Brak dostępu do systemu",description:"Po uruchomieniu panelu pojawia się informacja o braku dostępu.",priority:4,status:"Open",author:"Marta"},
 {id:38,title:"Nie działa drukarka",description:"Dokumenty pozostają w kolejce drukowania. Drukarka jest włączona.",priority:3,status:"Open",author:"Szymon"},
 {id:37,title:"Błąd podczas eksportu",description:"Eksport raportu zatrzymuje się przed pobraniem pliku.",priority:3,status:"InProgress",author:"Piotr"},
 {id:36,title:"Zmiana danych konta",description:"Prośba o pomoc w zmianie nazwy wyświetlanej w panelu.",priority:2,status:"Closed",author:"Szymon"},
 {id:29,title:"Dostęp do drukarki",description:"Prośba o konfigurację drukarki w pokoju spotkań.",priority:1,status:"Closed",author:"Szymon"}
];
let tickets = seed.map(t => ({...t}));
let role = "user", page = "dashboard", selectedId = null, noticeTimer;
const statuses = {Open:"Otwarte",InProgress:"W trakcie",Closed:"Zamknięte"};
const priorities = {1:"Niski",2:"Normalny",3:"Wysoki",4:"Pilny",5:"Krytyczny"};
const el = id => document.getElementById(id);
const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);
function notify(message) {clearTimeout(noticeTimer);el("notice").textContent=message;noticeTimer=setTimeout(()=>{el("notice").textContent="";},5000);}
function resetFilters(){el("search").value="";el("status-filter").value="all";el("priority-filter").value="all";}
function visibleTickets(){
 let result=tickets.filter(t=>role==="support"||t.author==="Szymon");
 if(page==="active")result=result.filter(t=>t.status!=="Closed");
 if(page==="archive")result=result.filter(t=>t.status==="Closed");
 const search=el("search").value.trim().toLocaleLowerCase("pl").replace(/^#/,"");
 const status=el("status-filter").value, priority=el("priority-filter").value;
 result=result.filter(t=>(!search||String(t.id).includes(search)||t.title.toLocaleLowerCase("pl").includes(search))&&(status==="all"||t.status===status)&&(priority==="all"||t.priority===Number(priority)));
 result.sort(page==="dashboard"?(a,b)=>b.id-a.id:(a,b)=>b.priority-a.priority||b.id-a.id);
 return page==="dashboard"?result.slice(0,3):result;
}
function render(){
 const support=role==="support", dashboard=page==="dashboard";
 const nav=support?[["active","☷","Aktywne zgłoszenia"],["archive","▤","Archiwum"]]:[["dashboard","⌂","Pulpit"],["mine","▤","Moje zgłoszenia"]];
 el("navigation").innerHTML=nav.map(([key,icon,title])=>`<button type="button" data-page="${key}" ${page===key?'aria-current="page"':""}><span aria-hidden="true">${icon}</span>${title}</button>`).join("");
 el("heading").textContent=dashboard?"Cześć, Szymon!":page==="mine"?"Moje zgłoszenia":page==="archive"?"Archiwum zgłoszeń":"Aktywne zgłoszenia";
 el("breadcrumb").textContent=nav.find(item=>item[0]===page)[2];
 el("subtitle").textContent=dashboard?"W czym możemy Ci pomóc?":support?"Zarządzaj kolejką i postępem obsługi.":"Sprawdź postęp obsługi swoich zgłoszeń.";
 el("person").textContent=support?"Anna · Wsparcie":"Szymon";
 el("person-role").textContent=support?"Przykładowy pracownik":"Przykładowy użytkownik";
 el("avatar").textContent=support?"AK":"SM";
 el("welcome").hidden=!dashboard;el("new-ticket").hidden=dashboard;el("filters").hidden=dashboard;el("stats").hidden=!support;
 const active=tickets.filter(t=>t.status!=="Closed");
 const stats=[["▤","Aktywne",active.length],["↻","W trakcie",active.filter(t=>t.status==="InProgress").length],["!","Pilne aktywne",active.filter(t=>t.priority>=4).length]];
 el("stats").innerHTML=stats.map(([icon,name,count])=>`<div class="stat"><span class="stat-icon" aria-hidden="true">${icon}</span><div><small>${name}</small><strong>${count}</strong></div></div>`).join("");
 const visible=visibleTickets();
 el("list-heading").textContent=dashboard?"Twoje ostatnie zgłoszenia":page==="archive"?"Zamknięte zgłoszenia":"Lista zgłoszeń";
 el("result-count").textContent=`Liczba: ${visible.length}`;
 if(!visible.some(t=>t.id===selectedId))selectedId=support?(visible[0]?.id??null):null;
 el("tickets").innerHTML=visible.map(t=>`<tr class="${selectedId===t.id?"selected":""}"><td>#${t.id}</td><td><button class="ticket-link" type="button" data-ticket="${t.id}" aria-label="Szczegóły zgłoszenia ${t.id}: ${escapeHtml(t.title)}" aria-pressed="${selectedId===t.id}">${escapeHtml(t.title)}</button></td><td><span class="badge status-${t.status}">${statuses[t.status]}</span></td><td><span class="badge p-${t.priority}">${t.priority} ${priorities[t.priority]}</span></td></tr>`).join("");
 el("empty").hidden=visible.length>0;renderDetails();
}
function renderDetails(){
 const t=tickets.find(t=>t.id===selectedId);
 el("details").hidden=!t;el("queue-layout").classList.toggle("has-details",Boolean(t));
 if(!t){el("details").replaceChildren();return;}
 const support=role==="support";
 el("details").innerHTML=`<div class="section-heading" style="padding:0"><span class="detail-label">ZGŁOSZENIE #${t.id}</span><button class="text-button" type="button" data-action="hide">Ukryj</button></div><h2>${escapeHtml(t.title)}</h2><p>Zgłaszający: <strong>${escapeHtml(t.author)}</strong> <span class="muted">(demo)</span></p><span class="badge status-${t.status}">${statuses[t.status]}</span><p class="detail-label">OPIS PROBLEMU</p><p class="description">${escapeHtml(t.description)}</p>${support?`<label>Priorytet<select id="detail-priority">${Object.entries(priorities).map(([value,text])=>`<option value="${value}" ${Number(value)===t.priority?"selected":""}>${value} — ${text}</option>`).join("")}</select></label><button class="text-button" type="button" data-action="priority">Zapisz priorytet</button>`:`<p>Priorytet: <strong>${t.priority} — ${priorities[t.priority]}</strong></p>`}<div class="detail-actions">${support&&t.status==="Open"?'<button class="primary" type="button" data-action="start">Rozpocznij obsługę</button>':""}${t.status!=="Closed"?'<button class="secondary" type="button" data-action="close">Zamknij zgłoszenie</button>':'<button class="primary" type="button" data-action="reopen">Otwórz ponownie</button>'}</div><p class="muted">Operacje są symulowane w tej przeglądarce. Brak logowania i przypisywania pracowników.</p>`;
}
el("navigation").addEventListener("click",event=>{const b=event.target.closest("[data-page]");if(!b)return;page=b.dataset.page;selectedId=null;resetFilters();render();el("content").focus({preventScroll:true});});
el("role").addEventListener("change",event=>{role=event.target.value;page=role==="support"?"active":"dashboard";selectedId=null;resetFilters();render();});
el("tickets").addEventListener("click",event=>{const b=event.target.closest("[data-ticket]");if(!b)return;selectedId=Number(b.dataset.ticket);render();el("tickets").querySelector(`[data-ticket="${selectedId}"]`)?.focus({preventScroll:true});});
for(const id of ["search","status-filter","priority-filter"])el(id).addEventListener("input",render);
el("details").addEventListener("click",event=>{
 const action=event.target.closest("[data-action]")?.dataset.action,t=tickets.find(t=>t.id===selectedId);if(!action||!t)return;
 if(action==="hide"){selectedId=null;renderDetails();for(const row of el("tickets").rows)row.classList.remove("selected");for(const b of el("tickets").querySelectorAll("button"))b.setAttribute("aria-pressed","false");el("tickets").querySelector("button")?.focus();return;}
 let message;
 if(action==="priority"&&role==="support"){const priority=Number(el("detail-priority").value);if(!Number.isInteger(priority)||priority<1||priority>5)return;t.priority=priority;message=`Zapisano priorytet zgłoszenia #${t.id}.`;}
 else if(action==="start"&&role==="support"&&t.status==="Open"){t.status="InProgress";message=`Rozpoczęto obsługę zgłoszenia #${t.id}.`;}
 else if(action==="close"&&t.status!=="Closed"){t.status="Closed";message=`Zgłoszenie #${t.id} trafiło do archiwum.`;}
 else if(action==="reopen"&&t.status==="Closed"){t.status="Open";message=`Zgłoszenie #${t.id} wróciło do aktywnej kolejki.`;}
 if(message){render();notify(message);el("content").focus({preventScroll:true});}
});
function openForm(){el("create-form").reset();el("form-error").textContent="";el("create-dialog").showModal();}
el("new-ticket").addEventListener("click",openForm);el("welcome-create").addEventListener("click",openForm);
el("cancel").addEventListener("click",()=>el("create-dialog").close());
el("create-form").addEventListener("submit",event=>{
 event.preventDefault();const data=new FormData(event.currentTarget);
 const title=String(data.get("title")??"").trim(),description=String(data.get("description")??"").trim(),priority=Number(data.get("priority"));
 if(!title||!description||title.length>120||description.length>2000||!Number.isInteger(priority)||priority<1||priority>5){el("form-error").textContent="Podaj tytuł, opis i priorytet od 1 do 5. Same spacje nie wystarczą.";return;}
 const ticket={id:Math.max(0,...tickets.map(t=>t.id))+1,title,description,priority,status:"Open",author:role==="support"?"Anna":"Szymon"};
 tickets.push(ticket);selectedId=ticket.id;page=role==="support"?"active":"mine";resetFilters();el("create-dialog").close();render();el("content").focus({preventScroll:true});notify(`Utworzono zgłoszenie #${ticket.id} — tylko w demo.`);
});
el("reset").addEventListener("click",()=>{if(!window.confirm("Przywrócić przykładowe dane? Zmiany i zgłoszenia utworzone w demo zostaną usunięte."))return;tickets=seed.map(t=>({...t}));selectedId=null;resetFilters();render();notify("Przywrócono przykładowe dane.");});
render();
