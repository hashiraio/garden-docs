#!/usr/bin/env node
// Regenerates the translation-dependent parts of docs.json.
//
//   node scripts/i18n-sync.mjs           update docs.json
//   node scripts/i18n-sync.mjs --check   exit 1 if docs.json is out of date
//
// Redirects: every English page without a translation gets a temporary (307)
// redirect from /<lang>/<page> to /<page> (or one /<lang>/<folder>/:slug*
// wildcard for a folder with nothing translated), so untranslated URLs fall
// back to English instead of returning a 404. Translating a page removes its
// redirect. Redirects written by hand are kept as long as they aren't of that
// shape.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const LANGUAGES = ["es", "ru", "zh"];

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOCS_JSON = path.join(ROOT, "docs.json");
const SKIP_DIRS = new Set(["node_modules", "snippets", "scripts", "i18n", ...LANGUAGES]);

// Page paths (relative, no extension) of every .mdx file under dir.
function listPages(dir, prefix = "") {
  const pages = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (!prefix && SKIP_DIRS.has(entry.name)) continue;
      pages.push(...listPages(path.join(dir, entry.name), rel));
    } else if (entry.name.endsWith(".mdx")) {
      pages.push(rel.slice(0, -".mdx".length));
    }
  }
  return pages.sort();
}

const pageUrl = (page) => (page === "index" ? "/" : `/${page}`);
const localizedUrl = (lang, page) => (page === "index" ? `/${lang}` : `/${lang}/${page}`);

function isGeneratedRedirect({ source, destination }) {
  return LANGUAGES.some((lang) => {
    if (source === `/${lang}`) return destination === "/";
    return source.startsWith(`/${lang}/`) && destination === source.slice(lang.length + 1);
  });
}

const redirect = (source, destination) => ({ source, destination, permanent: false });

// Fallback redirects for one language. A folder with no translated page at all
// collapses into one wildcard; inside partly translated folders, each missing
// page gets its own redirect so a wildcard never shadows a translated page.
function languageRedirects(lang, pages, done, dir = "") {
  const inDir = dir ? pages.filter((p) => p.startsWith(`${dir}/`)) : pages;
  const children = new Set(inDir.map((p) => p.slice(dir ? dir.length + 1 : 0).split("/")[0]));
  const out = [];
  for (const name of [...children].sort()) {
    const page = dir ? `${dir}/${name}` : name;
    const isPage = pages.includes(page);
    const isDir = pages.some((p) => p.startsWith(`${page}/`));
    const anyDone = done.has(page) || [...done].some((p) => p.startsWith(`${page}/`));
    if (isPage && !done.has(page)) out.push(redirect(localizedUrl(lang, page), pageUrl(page)));
    if (!isDir) continue;
    if (anyDone) out.push(...languageRedirects(lang, pages, done, page));
    else out.push(redirect(`/${lang}/${page}/:slug*`, `/${page}/:slug*`));
  }
  return out;
}

function buildRedirects(englishPages, translated, existing = []) {
  const manual = existing.filter((r) => !isGeneratedRedirect(r));
  const generated = LANGUAGES.flatMap((lang) => languageRedirects(lang, englishPages, translated[lang]));
  return [...manual, ...generated];
}

const englishPages = listPages(ROOT);
const englishSet = new Set(englishPages);
const translated = {};
for (const lang of LANGUAGES) {
  const dir = path.join(ROOT, lang);
  const pages = fs.existsSync(dir) ? listPages(dir) : [];
  for (const page of pages) {
    if (!englishSet.has(page)) console.warn(`warning: ${lang}/${page}.mdx has no English source`);
  }
  translated[lang] = new Set(pages.filter((p) => englishSet.has(p)));
}

const original = fs.readFileSync(DOCS_JSON, "utf8");
const docs = JSON.parse(original);

const redirects = buildRedirects(englishPages, translated, docs.redirects);
if (redirects.length) docs.redirects = redirects;
else delete docs.redirects;

const output = JSON.stringify(docs, null, 2);
const changed = output !== original;

if (process.argv.includes("--check")) {
  if (changed) {
    console.error("docs.json is out of date. Run: node scripts/i18n-sync.mjs");
    process.exit(1);
  }
  console.log("docs.json is up to date.");
} else {
  if (changed) fs.writeFileSync(DOCS_JSON, output);
  for (const lang of LANGUAGES) {
    console.log(`${lang}: ${translated[lang].size}/${englishPages.length} pages translated`);
  }
  console.log(changed ? "Updated docs.json." : "docs.json already up to date.");
}
