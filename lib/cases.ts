export type CaseStudy = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  task: string;
  solution: string;
  result: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  telegramUrl?: string;
  telegramLabel?: string;
  githubUrl: string;
  detailPath?: string;
};

export const cases: CaseStudy[] = [
  {
    slug: "beanbonus",
    title: "BeanBonus — лояльность для кофейни",
    eyebrow: "Telegram · лояльность",
    summary: "Бонусы и списания прямо в чате, без отдельного приложения кассы.",
    task: "Гостям нужно копить бонусы, а продавцу — быстро начислять и списывать баллы без отдельной кассы-программы.",
    solution: "Telegram-бот с режимом гостя и продавца: начисление, списание и проверка баланса в чате.",
    result: "Программа лояльности работает там, где уже сидят клиенты — в Telegram, без лишних приложений.",
    highlights: [],
    metrics: [],
    githubUrl: "https://github.com/NeiroBridge/beanbonus-bot"
  },
  {
    slug: "deskmate",
    title: "AI-ассистент по материалам компании",
    eyebrow: "DeskMate · RAG · метрики",
    summary:
      "Telegram-ассистент NeiroBridge: ответы по базе знаний, кэш повторных вопросов и логирование времени ответа.",
    task: "Сотрудники тратили время на поиск ответов в документах, FAQ и переписке.",
    solution:
      "DeskMate с RAG (ChromaDB), кэшем ответов и SQLite-метриками: видно среднее время ответа и долю попаданий в кэш через /stats.",
    result:
      "Быстрые ответы по утверждённым источникам; повторные вопросы отдаются из кэша быстрее и дешевле по API.",
    highlights: [
      "Режим /mode rag — ответы только из базы знаний студии",
      "Кэш одинаковых вопросов экономит вызовы ProxyAPI",
      "SQLite-логи: время ответа, user_id, флаг кэша (без телефонов и ФИО)",
      "Команда /stats — живые метрики на сервере Timeweb"
    ],
    metrics: [
      { label: "Канал", value: "Telegram" },
      { label: "Поиск", value: "RAG + ChromaDB" },
      { label: "Контроль", value: "/stats + logs.db" }
    ],
    telegramUrl: "https://t.me/DeskMate_NB_bot",
    telegramLabel: "@DeskMate_NB_bot",
    githubUrl: "https://github.com/NeiroBridge/deskmate-bot",
    detailPath: "/cases/deskmate"
  },
  {
    slug: "rivalscope",
    title: "RivalScope — разбор конкурентов",
    eyebrow: "AI · анализ рынка",
    summary: "Сбор и сравнение позиционирования конкурентов без ручного копипаста сайтов.",
    task: "Нужно быстро понять, как конкуренты подают оффер, тексты и визуал — без ручного копипаста сайтов.",
    solution: "AI-панель, которая собирает данные с сайтов и сравнивает позиционирование.",
    result: "Заготовки для стратегии и оффера на основе реальных материалов рынка.",
    highlights: [],
    metrics: [],
    githubUrl: "https://github.com/NeiroBridge/RivalScope"
  },
  {
    slug: "style-lora",
    title: "Дообучение модели под стиль ответов",
    eyebrow: "LoRA · pipeline",
    summary: "Воспроизводимый пайплайн: свой датасет, LoRA-адаптер и чат без GPU.",
    task: "Нужен прозрачный процесс дообучения: свой датасет, адаптер и запуск чата на слабом железе, без аренды GPU.",
    solution:
      "CPU-обучение rugpt3small + LoRA на 122 парах в стиле наставника. Репозиторий со скриптами, датасетом и отчётом.",
    result:
      "Пайплайн собран и опубликован. На слабом CPU качество ответов слабое — кейс про процесс, не про «умную модель».",
    highlights: [],
    metrics: [],
    githubUrl: "https://github.com/NeiroBridge/style-lora-mentor"
  }
];

export function getCaseBySlug(slug: string) {
  return cases.find((item) => item.slug === slug);
}
