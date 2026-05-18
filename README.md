# NeiroBridge Portfolio

Одностраничный сайт-портфолио в стиле Futuristic/Cyberpunk Business для домена `neirobridge.ru`.

## Стек

- Next.js App Router
- Tailwind CSS
- Framer Motion
- GitHub API
- Lucide React icons

## Запуск

```bash
npm install
npm run dev
```

## Деплой

Проект готов для Vercel или Netlify. После деплоя привяжите домен `neirobridge.ru` в панели хостинга и обновите DNS-записи у регистратора.

## Настройки

- Telegram-ссылка находится в `components/Header.tsx`, `components/Hero.tsx` и `components/Contact.tsx`.
- GitHub-репозитории загружаются в `lib/github.ts`.
- Логотип подключен как `public/favicon.png` и `public/og-neirobridge.png`.
