"use client";

import { motion } from "framer-motion";
import { ExternalLink, GitFork, GitPullRequest, Star } from "lucide-react";
import type { GitHubRepo } from "@/lib/github";
import { Reveal } from "./Reveal";

const languageColors: Record<string, string> = {
  Python: "bg-blue-300",
  TypeScript: "bg-sky-300",
  JavaScript: "bg-yellow-300",
  n8n: "bg-pink-300"
};

const businessDescriptions: Record<string, string> = {
  RivalScope:
    "AI-панель для анализа конкурентов: собирает данные с сайтов, сравнивает позиционирование и подсвечивает точки роста.",
  MarketVision:
    "AI-помощник для маркетплейсов: помогает готовить карточки товаров, описания и визуальные идеи для Ozon и Wildberries.",
  "tasktreker-vk-n8n":
    "n8n-сценарий для управления задачами из VK: дедлайны через GigaChat, синхронизация и напоминания.",
  "neirobridge-site":
    "Этот сайт как пример web-направления: Next.js, адаптивный UI, GitHub API, Docker и деплой за Caddy.",
  anonspost: "Панель для ручных email-рассылок на Flask и SMTP: пример простого внутреннего бизнес-инструмента.",
  presentBot: "Бот-проект для автоматизации повторяющихся действий и экспериментов с AI-сценариями."
};

function getTags(repo: GitHubRepo) {
  if (repo.topics && repo.topics.length > 0) {
    return repo.topics.slice(0, 4);
  }

  return [repo.language, "Automation", "AI"].filter(Boolean).slice(0, 4) as string[];
}

export function Projects({ repos }: { repos: GitHubRepo[] }) {
  return (
    <section id="projects" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-sm uppercase tracking-[0.32em] text-cyan-200">GitHub Projects</p>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Проекты как живые бизнес-сценарии</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Нажмите на карточку, чтобы открыть проект на GitHub: там можно посмотреть код, описание решения и
            технологии, которые использовались в работе.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {repos.map((repo, index) => (
            <Reveal key={repo.id} delay={index * 0.08}>
              <motion.a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="glass-panel group block h-full rounded-[1.75rem] p-6 transition"
                whileHover={{ y: -10, scale: 1.015 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-2xl border border-cyan-200/20 bg-cyan-200/5 p-3 text-cyan-100">
                    <GitPullRequest className="h-6 w-6" />
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {repo.stargazers_count}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      {repo.forks_count}
                    </span>
                  </div>
                </div>
                <h3 className="mt-6 flex items-center gap-2 text-2xl font-bold text-white">
                  {repo.name}
                  <ExternalLink className="h-4 w-4 text-cyan-200 opacity-0 transition group-hover:opacity-100" />
                </h3>
                <p className="mt-4 min-h-24 text-sm leading-7 text-slate-300">
                  {businessDescriptions[repo.name] ?? repo.description ?? "AI-ready репозиторий для автоматизации и интеграций."}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-cyan-200/10 pt-5">
                  <span className="inline-flex items-center gap-2 text-sm text-slate-300">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${languageColors[repo.language ?? ""] ?? "bg-cyan-300"}`}
                    />
                    {repo.language ?? "Automation"}
                  </span>
                  <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                    Active
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {getTags(repo).map((tag) => (
                    <span key={tag} className="rounded-full bg-cyan-200/10 px-3 py-1 text-xs text-cyan-100">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
