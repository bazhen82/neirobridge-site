import { NextResponse } from "next/server";
import { chatCompletion, embedText } from "@/lib/openai";
import { formatContext, searchChunks } from "@/lib/rag/search";
import type { ChatMessage, ChatResponse } from "@/lib/rag/types";

type ChatPayload = {
  message?: string;
  history?: ChatMessage[];
};

const rateMap = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 25;
const WINDOW_MS = 60 * 60 * 1000;

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function checkRateLimit(ip: string) {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count += 1;
  return true;
}

function sanitize(value: unknown, max = 1200) {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

const OFF_TOPIC =
  /(политик|порно|наркот|взлом|crack|warez|генocide|напиши код|реши задач)/i;

const FALLBACK_REPLY =
  "По этому вопросу в базе NeiroBridge нет точного ответа. Могу предложить бесплатную диагностику процесса: за 1–2 дня разберём ваш кейс и подскажем, с чего начать. Нажмите «Записаться на диагностику» — это 0 ₽ и без обязательств.";

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ message: "Слишком много запросов. Попробуйте позже." }, { status: 429 });
    }

    const body = (await request.json()) as ChatPayload;
    const message = sanitize(body.message, 800);

    if (!message) {
      return NextResponse.json({ message: "Пустой вопрос" }, { status: 400 });
    }

    if (OFF_TOPIC.test(message)) {
      const payload: ChatResponse = {
        reply:
          "Я отвечаю только по услугам, ценам и процессам NeiroBridge. Если нужна помощь с автоматизацией — опишите задачу или запишитесь на бесплатную диагностику.",
        foundInKnowledge: false,
        suggestLead: true
      };
      return NextResponse.json(payload);
    }

    const history = (body.history ?? []).slice(-4);
    const queryEmbedding = await embedText(message);
    const { results, bestScore, isRelevant } = searchChunks(queryEmbedding, 3);

    if (!isRelevant) {
      const payload: ChatResponse = {
        reply: FALLBACK_REPLY,
        foundInKnowledge: false,
        suggestLead: true,
        topScore: bestScore
      };
      return NextResponse.json(payload);
    }

    const context = formatContext(results);
    const system = `Ты — Аркадий, Neiro-консультант студии NeiroBridge (neirobridge.ru).
Отвечай ТОЛЬКО на основе контекста из базы знаний. Не выдумывай цены и условия.
Если в контексте нет данных — скажи, что нужна бесплатная диагностика.
Стиль: дружелюбно, по делу, до 120 слов, на русском.
В конце одной строкой мягко предложи бесплатную диагностику, если вопрос про внедрение.

Контекст:
${context}`;

    const messages = [
      { role: "system", content: system },
      ...history.map((item) => ({ role: item.role, content: item.content })),
      { role: "user", content: message }
    ];

    const reply = await chatCompletion(messages);
    const payload: ChatResponse = {
      reply: reply || FALLBACK_REPLY,
      foundInKnowledge: true,
      suggestLead: true,
      topScore: bestScore
    };

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(
      {
        reply: "Сейчас не могу ответить. Оставьте заявку на бесплатную диагностику — свяжемся вручную.",
        foundInKnowledge: false,
        suggestLead: true
      } satisfies ChatResponse,
      { status: 200 }
    );
  }
}
