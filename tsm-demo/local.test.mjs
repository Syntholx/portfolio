import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

// Small unit harness; not a browser or visual-layout test.
const source = await readFile(new URL('local.js', import.meta.url), 'utf8');
const elements = new Map();
function element(id) {
  if (!elements.has(id)) elements.set(id, {
    value: ['status-filter', 'priority-filter'].includes(id) ? 'all' : '',
    hidden: false, disabled: false, innerHTML: '', textContent: '',
    addEventListener() {}, setAttribute() {}, removeAttribute() {},
    focus() {}, showModal() { this.open = true; }, close() { this.open = false; },
    reset() { element('create-title').value = ''; element('create-description').value = ''; },
    replaceChildren() { this.innerHTML = ''; },
    insertAdjacentHTML(position, html) { this.innerHTML += html; },
    querySelectorAll() { return []; }, querySelector() { return null; },
    classList: { add() {}, remove() {} }
  });
  return elements.get(id);
}
const open = { id: 7, title: '<script>alert(1)</script>', description: 'Opis', priority: 2, status: 'Open' };
const progress = { id: 8, title: 'W trakcie', description: 'Opis', priority: 4, status: 'InProgress' };
const closed = { id: 9, title: 'Zamknięte', description: 'Opis', priority: 5, status: 'Closed' };
let fail = false, empty = false, missing = false;
let postMode = 'success', created = null, releasePost;
let startStatus = 200, releaseStart, deferStart = false;
let closeStatus = 200, releaseClose, deferClose = false;
let operationStatus = 200, deferOperation = false, releaseOperation;
const calls = [];
const context = vm.createContext({
  document: { getElementById: element }, location: { origin: 'http://127.0.0.1:5500' },
  AbortSignal, console,
  fetch: async (url, options) => {
    calls.push({ url, options });
    if (fail) throw new Error('offline');
    if (url.endsWith('/reopen') || url.endsWith('/priority')) {
      if (deferOperation) await new Promise(resolve => { releaseOperation = resolve; });
      if (operationStatus === 200) {
        if (url.endsWith('/reopen')) open.status = 'Open';
        else open.priority = JSON.parse(options.body).priority;
      }
      return {status: operationStatus, json: async () => ({message: 'Odmowa operacji'})};
    }
    if (url.endsWith('/close')) {
      if (deferClose) await new Promise(resolve => { releaseClose = resolve; });
      if (closeStatus === 200) open.status = 'Closed';
      return {status: closeStatus, json: async () => ({message: 'Odmowa zamknięcia'})};
    }
    if (url.endsWith('/start')) {
      if (deferStart) await new Promise(resolve => { releaseStart = resolve; });
      if (startStatus === 200) open.status = 'InProgress';
      return {status: startStatus, json: async () => startStatus === 200 ? open : {message: 'Odmowa <b>test</b>'}};
    }
    if (options.method === 'POST') {
      if (postMode === 'deferred') await new Promise(resolve => { releasePost = resolve; });
      if (postMode === 'invalid') return { status: 400, json: async () => ({message: 'Nieprawidłowy tytuł <b>test</b>'}) };
      created = { id: 10, ...JSON.parse(options.body), priority: 2, status: 'Open' };
      return { status: 201, json: async () => created };
    }
    const data = url.endsWith('/archived') ? (empty ? [] : [closed, ...(open.status === 'Closed' ? [open] : [])])
      : url.endsWith('/7') ? open : (empty ? [] : [progress, ...(created ? [created] : []), open].filter(ticket => ticket.status !== 'Closed').sort((a, b) => b.priority - a.priority));
    return { ok: !missing, status: missing ? 404 : 200, json: async () => data };
  }
});
vm.runInContext(source, context);
await new Promise(resolve => setImmediate(resolve));
assert.equal(element('result-count').textContent, 'Liczba: 2');
assert.ok(element('tickets').innerHTML.includes('&lt;script&gt;'));
assert.ok(!element('tickets').innerHTML.includes('<script>'));
assert.ok(element('tickets').innerHTML.indexOf('#8') < element('tickets').innerHTML.indexOf('#7'));
element('status-filter').value = 'Open';
vm.runInContext('render()', context);
assert.equal(element('result-count').textContent, 'Liczba: 1');
element('status-filter').value = 'all';
await vm.runInContext('showDetails(7)', context);
assert.ok(calls.some(call => call.url.endsWith('/tickets/7')));
assert.ok(element('details').innerHTML.includes('&lt;script&gt;'));
vm.runInContext('page = "archive"; render()', context);
assert.equal(element('result-count').textContent, 'Liczba: 1');
assert.ok(element('tickets').innerHTML.includes('#9'));
fail = true;
await vm.runInContext('reload()', context);
assert.equal(element('connection-error').hidden, false);
assert.ok(element('connection-state').textContent.includes('nieaktualne'));
assert.equal(element('refresh').disabled, false);
fail = false; empty = true;
await vm.runInContext('reload()', context);
assert.equal(element('connection-error').hidden, true);
assert.equal(element('empty').textContent, 'Archiwum jest puste.');
empty = false; missing = true;
await assert.rejects(vm.runInContext('requestJson("/api/tickets/99")', context), /Nie znaleziono/);
missing = false;
assert.ok(calls.every(call => call.options.method === 'GET'));
const submit = () => vm.runInContext('submitTicket({preventDefault() {}})', context);
element('create-title').value = '   ';
element('create-description').value = 'Opis';
let before = calls.length;
await submit();
assert.equal(calls.length, before);
element('create-title').value = 'Nowe zgłoszenie';
postMode = 'invalid';
await submit();
assert.equal(element('create-title').value, 'Nowe zgłoszenie');
assert.equal(element('form-error').textContent, 'Nieprawidłowy tytuł <b>test</b>');
assert.equal(element('form-error').innerHTML, '');
assert.equal(element('submit-create').disabled, false);
fail = true;
await submit();
assert.ok(element('form-error').textContent.includes('mogło zostać zapisane'));
assert.equal(element('create-title').value, 'Nowe zgłoszenie');
fail = false;
postMode = 'deferred';
before = calls.length;
const pending = submit();
assert.equal(element('submit-create').disabled, true);
assert.equal(element('create-fields').disabled, true);
await submit();
assert.equal(calls.length, before + 1);
releasePost();
await pending;
assert.equal(element('create-success').hidden, false);
assert.ok(element('create-success').textContent.includes('#10'));
assert.equal(element('create-title').value, '');
assert.equal(element('create-dialog').open, false);
assert.ok(element('tickets').innerHTML.includes('#10'));
assert.equal(element('submit-create').disabled, false);
const posted = calls.find(call => call.options.method === 'POST');
assert.equal(posted.options.headers['Content-Type'], 'application/json');
assert.deepEqual(JSON.parse(posted.options.body), {title: 'Nowe zgłoszenie', description: 'Opis'});
assert.equal(created.priority, 2);
assert.ok(!elements.has('create-priority'), 'Formularz nie powinien odczytywać pola priorytetu.');
await vm.runInContext('showDetails(7)', context);
assert.ok(element('details').innerHTML.includes('id="start-ticket"'));
for (const code of [404, 409, 500]) {
  startStatus = code;
  await vm.runInContext('startTicket(7)', context);
  assert.ok(element('operation-message').textContent.includes(String(code)));
  assert.equal(open.status, 'Open');
  assert.equal(element('start-ticket').disabled, false);
}
fail = true;
await vm.runInContext('startTicket(7)', context);
assert.ok(element('operation-message').textContent.includes('mógł zostać zapisany'));
assert.equal(open.status, 'Open');
fail = false; startStatus = 200; deferStart = true;
before = calls.length;
const startPending = vm.runInContext('startTicket(7)', context);
await vm.runInContext('startTicket(7)', context);
assert.equal(calls.length, before + 1);
assert.equal(element('start-ticket').disabled, true);
releaseStart();
await startPending;
assert.equal(open.status, 'InProgress');
assert.ok(element('details').innerHTML.includes('status-InProgress'));
assert.ok(!element('details').innerHTML.includes('id="start-ticket"'));
assert.ok(element('operation-message').textContent.includes('Rozpoczęto'));
assert.ok(calls.slice(before).some(call => call.options.method === 'GET' && call.url.endsWith('/7')));
assert.ok(element('details').innerHTML.includes('id="close-ticket"'));
for (const code of [404, 409, 500]) {
  closeStatus = code;
  await vm.runInContext('closeTicket(7)', context);
  assert.ok(element('operation-message').textContent.includes(String(code)));
  assert.equal(open.status, 'InProgress');
}
fail = true;
await vm.runInContext('closeTicket(7)', context);
assert.equal(open.status, 'InProgress');
assert.ok(element('operation-message').textContent.includes('mógł zostać zapisany'));
fail = false; closeStatus = 200; deferClose = true;
before = calls.length;
const closePending = vm.runInContext('closeTicket(7)', context);
await vm.runInContext('closeTicket(7)', context);
await vm.runInContext('startTicket(7)', context);
assert.equal(calls.length, before + 1);
releaseClose();
await closePending;
assert.equal(open.status, 'Closed');
assert.ok(!element('tickets').innerHTML.includes('#7'));
assert.equal(element('details').hidden, true);
vm.runInContext('page = "archive"; render()', context);
assert.ok(element('tickets').innerHTML.includes('#7'));
await vm.runInContext('showDetails(7)', context);
assert.ok(!element('details').innerHTML.includes('id="close-ticket"'));
// Closing directly from Open is also allowed by the backend rule.
open.status = 'Open'; deferClose = false;
await vm.runInContext('reload();', context);
vm.runInContext('page = "queue"; render()', context);
await vm.runInContext('showDetails(7)', context);
assert.ok(element('details').innerHTML.includes('id="close-ticket"'));
await vm.runInContext('closeTicket(7)', context);
assert.equal(open.status, 'Closed');
vm.runInContext('page = "archive"; render()', context);
await vm.runInContext('showDetails(7)', context);
assert.ok(element('details').innerHTML.includes('id="reopen-ticket"'));
for (const code of [404, 409, 500]) {
  operationStatus = code;
  await vm.runInContext('reopenTicket(7)', context);
  assert.equal(open.status, 'Closed');
  assert.ok(element('operation-message').textContent.includes(String(code)));
}
operationStatus = 200; deferOperation = true;
before = calls.length;
const reopening = vm.runInContext('reopenTicket(7)', context);
await vm.runInContext('reopenTicket(7)', context);
assert.equal(calls.length, before + 1);
releaseOperation(); await reopening;
deferOperation = false;
assert.equal(open.status, 'Open');
assert.ok(!element('tickets').innerHTML.includes('#7'));
vm.runInContext('page = "queue"; render()', context);
await vm.runInContext('showDetails(7)', context);
assert.ok(!element('details').innerHTML.includes('id="reopen-ticket"'));
assert.ok(element('tickets').innerHTML.includes('#7'));
element('ticket-priority').value = '8';
before = calls.length;
await vm.runInContext('changePriority(7)', context);
assert.equal(calls.length, before);
element('ticket-priority').value = '5';
for (const code of [400, 404, 500]) {
  operationStatus = code;
  await vm.runInContext('changePriority(7)', context);
  assert.equal(open.priority, 2);
  assert.equal(element('ticket-priority').value, '5');
  assert.ok(element('operation-message').textContent.includes(String(code)));
}
operationStatus = 200;
await vm.runInContext('changePriority(7)', context);
assert.equal(open.priority, 5);
assert.equal(open.status, 'Open');
assert.ok(element('tickets').innerHTML.indexOf('#7') < element('tickets').innerHTML.indexOf('#8'));
const priorityCall = calls.find(call => call.url.endsWith('/priority'));
assert.deepEqual(JSON.parse(priorityCall.options.body), {priority: 5});
assert.equal(priorityCall.options.headers['Content-Type'], 'application/json');
await vm.runInContext('closeTicket(7)', context);
vm.runInContext('page = "archive"; render()', context);
await vm.runInContext('showDetails(7)', context);
element('ticket-priority').value = '1';
await vm.runInContext('changePriority(7)', context);
assert.equal(open.priority, 1);
assert.equal(open.status, 'Closed');
const count = calls.length;
vm.runInContext('location.origin = "https://public.example"', context);
// Origin is fixed at startup; create another runtime to verify public-host gate.
const publicContext = vm.createContext({ document: { getElementById: element },
  location: { origin: 'https://public.example' }, AbortSignal,
  fetch: () => { throw new Error('Public page must never fetch localhost'); } });
vm.runInContext(source, publicContext);
await new Promise(resolve => setImmediate(resolve));
assert.ok(element('connection-error').textContent.includes('tylko pod'));
assert.equal(calls.length, count);
assert.ok(calls.every(call => call.options.credentials === 'omit'));
console.log('PASS: reads, create/start/close/reopen/priority; validation, errors, duplicate guard, queue/archive refresh, sorting and priority in Closed.');
