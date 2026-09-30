#!/usr/bin/env node
// S1 "site truth" checks (a)–(d), S1.1 fixup checks (e)–(j) and S1.1b checks (k)–(m) against a running
// server (`npm run build && npm run start`). (f), (g), (i), (k) and (l) also read this checkout's content/ and src/.
// Usage: node scripts/verify-site-truth.mjs [baseUrl]      (default http://localhost:3000)
//        TODAY=YYYY-MM-DD overrides the local calendar day used for the lastmod checks.
// Node 22+ built-ins only. Exits 1 when any check fails.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BASE = (process.argv[2] ?? process.env.BASE_URL ?? 'http://localhost:3000').replace(/\/+$/, '');
const TODAY = process.env.TODAY ?? localDay(new Date());
const CHECK_URL = 'https://app.teeli.net/check?source=embed:teeli.net-home';
const TOOL_EMBED = 'https://app.teeli.net/embed/check?source=tools:fix-non-manifold-stl';
const CONTENT_PATHS = ['/glossary/watertight-mesh', '/blog/mesh-repair'];
// "BLEND" hits in src/ that are code identifiers, not copy: { file: 'src/…', pattern: /\bNAME\b/ }
const ALLOWED_BLEND_IDENTIFIERS = [];
// List pages take the lastmod of the newest item they list (src/app/sitemap.ts) → prefix of those items.
const LIST_PAGES = new Map([
  ['https://teeli.net/blog', 'https://teeli.net/blog/'],
  ['https://teeli.net/blog/archive', 'https://teeli.net/blog/'],
  ['https://teeli.net/glossary', 'https://teeli.net/glossary/'],
  ['https://teeli.net/tools', 'https://teeli.net/tools/'],
  ['https://teeli.net/compare', 'https://teeli.net/compare/'],
]);
// Static pages that sit directly under a list prefix: they are not listed items.
const STATIC_UNDER_LISTS = new Set(
  ['popular', 'topics', 'tags', 'resources', 'about', 'archive'].map((page) => `https://teeli.net/blog/${page}`),
);
// A listed item is exactly one path segment below its list prefix and not one of those static pages.
const isListedItem = (url, prefix) => url.startsWith(prefix) && !url.slice(prefix.length).includes('/') && !STATIC_UNDER_LISTS.has(url);
// "in your browser" hits that are true statements about browser storage, not product claims.
const ALLOWED_IN_YOUR_BROWSER = [
  { file: 'src/app/cookies/page.tsx', text: 'Cookies are small files stored in your browser.' },
  { file: 'src/app/cookies/page.tsx', text: "saved in your browser's localStorage" },
];
// "AMS" lines allowed in the tool JSON: Bambu's own Fix model limitation (line 115) and the FAQ
// question + answer prescribed in S1.1b 1(b) (the answer itself says "re-apply the AMS painting"). Whole lines.
const ALLOWED_TOOL_AMS = [
  "\"limitations\": \"⚠️ Windows Only. Feature disabled on macOS and Linux. Voxel remeshing strips multi-color AMS paint.\"",
  "\"question\": \"Can TEELI repair multi-color painted STL files for Bambu AMS?\",",
  "\"answer\": \"An STL file carries no colour or paint data, so a repaired STL loses nothing there: repair it, re-import it into Bambu Studio and re-apply the AMS painting. Painted 3MF projects are not accepted yet (3MF import is on the roadmap).\",",
];

let failures = 0;

function localDay(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function check(ok, label, detail) {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}${detail ? `  (${detail})` : ''}`);
  if (!ok) failures += 1;
}

async function get(path) {
  for (let attempt = 1; ; attempt += 1) {
    try {
      const res = await fetch(`${BASE}${path}`, { redirect: 'manual' });
      return { status: res.status, type: res.headers.get('content-type') ?? '', body: await res.text() };
    } catch (err) {
      if (attempt >= 3) throw err; // transient ECONNRESET happens against production
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
}

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const decodeHtml = (text) =>
  text.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const attr = (tag, name) => {
  const match = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
  return match ? decodeHtml(match[1]) : undefined;
};
// Site-absolute URLs are checked against BASE, so a local build verifies itself.
const toPath = (url) => (url.startsWith('https://teeli.net') ? url.slice('https://teeli.net'.length) || '/' : url);

// grep -rn for a directory or a single file under ROOT
function grepTree(target, needle) {
  const start = join(ROOT, target);
  const files = statSync(start).isFile()
    ? [start]
    : readdirSync(start, { withFileTypes: true, recursive: true })
        .filter((entry) => entry.isFile())
        .map((entry) => join(entry.parentPath ?? entry.path, entry.name));
  const hits = [];
  for (const file of files) {
    readFileSync(file, 'utf8')
      .split('\n')
      .forEach((text, i) => {
        if (text.includes(needle)) hits.push({ file: relative(ROOT, file).replaceAll('\\', '/'), line: i + 1, text: text.trim() });
      });
  }
  return hits;
}

// All JSON-LD nodes on a page (@graph flattened)
const jsonLdNodes = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(([, json]) => {
    try {
      const data = JSON.parse(json);
      return data['@graph'] ?? (Array.isArray(data) ? data : [data]);
    } catch {
      return [];
    }
  });

function findImageObjects(node, found = []) {
  if (Array.isArray(node)) node.forEach((child) => findImageObjects(child, found));
  else if (node && typeof node === 'object') {
    if (node['@type'] === 'ImageObject') found.push(node);
    Object.values(node).forEach((child) => findImageObjects(child, found));
  }
  return found;
}

async function main() {
  console.log(`verify-site-truth  base=${BASE}  today=${TODAY}`);

  // (a) sitemap: at most 3 URLs dated today (list pages that follow a same-day item aside), none in the
  // future, no priority/changefreq
  const sitemap = await get('/sitemap.xml');
  check(sitemap.status === 200, 'GET /sitemap.xml', `HTTP ${sitemap.status}`);
  const urls = [...sitemap.body.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({
    loc: block.match(/<loc>([^<]*)<\/loc>/)?.[1] ?? '?',
    day: block.match(/<lastmod>([^<]*)<\/lastmod>/)?.[1].slice(0, 10),
  }));
  const perDay = new Map();
  for (const { day = '(none)' } of urls) perDay.set(day, (perDay.get(day) ?? 0) + 1);
  const histogram = [...perDay].sort(([a], [b]) => a.localeCompare(b)).map(([day, n]) => `${day} x${n}`);
  console.log(`      ${urls.length} URLs, ${perDay.size} distinct lastmod values: ${histogram.join(', ')}`);

  const dated = urls.filter((u) => u.day);
  const today = dated.filter((u) => u.day === TODAY);
  const future = dated.filter((u) => u.day > TODAY);
  const malformed = dated.filter((u) => !/^\d{4}-\d{2}-\d{2}$/.test(u.day));
  check(urls.length > 0, '(a) sitemap lists URLs', String(urls.length));
  check(malformed.length === 0, '(a) every lastmod is a YYYY-MM-DD date', malformed.map((u) => u.loc).join(', '));
  // S1.1b edited 3 content files on one day, so the limit is 3. List pages are not counted: their lastmod is
  // the newest item they list, so each one dated today must list an item dated today instead.
  const todayLists = today.filter((u) => LIST_PAGES.has(u.loc));
  const todayOthers = today.filter((u) => !LIST_PAGES.has(u.loc));
  const unbacked = todayLists.filter((list) => !todayOthers.some((u) => isListedItem(u.loc, LIST_PAGES.get(list.loc))));
  check(
    todayOthers.length <= 3,
    "(a) at most 3 URLs carry today's lastmod (list pages not counted)",
    `${todayOthers.length}: ${todayOthers.map((u) => u.loc).join(', ') || '-'}`,
  );
  check(
    unbacked.length === 0,
    '(a) every list page dated today lists an item dated today',
    `list pages dated today: ${todayLists.map((u) => u.loc).join(', ') || '-'}${unbacked.length ? `; unbacked: ${unbacked.map((u) => u.loc).join(', ')}` : ''}`,
  );
  check(future.length === 0, '(a) no lastmod in the future', future.map((u) => `${u.loc} ${u.day}`).join(', '));
  check(!/<(priority|changefreq)>/.test(sitemap.body), '(a) no <priority> / <changefreq>');

  // (b) homepage drop-zone: a link to the real check, no .BLEND / .3MF inside it
  const home = await get('/');
  check(home.status === 200, 'GET /', `HTTP ${home.status}`);
  const dropZoneRe = new RegExp(`<a[^>]*href="${escapeRegExp(CHECK_URL)}"[^>]*>([\\s\\S]*?)</a>`);
  const dropZone = home.body.match(dropZoneRe)?.[1];
  check(dropZone !== undefined, `(b) drop-zone is a link to ${CHECK_URL}`);
  check(dropZone !== undefined && !/\.BLEND|\.3MF/i.test(dropZone), '(b) drop-zone markup has no .BLEND / .3MF');
  check(
    dropZone !== undefined && ['.STL', '.GLB', '.OBJ (zip)'].every((ext) => dropZone.includes(`>${ext}<`)),
    '(b) drop-zone lists .STL .GLB .OBJ (zip)',
  );
  const count = (re) => (home.body.match(re) ?? []).length;
  console.log(
    `      info: raw HTML of / contains "BLEND" x${count(/BLEND/g)}, ".3MF" x${count(/\.3MF/gi)}` +
      ' (sections loaded with ssr:false are not in the raw HTML)',
  );

  // (c) Organization JSON-LD carries the brand disambiguation
  const org = jsonLdNodes(home.body).find((node) => node['@type'] === 'Organization');
  check(
    home.body.includes('"alternateName":"TEELI.NET"') && org?.alternateName === 'TEELI.NET',
    '(c) Organization JSON-LD has "alternateName":"TEELI.NET"',
    org ? `sameAs=${JSON.stringify(org.sameAs)}` : 'no Organization node',
  );

  // (d) the two deployed content pages answer 200 and are in the sitemap
  const pages = {};
  for (const path of CONTENT_PATHS) {
    const res = (pages[path] = await get(path));
    check(res.status === 200, `(d) GET ${path}`, `HTTP ${res.status}`);
    check(urls.some((u) => u.loc === `https://teeli.net${path}`), `(d) ${path} is listed in the sitemap`);
  }

  // (e) glossary term title carries the brand once; the ad slot is gone
  const term = pages['/glossary/watertight-mesh'];
  const termTitle = decodeHtml(term.body.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  check(termTitle.split('TEELI.NET').length - 1 === 1, '(e) /glossary/watertight-mesh title has "TEELI.NET" exactly once', termTitle);
  check(!term.body.includes('Reserved for'), '(e) /glossary/watertight-mesh has no "Reserved for" ad slot');

  // (f) mesh-repair post: og:image and hero image resolve
  const postPage = pages['/blog/mesh-repair'];
  const post = JSON.parse(readFileSync(join(ROOT, 'content/blog/mesh-repair/mesh-repair.json'), 'utf8').trimStart());
  const ogImage = attr(postPage.body.match(/<meta[^>]*property="og:image"[^>]*>/)?.[0] ?? '', 'content');
  const og = ogImage ? await get(toPath(ogImage)) : { status: 0, type: '' };
  check(og.status === 200, '(f) mesh-repair og:image returns 200', `${ogImage ?? 'no og:image'} -> HTTP ${og.status} ${og.type}`);
  const heroSrc = [...postPage.body.matchAll(/<img\b[^>]*>/g)]
    .map(([tag]) => attr(tag, 'src') ?? '')
    .find((src) => src === post.image || decodeURIComponent(src).includes(`url=${post.image}&`));
  const hero = heroSrc ? await get(toPath(heroSrc)) : { status: 0, type: '' };
  check(hero.status === 200, '(f) mesh-repair hero image returns 200', `${heroSrc ?? `no <img> for ${post.image}`} -> HTTP ${hero.status} ${hero.type}`);

  // (g) no "BLEND" copy left in src/ (identifier hits must be allow-listed explicitly above)
  const blendHits = grepTree('src', 'BLEND');
  const allowedBlend = blendHits.filter((h) => ALLOWED_BLEND_IDENTIFIERS.some((a) => a.file === h.file && a.pattern.test(h.text)));
  const copyBlend = blendHits.filter((h) => !allowedBlend.includes(h));
  console.log(`      allowed "BLEND" identifier hits: ${allowedBlend.map((h) => `${h.file}:${h.line}`).join(', ') || 'none'}`);
  check(copyBlend.length === 0, '(g) grep "BLEND" src/ has 0 copy hits', copyBlend.map((h) => `${h.file}:${h.line} ${h.text}`).join(' | '));

  // (h) the tool page runs the real embed and none of the old false claims
  const tool = await get('/tools/fix-non-manifold-stl');
  check(tool.status === 200, 'GET /tools/fix-non-manifold-stl', `HTTP ${tool.status}`);
  const iframeSrcs = [...tool.body.matchAll(/<iframe\b[^>]*>/g)].map(([tag]) => attr(tag, 'src') ?? '');
  check(iframeSrcs.some((src) => src.startsWith(TOOL_EMBED)), `(h) tool page has an iframe starting with ${TOOL_EMBED}`, iframeSrcs.join(', ') || 'no iframe');
  const banned = ['.3MF', 'Cloud Ray-Cast', 'AMS multi-color', 'WebAssembly'].filter((text) => tool.body.includes(text));
  check(banned.length === 0, '(h) tool page has none of .3MF / Cloud Ray-Cast / AMS multi-color / WebAssembly', banned.join(', '));

  // (i) no simulated results in the tools components
  const randomHits = grepTree('src/components/tools', 'Math.random');
  check(randomHits.length === 0, '(i) grep "Math.random" src/components/tools has 0 hits', randomHits.map((h) => `${h.file}:${h.line}`).join(', '));

  // (j) every internal href on the three content pages returns 200
  const sources = new Map();
  for (const [page, { body }] of Object.entries({ '/tools/fix-non-manifold-stl': tool, ...pages })) {
    for (const [, raw] of body.matchAll(/\shref="([^"]*)"/g)) {
      const path = toPath(decodeHtml(raw)).split('#')[0];
      if (!path.startsWith('/') || path.startsWith('//')) continue; // external, mailto:, tel:, #fragment
      if (!sources.has(path)) sources.set(path, new Set());
      sources.get(path).add(page);
    }
  }
  const broken = [];
  for (const [path, from] of sources) {
    const { status } = await get(path);
    if (status !== 200) broken.push(`${path} HTTP ${status} (on ${[...from].join(', ')})`);
  }
  check(broken.length === 0, `(j) all ${sources.size} internal hrefs on the 3 pages return 200`, broken.join('; '));

  // (k) the homepage fake scan is gone (source and rendered page)
  const fakeScan = ['isScanning', 'sampleModels', 'Euler'].flatMap((needle) => grepTree('src/components/home', needle));
  check(fakeScan.length === 0, '(k) grep "isScanning|sampleModels|Euler" src/components/home has 0 hits', fakeScan.map((h) => `${h.file}:${h.line}`).join(', '));
  const homeFake = ['Analyzing Euler', '100% Preserved'].filter((text) => home.body.includes(text));
  check(homeFake.length === 0, '(k) / contains neither "Analyzing Euler" nor "100% Preserved"', homeFake.join(', '));
  const panelMissing = ['What the free check reports', 'Every number in your report comes from your file — nothing is simulated.'].filter(
    (text) => !home.body.includes(text),
  );
  check(panelMissing.length === 0, '(k) / renders the static "What the free check reports" panel', panelMissing.join(' | '));

  // (l) no "in your browser" / "100MB" claims; "AMS" in the tool JSON only where allowed
  const browserHits = ['content', 'src'].flatMap((dir) => grepTree(dir, 'in your browser'));
  const browserAllowed = browserHits.filter((h) => ALLOWED_IN_YOUR_BROWSER.some((a) => a.file === h.file && h.text.includes(a.text)));
  const browserClaims = browserHits.filter((h) => !browserAllowed.includes(h));
  console.log(`      allowed "in your browser" hits: ${browserAllowed.map((h) => `${h.file}:${h.line}`).join(', ') || 'none'}`);
  check(browserClaims.length === 0, '(l) grep "in your browser" content/ src/ has 0 claim hits', browserClaims.map((h) => `${h.file}:${h.line}`).join(', '));
  const capHits = ['src', 'content'].flatMap((dir) => grepTree(dir, '100MB'));
  check(capHits.length === 0, '(l) grep "100MB" src/ content/ has 0 hits', capHits.map((h) => `${h.file}:${h.line}`).join(', '));
  const amsHits = grepTree('content/tools/fix-non-manifold-stl.json', 'AMS');
  const amsAllowed = amsHits.filter((h) => ALLOWED_TOOL_AMS.includes(h.text));
  const amsClaims = amsHits.filter((h) => !amsAllowed.includes(h));
  console.log(`      allowed "AMS" lines in the tool JSON: ${amsAllowed.map((h) => `${h.line}`).join(', ') || 'none'}`);
  check(amsClaims.length === 0, '(l) grep "AMS" fix-non-manifold-stl.json has only the allowed lines', amsClaims.map((h) => `${h.line}: ${h.text.slice(0, 80)}`).join(' | '));

  // (m) the post's JSON-LD ImageObjects declare the Content-Type their URL actually returns
  const imageObjects = findImageObjects(jsonLdNodes(postPage.body)).filter((img) => img.encodingFormat);
  const imageChecks = [];
  for (const img of imageObjects) {
    const url = img.contentUrl ?? img.url;
    const { status, type } = await get(toPath(url));
    const served = type.split(';')[0].trim().toLowerCase();
    imageChecks.push({ ok: status === 200 && served === img.encodingFormat, text: `${url} declares ${img.encodingFormat}, serves HTTP ${status} ${served || '-'}` });
  }
  check(
    imageChecks.length > 0 && imageChecks.every((c) => c.ok),
    `(m) /blog/mesh-repair JSON-LD ImageObject encodingFormat = served Content-Type (${imageChecks.length} checked)`,
    imageChecks.map((c) => c.text).join('; ') || 'no ImageObject with encodingFormat',
  );

  console.log(failures ? `\n${failures} check(s) FAILED` : '\nAll checks passed');
  // exitCode, not process.exit(): exiting while fetch sockets close aborts Node on Windows (libuv assert).
  process.exitCode = failures ? 1 : 0;
}

main().catch((err) => {
  console.error(`FAIL  could not reach ${BASE}: ${err.cause?.code ?? err.message}`);
  process.exitCode = 1;
});
