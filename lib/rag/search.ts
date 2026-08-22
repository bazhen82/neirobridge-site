import type { RagChunk } from "./types";
import chunksData from "./chunks.json";

const THRESHOLD = Number(process.env.RAG_SCORE_THRESHOLD ?? "0.38");

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  if (!normA || !normB) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

export function getChunks(): RagChunk[] {
  return chunksData as RagChunk[];
}

export function searchChunks(queryEmbedding: number[], topK = 3) {
  const ranked = getChunks()
    .map((chunk) => ({
      chunk,
      score: cosineSimilarity(queryEmbedding, chunk.embedding)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  const best = ranked[0]?.score ?? 0;
  return {
    results: ranked,
    bestScore: best,
    isRelevant: best >= THRESHOLD
  };
}

const SOURCE_TITLES: Record<string, string> = {
  "faqs.json": "FAQ",
  "pricing_and_offers.txt": "Цены и услуги",
  "product_guide.txt": "Продукты",
  "integrations_workflows.txt": "Интеграции",
  "boundaries.txt": "Границы услуг"
};

export function sourceTitle(source: string) {
  return SOURCE_TITLES[source] ?? source;
}

export function uniqueSourceTitles(results: { chunk: RagChunk }[], limit = 2) {
  const titles = results.map((item) => sourceTitle(item.chunk.source));
  return [...new Set(titles)].slice(0, limit);
}

export function formatContext(results: { chunk: RagChunk; score: number }[]) {
  return results
    .map(
      (item, index) =>
        `[Источник ${index + 1}: ${sourceTitle(item.chunk.source)}, релевантность ${item.score.toFixed(2)}]\n${item.chunk.text}`
    )
    .join("\n\n");
}
