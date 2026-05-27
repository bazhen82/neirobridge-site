# Деплой «Аркадий» — пошагово

Консультант: **Аркадий** · Neiro-консультант NeiroBridge.

---

## Шаг 1. Залить код на GitHub (с вашего ПК)

```powershell
cd "D:\Rabota\Бизнес задачи\neirobridge-site"
git status
git add .
git commit -m "Add Arkadiy RAG chat widget"
git push origin main
```

**Проверка:** на https://github.com/bazhen82/neirobridge-site есть коммит с `ChatWidget.tsx`, `app/api/chat`, `lib/rag/chunks.json`.

→ Напишите «шаг 1 готов» — дам шаг 2.

---

## Шаг 2. Локальная проверка (опционально, на ПК)

```powershell
cd "D:\Rabota\Бизнес задачи\neirobridge-site"
copy .env.example .env
# В .env добавьте OPENAI_API_KEY (тот же ProxyAPI, что у DeskMate)
npm run dev
```

Откройте http://localhost:3000 — справа внизу кнопка чата.

---

## Шаг 3. SSH на сервер Timeweb

```bash
ssh user@your-server
```

---

## Шаг 4. Обновить код на сервере

```bash
cd /opt/neirobridge-site
git pull origin main
```

---

## Шаг 5. Добавить переменные в `.env` на сервере

```bash
nano .env
```

```env
OPENAI_API_KEY=ваш_ключ_proxyapi
OPENAI_BASE_URL=https://api.proxyapi.ru/openai/v1
OPENAI_CHAT_MODEL=gpt-4o-mini
OPENAI_EMBED_MODEL=text-embedding-3-small
RAG_SCORE_THRESHOLD=0.38
```

---

## Шаг 6. Пересобрать Docker

```bash
docker compose -p neirobridge-site up -d --build
```

---

## Шаг 7. Проверка на https://neirobridge.ru

Виджет справа внизу → вопрос по услугам → заявка на диагностику.
