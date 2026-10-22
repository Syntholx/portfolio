// AI-assisted smoke checks of source, data and build files, not browser interactions.
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';
import { stripTypeScriptTypes } from 'node:module';

const read = (path) => readFileSync(new URL(path, import.meta.url), 'utf8');
const exists = (path) => existsSync(new URL(path, import.meta.url));
const outputText = stripTypeScriptTypes(read('./src/i118n/translations.ts'));
const { translations } = await import(
  `data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
);

test('PL, NL and EN have matching keys and non-empty nested text', () => {
  assert.deepEqual(Object.keys(translations).sort(), ['en', 'nl', 'pl']);
  const keys = Object.keys(translations.pl).sort();
  function check(value, path) {
    if (typeof value === 'string') assert.ok(value.trim().length > 0, path);
    else {
      assert.ok(value && typeof value === 'object', path);
      assert.ok(Object.keys(value).length > 0, path);
      for (const [key, child] of Object.entries(value)) check(child, `${path}.${key}`);
    }
  }
  for (const [language, texts] of Object.entries(translations)) {
    assert.deepEqual(Object.keys(texts).sort(), keys, language);
    check(texts, language);
  }
});

test('gallery links three existing PNGs with translated descriptions', () => {
  const source = read('./src/pages/TsmProjectPage.tsx');
  const figures = [...source.matchAll(/<figure\b[^>]*>([\s\S]*?)<\/figure>/g)];
  assert.equal(figures.length, 3);
  const expected = [['list', 'List'], ['details', 'Details'], ['archive', 'Archive']];
  for (const [index, [filename, key]] of expected.entries()) {
    const figure = figures[index][1];
    const path = `/images/tsm/tsm-ticket-${filename}.png`;
    assert.ok(figure.includes(`href="${path}"`));
    assert.ok(figure.includes(`src="${path}"`));
    assert.ok(figure.includes(`alt={texts.gallery${key}Alt}`));
    assert.ok(figure.includes(`{texts.gallery${key}Caption}`));
    assert.match(figure, /target="_blank"/);
    assert.match(figure, /rel="noopener noreferrer"/);
    const original = readFileSync(new URL(`./public${path}`, import.meta.url));
    assert.equal(original.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    assert.deepEqual(readFileSync(new URL(`./dist${path}`, import.meta.url)), original);
  }
  assert.ok(source.includes('{texts.galleryTitle}'));
  assert.ok(source.includes('{texts.galleryNote}'));
});

test('React declares home, about, project and fallback routes', () => {
  const source = read('./src/App.tsx');
  for (const route of ['/', '/o-mnie', '/projekty/tsm/', '*']) {
    assert.ok(source.includes(`path="${route}"`), route);
  }
  assert.ok(read('./src/components/ProjectCard.tsx').includes('href="/projekty/tsm/"'));
});

test('retired demo redirects are retained and copied into dist', () => {
  const redirects = read('./public/_redirects');
  const rules = redirects.split(/\r?\n/).map((line) => line.trim()).filter((line) => line && !line.startsWith('#'));
  assert.deepEqual(rules.sort(), [
    '/tsm-demo /#projekty 302', '/tsm-demo/* /#projekty 302',
    '/tsm /#projekty 302', '/tsm/* /#projekty 302',
  ].sort());
  assert.equal(read('./dist/_redirects'), redirects);
});

test('build contains bundled assets and allows Cloudflare default SPA fallback', () => {
  const html = read('./dist/index.html');
  assert.match(html, /id="root"/);
  assert.ok(!html.includes('src/main.tsx'));
  const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"\s]+)"/g)];
  assert.ok(assets.length >= 2, 'Expected JavaScript and CSS assets');
  for (const [, asset] of assets) assert.ok(exists(`./dist${asset}`), asset);
  assert.ok(!exists('./dist/404.html'), 'A root 404.html disables default SPA routing');
  for (const historicalFile of ['script.js', 'styles.css', 'tsm-demo/index.html']) {
    assert.ok(!exists(`./dist/${historicalFile}`), historicalFile);
  }
});

test('historical TSM interfaces remain in the repository', () => {
  for (const file of ['index.html', 'demo.js', 'demo.css', 'local.html', 'local.js', 'local.css', 'serve-local.mjs', 'local.test.mjs']) {
    assert.ok(exists(`./tsm-demo/${file}`), file);
  }
});

test('both project views link to the live HTTPS demo in a separate tab', () => {
  for (const path of ['./src/components/ProjectCard.tsx', './src/pages/TsmProjectPage.tsx']) {
    const source = read(path);
    const links = [...source.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].map((match) => match[0]);
    const demo = links.find((link) => link.includes('href="https://tsm.szymon-michalek.dev"'));
    assert.ok(demo, path);
    assert.match(demo, /target="_blank"/);
    assert.match(demo, /rel="noopener noreferrer"/);
    assert.ok(demo.includes('{texts.demoLink}'));
  }
  for (const texts of Object.values(translations)) assert.ok(texts.demoLink.trim());
});
