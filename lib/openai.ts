const BASE_URL = process.env.OPENAI_BASE_URL ?? "https://api.proxyapi.ru/openai/v1";
const API_KEY = process.env.OPENAI_API_KEY;
const CHAT_MODEL = process.env.OPENAI_CHAT_MODEL ?? "gpt-4o-mini";
const EMBED_MODEL = process.env.OPENAI_EMBED_MODEL ?? "text-embedding-3-small";

function requireKey() {
  if (!API_KEY) {
    throw new Error("OPENAI_API_KEY is not set");
  }
}

export async function embedText(text: string): Promise<number[]> {
  requireKey();
  const response = await fetch(`${BASE_URL}/embeddings`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: EMBED_MODEL,
      input: text
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Embeddings API error: ${response.status} ${detail}`);
  }

  const data = (await response.json()) as { data: { embedding: number[] }[] };
  return data.data[0].embedding;
}

export async function chatCompletion(messages: { role: string; content: string }[]) {
  requireKey();
  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: CHAT_MODEL,
      temperature: 0.3,
      max_tokens: 350,
      messages
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Chat API error: ${response.status} ${detail}`);
  }

  const data = (await response.json()) as {
    choices: { message: { content: string } }[];
  };
  return data.choices[0]?.message?.content?.trim() ?? "";
}
