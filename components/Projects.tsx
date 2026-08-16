"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Coffee, ScanSearch, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

type CaseStudy = {
  id: string;
  icon: typeof Coffee;
  title: string;
  task: string;
  solution: string;
  result: string;
  href: string;
};

/** Short format for PEcf08 — full case pages later. */
const cases: CaseStudy[] = [
  {
    id: "beanbonus",
    icon: Coffee,
    title: "BeanBonus — лояльность для кофейни",
    task: "Гостям нужно копить бонусы, а продавцу — быстро начислять и списывать баллы без отдельной кассы-программы.",
    solution: "Telegram-бот с режимом гостя и продавца: начисление, списание и проверка баланса в чате.",
    result: "Программа лояльности работает там, где уже сидят клиенты — в Telegram, без лишних приложений.",
    href: "https://github.com/NeiroBridge/beanbonus-bot"
  },
  {
    id: "deskmate",
    icon: Sparkles,
    title: "AI-ассистент по материалам компании",
    task: "Сотрудники тратили время на поиск ответов в документах, FAQ и переписке.",
    solution:
      "Telegram-ассистент DeskMate с RAG по базе знаний, кэшем повторных вопросов и SQLite-метриками (время ответа, доля кэша).",
    result:
      "Быстрые ответы по утверждённым источникам; команда /stats показывает объём запросов, среднее время ответа и экономию за счёт кэша.",
    href: "https://github.com/NeiroBridge/deskmate-bot"
  },
  {
    id: "rivalscope",
    icon: ScanSearch,
    title: "RivalScope — разбор конкурентов",
    task: "Нужно быстро понять, как конкуренты подают оффер, тексты и визуал — без ручного копипаста сайтов.",
    solution: "AI-панель, которая собирает данные с сайтов и сравнивает позиционирование.",
    result: "Заготовки для стратегии и оффера на основе реальных материалов рынка.",
    href: "https://github.com/NeiroBridge/RivalScope"
  }
];

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-sm uppercase tracking-[0.32em] text-cyan-200">Кейсы</p>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Примеры пользы для бизнеса</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Коротко: какая была задача, что сделали и какой получился результат. Подробности и код — по ссылке.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cases.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.id} delay={index * 0.08}>
                <motion.article
                  className="glass-panel flex h-full flex-col rounded-[1.75rem] p-6"
                  whileHover={{ y: -8, scale: 1.01 }}
                >
                  <div className="rounded-2xl border border-cyan-200/20 bg-cyan-200/5 p-3 text-cyan-100 w-fit">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-white sm:text-2xl">{item.title}</h3>

                  <dl className="mt-5 flex flex-1 flex-col gap-4 text-sm leading-6 text-slate-300">
                    <div>
                      <dt className="font-semibold text-cyan-200">Задача</dt>
                      <dd className="mt-1">{item.task}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-cyan-200">Решение</dt>
                      <dd className="mt-1">{item.solution}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-cyan-200">Результат</dt>
                      <dd className="mt-1">{item.result}</dd>
                    </div>
                  </dl>

                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition hover:text-white"
                  >
                    Подробнее
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
