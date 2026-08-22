"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Coffee, Cpu, ScanSearch, Sparkles } from "lucide-react";
import Link from "next/link";
import { cases } from "@/lib/cases";
import { Reveal } from "./Reveal";

const icons = {
  beanbonus: Coffee,
  deskmate: Sparkles,
  rivalscope: ScanSearch,
  "style-lora": Cpu
} as const;

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-sm uppercase tracking-[0.32em] text-cyan-200">Кейсы</p>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Примеры пользы для бизнеса</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Коротко: задача, решение, результат. У AI-ассистента — отдельная страница и живой бот в Telegram.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cases.map((item, index) => {
            const Icon = icons[item.slug as keyof typeof icons] ?? Sparkles;
            const detailHref = item.detailPath ?? item.githubUrl;
            const isInternal = Boolean(item.detailPath);

            return (
              <Reveal key={item.slug} delay={index * 0.08}>
                <motion.article
                  className="glass-panel flex h-full flex-col rounded-[1.75rem] p-6"
                  whileHover={{ y: -8, scale: 1.01 }}
                >
                  <div className="w-fit rounded-2xl border border-cyan-200/20 bg-cyan-200/5 p-3 text-cyan-100">
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

                  {isInternal ? (
                    <Link
                      href={detailHref}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition hover:text-white"
                    >
                      Подробнее
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <a
                      href={detailHref}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100 transition hover:text-white"
                    >
                      Подробнее
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
