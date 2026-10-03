#!/usr/bin/env node
// S1 "site truth" checks (a)–(d), S1.1 fixup checks (e)–(j), S1.1b checks (k)–(m), S4a checks (n)–(q) and S4b
// checks (r)–(t) against a running server (`npm run build && npm run start`). (f), (g), (i), (k), (l), (n), (p),
// (q), (r) and (s) also read this checkout's content/, src/ and git history.
// Usage: node scripts/verify-site-truth.mjs [baseUrl]      (default http://localhost:3000)
//        TODAY=YYYY-MM-DD overrides the local calendar day used for the lastmod checks.
// Node 22+ built-ins only. Exits 1 when any check fails.

import { execFileSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BASE = (process.argv[2] ?? process.env.BASE_URL ?? 'http://localhost:3000').replace(/\/+$/, '');
const TODAY = process.env.TODAY ?? localDay(new Date());
const CHECK_URL = 'https://app.teeli.net/check?source=embed:teeli.net-home';
const TOOL_EMBED = 'https://app.teeli.net/embed/check?source=tools:fix-non-manifold-stl';
const CONTENT_PATHS = ['/glossary/watertight-mesh', '/blog/mesh-repair'];
const REPAIR_PAGE = '/tools/repair-stl-online';
const REPAIR_EMBED = 'https://app.teeli.net/embed/check?source=tools:repair-stl-online';
// Must not appear in the repair page's visible text or JSON-LD. "AMS" is case-sensitive and whole-word.
const REPAIR_PAGE_BANNED = [/WebAssembly/i, /100MB/i, /in your browser/i, /certified/i, /guaranteed/i, /100%/, /\bAMS\b/, /Cloud Ray/i, /print-ready/i];
const BAMBU_POST = '/blog/bambu-studio-non-manifold-edges-troubleshooting-2026';
const NME_TERM = '/glossary/non-manifold-edges';
const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36';
// Hosts that answer scripts with a bot wall instead of the page: listed as unverifiable, not as broken.
const BOT_WALLS = { 'in.linkedin.com': 999, 'www.linkedin.com': 999 };
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

// Visible text plus JSON-LD; <style> and the RSC payload scripts are not page copy.
const pageText = (html) =>
  decodeHtml(
    html
      .replace(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g, ' $1 ')
      .replace(/<script\b[\s\S]*?<\/script>/g, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/g, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
const mainText = (html) =>
  decodeHtml(
    (html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? '')
      .replace(/<(style|script)\b[\s\S]*?<\/\1>/g, ' ') // inline CSS/JS is not page text
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
const wordCount = (text) => text.split(' ').filter((word) => /[\p{L}\p{N}]/u.test(word)).length;

// Every internal href (site-absolute or root-relative) on the given pages, fetched once each.
async function brokenInternalHrefs(pages) {
  const sources = new Map();
  for (const [page, { body }] of Object.entries(pages)) {
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
  return { total: sources.size, broken };
}

// Status of every external <a href> (any host but teeli.net), fetched like a browser and following redirects.
async function externalStatuses(html) {
  // The #fragment never reaches the server, so each distinct URL is fetched once.
  const urls = [...new Set([...html.matchAll(/<a\b[^>]*\shref="(https?:\/\/[^"]+)"/g)].map(([, raw]) => decodeHtml(raw).split('#')[0]))].filter(
    (url) => !/^https:\/\/teeli\.net(\/|$)/.test(url),
  );
  const results = [];
  for (const url of urls) {
    let status;
    for (let attempt = 1; attempt <= 3 && (status === undefined || status === 429); attempt += 1) {
      if (status === 429) await new Promise((resolve) => setTimeout(resolve, 3000 * attempt)); // rate limit: back off
      try {
        const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': BROWSER_UA }, signal: AbortSignal.timeout(20000) });
        status = res.status;
        await res.body?.cancel();
      } catch (err) {
        if (attempt === 3) status = `ERR ${err.cause?.code ?? err.name}`;
      }
    }
    results.push({ url, status, walled: BOT_WALLS[new URL(url).hostname] === status });
  }
  return results;
}

const git = (args) =>
  execFileSync('git', ['-C', ROOT, ...args], { encoding: 'utf8' })
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

// What changed today: everything since the newest commit made before today's local midnight (committed or not,
// merged or not), so a same-day merge and a post-merge run on main are judged the same way as this branch.
function changedToday() {
  const [base] = git(['log', '-1', '--format=%H', `--before=${TODAY} 00:00`]);
  const files = [...git(['diff', '--name-only', base, '--', 'content/']), ...git(['ls-files', '--others', '--exclude-standard', '--', 'content/'])];
  const urls = new Set();
  for (const file of new Set(files)) {
    const kind = file.match(/^content\/(blog|glossary|tools|compare)\//)?.[1];
    if (!kind || !file.endsWith('.json') || !existsSync(join(ROOT, file))) continue;
    urls.add(`https://teeli.net/${kind}/${JSON.parse(readFileSync(join(ROOT, file), 'utf8').trimStart()).slug}`);
  }
  const sitemapDiff = execFileSync('git', ['-C', ROOT, 'diff', base, '--', 'src/app/sitemap.ts'], { encoding: 'utf8' });
  if (/^\+\s*\{ url: baseUrl, lastModified:/m.test(sitemapDiff)) urls.add('https://teeli.net');
  return { base: base.slice(0, 7), urls };
}

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

  // (a) sitemap: well-formed dates, none in the future, no priority/changefreq (today's dates are judged in (s))
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
  // (s) the non-list URLs dated today are exactly the pages whose content changed today (plus the homepage when its
  // sitemap date changed). List pages take the newest item's date, so each one dated today must list such an item.
  const todayLists = today.filter((u) => LIST_PAGES.has(u.loc));
  const todayOthers = today.filter((u) => !LIST_PAGES.has(u.loc));
  const unbacked = todayLists.filter((list) => !todayOthers.some((u) => isListedItem(u.loc, LIST_PAGES.get(list.loc))));
  const changed = changedToday();
  const datedToday = new Set(todayOthers.map((u) => u.loc));
  const notDated = [...changed.urls].filter((url) => !datedToday.has(url));
  const unchanged = [...datedToday].filter((url) => !changed.urls.has(url));
  console.log(`      changed since ${changed.base} (last commit before ${TODAY}): ${[...changed.urls].join(', ') || 'none'}`);
  check(
    notDated.length === 0 && unchanged.length === 0,
    '(s) URLs dated today = pages changed today (content files + homepage if its sitemap date changed)',
    [notDated.length && `changed but not dated today: ${notDated.join(', ')}`, unchanged.length && `dated today but unchanged: ${unchanged.join(', ')}`]
      .filter(Boolean)
      .join('; ') || `${datedToday.size} URLs`,
  );
  check(
    unbacked.length === 0,
    '(s) every list page dated today lists an item dated today',
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
  const contentLinks = await brokenInternalHrefs({ '/tools/fix-non-manifold-stl': tool, ...pages });
  check(contentLinks.broken.length === 0, `(j) all ${contentLinks.total} internal hrefs on the 3 pages return 200`, contentLinks.broken.join('; '));

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

  // (n) the repair-stl-online tool page: real embed, definition first, honest copy, schema, live links
  const repair = await get(REPAIR_PAGE);
  check(repair.status === 200, `(n) GET ${REPAIR_PAGE}`, `HTTP ${repair.status}`);
  const repairIframes = [...repair.body.matchAll(/<iframe\b[^>]*>/g)].map(([tag]) => attr(tag, 'src') ?? '');
  check(repairIframes.some((src) => src.startsWith(REPAIR_EMBED)), `(n) iframe src starts with ${REPAIR_EMBED}`, repairIframes.join(', ') || 'no iframe');
  const repairJson = JSON.parse(readFileSync(join(ROOT, 'content/tools/repair-stl-online.json'), 'utf8').trimStart());
  const firstSentence = repairJson.answerParagraph.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? repairJson.answerParagraph;
  const main = mainText(repair.body);
  const at = main.indexOf(firstSentence);
  check(
    at >= 0 && at + firstSentence.length <= 800,
    '(n) first sentence of answerParagraph is within the first 800 chars of <main>',
    at >= 0 ? `chars ${at}–${at + firstSentence.length}` : 'not found',
  );
  const mainWords = wordCount(main);
  const faqStart = main.indexOf('Frequently Asked Questions');
  const faqEnd = main.indexOf('Related Tools & Geometry Guides');
  const faqWords = faqStart >= 0 && faqEnd > faqStart ? wordCount(main.slice(faqStart, faqEnd)) : 0;
  console.log(`      <main> words: ${mainWords} (FAQ section ${faqWords}, everything else ${mainWords - faqWords})`);
  check(mainWords >= 800 && mainWords <= 1600, '(n) <main> word count is 800–1,600', String(mainWords));
  check(mainWords - faqWords >= 800 && mainWords - faqWords <= 1200, '(n) body without the FAQ is 800–1,200 words', String(mainWords - faqWords));
  const repairText = pageText(repair.body);
  const bannedFound = REPAIR_PAGE_BANNED.filter((re) => re.test(repairText)).map((re) => re.source);
  check(
    bannedFound.length === 0,
    '(n) page has none of WebAssembly / 100MB / in your browser / certified / guaranteed / 100% / AMS / Cloud Ray / print-ready',
    bannedFound.join(', '),
  );
  const repairTypes = jsonLdNodes(repair.body).map((node) => node['@type']);
  check(['Article', 'BreadcrumbList'].every((type) => repairTypes.includes(type)), '(n) JSON-LD has Article and BreadcrumbList', repairTypes.join(', '));
  const repairTitle = decodeHtml(repair.body.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
  check(repairTitle.split('TEELI.NET').length - 1 === 1, '(n) <title> has "TEELI.NET" exactly once', repairTitle);
  const repairLinks = await brokenInternalHrefs({ [REPAIR_PAGE]: repair });
  check(repairLinks.broken.length === 0, `(n) all ${repairLinks.total} internal hrefs on ${REPAIR_PAGE} return 200`, repairLinks.broken.join('; '));

  // (o) the tools index lists the new page
  const toolsIndex = await get('/tools');
  check(new RegExp(`href="(https://teeli\\.net)?${escapeRegExp(REPAIR_PAGE)}"`).test(toolsIndex.body), `(o) GET /tools lists ${REPAIR_PAGE}`, `HTTP ${toolsIndex.status}`);

  // (p) the non-manifold tool links the new page
  const fixJson = JSON.parse(readFileSync(join(ROOT, 'content/tools/fix-non-manifold-stl.json'), 'utf8').trimStart());
  check(fixJson.relatedPages.some((page) => page.href === REPAIR_PAGE), `(p) fix-non-manifold-stl.json relatedPages contains ${REPAIR_PAGE}`);

  // (q) fold-in honesty fixes
  const inBrowser = ['content', 'src'].flatMap((dir) => grepTree(dir, 'in-browser'));
  check(inBrowser.length === 0, '(q) grep "in-browser" content/ src/ has 0 hits', inBrowser.map((h) => `${h.file}:${h.line}`).join(', '));
  const zipCallouts = grepTree('content', 'OBJ, GLB or a ZIP');
  check(zipCallouts.length === 0, '(q) grep "OBJ, GLB or a ZIP" content/ has 0 hits', zipCallouts.map((h) => `${h.file}:${h.line}`).join(', '));
  check(new RegExp(`href="${escapeRegExp(REPAIR_PAGE)}"`).test(home.body), `(q) / has an href to ${REPAIR_PAGE}`);

  // (r) the two pages that already rank: quotable sentence first, question H2s, tool link, honest copy, live links
  const ranked = [
    {
      path: BAMBU_POST,
      file: 'content/blog/3d-rendering/bambu-studio-non-manifold-edges-troubleshooting-2026.json',
      words: [1300, 1700],
      h2: ['non-manifold edge error', '1 non-manifold edge', 'Fix Model', 'crashes when I click Repair'],
      quote: (json) => json.content.match(/:::ai-answer\s*\n([\s\S]*?)\n:::/)?.[1].trim() ?? '(no ai-answer block)',
    },
    {
      path: NME_TERM,
      file: 'content/glossary/non-manifold-edges.json',
      words: [900, 1100],
      h2: ['Is one non-manifold edge enough'],
      quote: (json) => json.shortDefinition.trim(),
    },
  ];
  const rankedPages = {};
  for (const page of ranked) {
    const res = (rankedPages[page.path] = await get(page.path));
    const json = JSON.parse(readFileSync(join(ROOT, page.file), 'utf8').trimStart());
    const quote = page.quote(json);
    const text = mainText(res.body);
    const pos = text.indexOf(quote);
    check(pos >= 0 && pos + quote.length <= 600, `(r) ${page.path}: quotable sentence within the first 600 chars of <main>`, pos >= 0 ? `chars ${pos}–${pos + quote.length}` : `not found: ${quote.slice(0, 60)}`);
    const h2s = [...res.body.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/g)].map(([, inner]) => decodeHtml(inner.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim());
    const missingH2 = page.h2.filter((needle) => !h2s.some((h2) => h2.includes(needle)));
    check(missingH2.length === 0, `(r) ${page.path}: H2s contain ${page.h2.map((s) => `"${s}"`).join(', ')}`, missingH2.length ? `missing: ${missingH2.join(', ')}` : `${h2s.length} H2s`);
    check(new RegExp(`href="(https://teeli\\.net)?${escapeRegExp(REPAIR_PAGE)}"`).test(res.body), `(r) ${page.path}: links to ${REPAIR_PAGE}`);
    const bannedHits = REPAIR_PAGE_BANNED.filter((re) => re.test(pageText(res.body))).map((re) => re.source);
    check(bannedHits.length === 0, `(r) ${page.path}: none of the banned words from (n)`, bannedHits.join(', '));
    const external = await externalStatuses(res.body);
    for (const link of external) console.log(`      ${link.status} ${link.url}${link.walled ? '  (bot wall: unverifiable by script, not broken)' : ''}`);
    const brokenExternal = external.filter((link) => link.status !== 200 && !link.walled);
    check(brokenExternal.length === 0, `(r) ${page.path}: all ${external.length} external links return 200 (bot walls listed above)`, brokenExternal.map((link) => `${link.status} ${link.url}`).join('; '));
    const words = json.content.split(/\s+/).filter(Boolean).length;
    check(words >= page.words[0] && words <= page.words[1], `(r) ${page.path}: content is ${page.words[0]}–${page.words[1]} words`, `${words} (rendered <main>: ${wordCount(text)})`);
  }

  // (t) both pages answer 200 and carry today's date in the sitemap
  for (const page of ranked) {
    const entry = urls.find((u) => u.loc === `https://teeli.net${page.path}`);
    check(rankedPages[page.path].status === 200 && entry?.day === TODAY, `(t) ${page.path} returns 200 and its sitemap lastmod is today`, `HTTP ${rankedPages[page.path].status}, lastmod ${entry?.day ?? 'missing'}`);
  }

  console.log(failures ? `\n${failures} check(s) FAILED` : '\nAll checks passed');
  // exitCode, not process.exit(): exiting while fetch sockets close aborts Node on Windows (libuv assert).
  process.exitCode = failures ? 1 : 0;
}

main().catch((err) => {
  console.error(`FAIL  could not reach ${BASE}: ${err.cause?.code ?? err.message}`);
  process.exitCode = 1;
});
