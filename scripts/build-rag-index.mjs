import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const knowledgeDir = path.join(root, "lib", "knowledge");
const outFile = path.join(root, "lib", "rag", "chunks.json");

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

function buildChunks() {
  const files = fs.readdirSync(knowledgeDir).filter((f) => f.endsWith(".txt"));
  return files.flatMap((file) => {
    const text = fs.readFileSync(path.join(knowledgeDir, file), "utf-8");
    return splitText(file, text);
  });
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
