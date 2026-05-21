# NeiroBridge Portfolio

Одностраничный сайт-портфолио в стиле Futuristic/Cyberpunk Business для домена `neirobridge.ru`.

## Стек

- Next.js App Router
- Tailwind CSS
- Framer Motion
- GitHub API
- Resend email API
- Lucide React icons

## Запуск

```bash
npm install
npm run dev
```

## Деплой

Проект готов для Docker-деплоя на Timeweb за Caddy. Подробные шаги описаны в `DEPLOY.md`.

## Переменные окружения

Скопируйте `.env.example` в `.env` и заполните:

```bash
RESEND_API_KEY=
LEAD_TO_EMAIL=bazhenov.maxim@gmail.com
LEAD_FROM_EMAIL=NeiroBridge <onboarding@resend.dev>
```

`LEAD_TO_EMAIL` используется только на сервере и не публикуется в HTML.

## Настройки

- Telegram-ссылка находится в `components/Contact.tsx`.
- GitHub-репозитории загружаются в `lib/github.ts`.
- Логотип подключен как `public/favicon.png` и `public/og-neirobridge.png`.
