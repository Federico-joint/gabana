import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourceDir = path.join(root, "marcellogabanaholding.it");
const outDir = path.join(root, "dist");

const invalidNameChars = /[?#]/g;
const textExtensions = new Set([
  ".html",
  ".css",
  ".js",
  ".json",
  ".txt",
  ".xml",
  ".svg",
  ".map"
]);

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function sanitizeSegment(segment) {
  return segment.replace(invalidNameChars, (char) => {
    if (char === "?") return "__q__";
    if (char === "#") return "__hash__";
    return "_";
  });
}

function sanitizeRelative(relPath) {
  return relPath
    .split("/")
    .map((segment) => sanitizeSegment(segment))
    .join("/");
}

function encodeInvalidChars(value) {
  return value
    .replaceAll("?", "%3F")
    .replaceAll("#", "%23");
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === ".DS_Store") continue;

    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(fullPath));
      continue;
    }

    if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function replacementPairs(mapping) {
  const pairs = [];

  for (const [from, to] of mapping.entries()) {
    if (from === to) continue;

    pairs.push([from, to]);
    pairs.push([encodeURI(from), to]);
    pairs.push([encodeInvalidChars(from), to]);

    const fromBase = path.posix.basename(from);
    const toBase = path.posix.basename(to);
    if (fromBase !== toBase) {
      pairs.push([fromBase, toBase]);
      pairs.push([encodeURI(fromBase), toBase]);
      pairs.push([encodeInvalidChars(fromBase), toBase]);
    }
  }

  return pairs.sort((a, b) => b[0].length - a[0].length);
}

function replaceAll(content, pairs) {
  let output = content;

  for (const [from, to] of pairs) {
    output = output.split(from).join(to);
  }

  return output;
}

await fs.rm(outDir, { recursive: true, force: true });
await fs.mkdir(outDir, { recursive: true });

const sourceFiles = await walk(sourceDir);
const mapping = new Map();

for (const file of sourceFiles) {
  const rel = toPosix(path.relative(sourceDir, file));
  mapping.set(rel, sanitizeRelative(rel));
}

const pairs = replacementPairs(mapping);

for (const file of sourceFiles) {
  const rel = toPosix(path.relative(sourceDir, file));
  const cleanRel = mapping.get(rel);
  const target = path.join(outDir, cleanRel);
  const ext = path.extname(cleanRel).toLowerCase();

  await fs.mkdir(path.dirname(target), { recursive: true });

  if (textExtensions.has(ext)) {
    const content = await fs.readFile(file, "utf8");
    await fs.writeFile(target, replaceAll(content, pairs));
    continue;
  }

  await fs.copyFile(file, target);
}

await fs.writeFile(
  path.join(outDir, "_redirects"),
  [
    "/home / 301",
    "/marcellogabanaholding.it / 301",
    "/marcellogabanaholding.it/* /:splat 301",
    "/index.html /index.html 200"
  ].join("\n") + "\n"
);

console.log(`Built Netlify site in ${path.relative(root, outDir)}/`);
