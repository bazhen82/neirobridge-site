import fs from "fs";
import path from "path";

const CHUNK_SIZE = 900;
const CHUNK_OVERLAP = 120;

export function loadKnowledgeTexts(knowledgeDir: string): { source: string; text: string }[] {
  const files = fs.readdirSync(knowledgeDir).filter((f) => f.endsWith(".txt"));
  return files.map((file) => ({
    source: file,
    text: fs.readFileSync(path.join(knowledgeDir, file), "utf-8")
  }));
}

export function splitText(source: string, text: string): { source: string; text: string }[] {
  const parts: string[] = [];
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

  return parts.map((part, index) => ({
    source: `${source}#${index + 1}`,
    text: part
  }));
}

export function buildChunksFromKnowledge(knowledgeDir: string) {
  const docs = loadKnowledgeTexts(knowledgeDir);
  return docs.flatMap((doc) => splitText(doc.source, doc.text));
}
