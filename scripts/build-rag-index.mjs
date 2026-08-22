import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const knowledgeDir = path.join(root, "lib", "knowledge");
const outFile = path.join(root, "lib", "rag", "chunks.json");

function loadEnv() {
  const envPath = path.join(root, ".env");
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, "utf-8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnv();

const CHUNK_SIZE = 900;
const CHUNK_OVERLAP = 120;
const BASE_URL = process.env.OPENAI_BASE_URL ?? "https://api.proxyapi.ru/openai/v1";
const API_KEY = process.env.OPENAI_API_KEY;
const EMBED_MODEL = process.env.OPENAI_EMBED_MODEL ?? "text-embedding-3-small";

function splitText(source, text) {
  const parts = [];
  const blocks = text.split(/\n(?=## )/);
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    if (trimmed.length <= CHUNK_SIZE) {
      parts.push(trimmed);
      continue;
    }
    let start = 0;
    while (start < trimmed.length) {
      const end = Math.min(start + CHUNK_SIZE, trimmed.length);
      parts.push(trimmed.slice(start, end).trim());
      if (end >= trimmed.length) break;
      start = end - CHUNK_OVERLAP;
    }
  }
  return parts.map((part, index) => ({ source: `${source}#${index + 1}`, text: part }));
}

function loadFaqChunks() {
  const file = path.join(knowledgeDir, "faqs.json");
  if (!fs.existsSync(file)) return [];
  const items = JSON.parse(fs.readFileSync(file, "utf-8"));
  return items.map((item, index) => ({
    source: `faqs.json#${index + 1}`,
    text: `Вопрос: ${item.question}\nОтвет: ${item.answer}`
  }));
}

function buildChunks() {
  const files = fs.readdirSync(knowledgeDir).filter((f) => f.endsWith(".txt"));
  const textChunks = files.flatMap((file) => {
    const text = fs.readFileSync(path.join(knowledgeDir, file), "utf-8");
    return splitText(file, text);
  });
  return [...loadFaqChunks(), ...textChunks];
}

async function embed(text) {
  const response = await fetch(`${BASE_URL}/embeddings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ model: EMBED_MODEL, input: text })
  });
  if (!response.ok) throw new Error(await response.text());
  const data = await response.json();
  return data.data[0].embedding;
}

async function main() {
  if (!API_KEY) {
    console.error("Set OPENAI_API_KEY");
    process.exit(1);
  }
  const rawChunks = buildChunks();
  console.log(`Indexing ${rawChunks.length} chunks...`);
  const indexed = [];
  for (const [i, chunk] of rawChunks.entries()) {
    indexed.push({
      id: `chunk-${i + 1}`,
      source: chunk.source.split("#")[0],
      text: chunk.text,
      embedding: await embed(chunk.text)
    });
    console.log(`  [${i + 1}/${rawChunks.length}] ${chunk.source}`);
  }
  fs.writeFileSync(outFile, JSON.stringify(indexed));
  console.log(`Saved ${outFile}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
