// AI-assisted regression check for the published portfolio text and demo retirement.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const script = readFileSync(new URL('./script.js', import.meta.url), 'utf8');
const translations = vm.runInNewContext(
  script.split('const supportedLanguages')[0] + '; translations',
);
for (const [, key] of html.matchAll(/data-i18n="([^"]+)"/g)) {
  for (const language of ['pl', 'nl', 'en']) {
    assert.equal(typeof translations[language][key], 'string', `${language}: ${key}`);
    assert.ok(translations[language][key].length > 0);
  }
}
assert.ok(!html.includes('tsm-demo'));
assert.ok(!/orderflow/i.test(html + script));
assert.ok(html.includes('<h3>Support Ticket Manager</h3>'));
for (const language of ['pl', 'nl', 'en']) {
  assert.match(translations[language].pageTitle, /Frontend/);
  assert.match(translations[language]['skills.description'], /JavaScript/);
}
assert.equal((html.match(/class="project-card"/g) || []).length, 1);
assert.ok(html.includes('class="projects-grid"'));
assert.ok(!html.includes('project-features'));
assert.ok(!html.includes('101 test'));
const css = readFileSync(new URL('./styles.css', import.meta.url), 'utf8');
assert.ok(css.includes('grid-template-columns: minmax(0, 1fr)'));
assert.ok(css.includes('grid-template-columns: 1fr'));
assert.ok(!html.includes('github.com/Syntholx/order-flow'));
assert.ok(html.includes('tree/v1.0.0'));
assert.ok(!script.includes('v0.7.0'));
const redirects = readFileSync(new URL('./_redirects', import.meta.url), 'utf8');
for (const route of ['/tsm-demo', '/tsm-demo/*', '/tsm', '/tsm/*']) {
  assert.ok(redirects.split(/\r?\n/).includes(`${route} /#projekty 302`));
}
assert.ok(readFileSync(new URL('./tsm-demo/index.html', import.meta.url), 'utf8').length > 0);
assert.ok(readFileSync(new URL('./tsm-demo/local.html', import.meta.url), 'utf8').length > 0);
console.log('PASS: PL/NL/EN translations, v1.0.0 link, retired demo routes, preserved UI source.');
