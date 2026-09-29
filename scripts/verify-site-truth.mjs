#!/usr/bin/env node
// S1 "site truth" checks against a running server (`npm run build && npm run start`).
// Usage: node scripts/verify-site-truth.mjs [baseUrl]      (default http://localhost:3000)
//        TODAY=YYYY-MM-DD overrides the local calendar day used for the lastmod checks.
// Node 22+ built-ins only. Exits 1 when any check fails.

const BASE = (process.argv[2] ?? process.env.BASE_URL ?? 'http://localhost:3000').replace(/\/+$/, '');
const TODAY = process.env.TODAY ?? localDay(new Date());
const CHECK_URL = 'https://app.teeli.net/check?source=embed:teeli.net-home';
const CONTENT_PATHS = ['/glossary/watertight-mesh', '/blog/mesh-repair'];

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
  const res = await fetch(`${BASE}${path}`, { redirect: 'manual' });
  return { status: res.status, body: await res.text() };
}

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

async function main() {
  console.log(`verify-site-truth  base=${BASE}  today=${TODAY}`);

  // (a) sitemap: at most 2 URLs dated today, none in the future, no priority/changefreq
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
  check(today.length <= 2, "(a) at most 2 URLs carry today's lastmod", `${today.length}: ${today.map((u) => u.loc).join(', ') || '-'}`);
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
  const ldNodes = [...home.body.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap(
    ([, json]) => {
      try {
        const data = JSON.parse(json);
        return data['@graph'] ?? [data];
      } catch {
        return [];
      }
    },
  );
  const org = ldNodes.find((node) => node['@type'] === 'Organization');
  check(
    home.body.includes('"alternateName":"TEELI.NET"') && org?.alternateName === 'TEELI.NET',
    '(c) Organization JSON-LD has "alternateName":"TEELI.NET"',
    org ? `sameAs=${JSON.stringify(org.sameAs)}` : 'no Organization node',
  );

  // (d) the two deployed content pages answer 200 and are in the sitemap
  for (const path of CONTENT_PATHS) {
    const res = await get(path);
    check(res.status === 200, `(d) GET ${path}`, `HTTP ${res.status}`);
    check(urls.some((u) => u.loc === `https://teeli.net${path}`), `(d) ${path} is listed in the sitemap`);
  }

  console.log(failures ? `\n${failures} check(s) FAILED` : '\nAll checks passed');
  // exitCode, not process.exit(): exiting while fetch sockets close aborts Node on Windows (libuv assert).
  process.exitCode = failures ? 1 : 0;
}

main().catch((err) => {
  console.error(`FAIL  could not reach ${BASE}: ${err.cause?.code ?? err.message}`);
  process.exitCode = 1;
});
