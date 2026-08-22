import { faqItems } from "@/lib/faqs";

const STOP = new Set([
  "этот",
  "это",
  "как",
  "что",
  "для",
  "или",
  "можно",
  "ли",
  "вы",
  "мы",
  "на",
  "от",
  "есть",
  "ваш",
  "ваши",
  "моих",
  "мои"
]);

function tokens(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP.has(word));
}

function lexicalScore(query: string, text: string) {
  const words = tokens(query);
  if (!words.length) return 0;
  const hay = text.toLowerCase();
  const hits = words.filter((word) => hay.includes(word)).length;
  return hits / words.length;
}

export function matchFaqs(query: string, topK = 2, minScore = 0.34) {
  return faqItems
    .map((item) => ({
      question: item.question,
      answer: item.answer,
      score: lexicalScore(query, `${item.question}\n${item.answer}`)
    }))
    .filter((item) => item.score >= minScore)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

export function formatFaqContext(hits: ReturnType<typeof matchFaqs>) {
  return hits
    .map(
      (item, index) =>
        `[Источник FAQ ${index + 1}]\nВопрос: ${item.question}\nОтвет: ${item.answer}`
    )
    .join("\n\n");
}
