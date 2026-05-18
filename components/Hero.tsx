"use client";

import { ArrowRight, Bot, Network, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  { value: "24/7", label: "AI-агенты в работе" },
  { value: "n8n", label: "оркестрация процессов" },
  { value: "LLM", label: "интеллект в бизнес-логике" }
];

export function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden px-4 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-cyan-200/5 px-4 py-2 text-sm text-cyan-100">
            <Sparkles className="h-4 w-4" />
            AI Automation Studio для малого и среднего бизнеса
          </div>
          <h1 className="neon-text max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
            NeiroBridge — Интеллектуальные решения для вашего бизнеса
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            Проектирую AI-агентов, n8n-сценарии и автоматизированные системы, которые берут на себя рутину,
            соединяют сервисы и помогают командам принимать решения быстрее.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contacts"
              className="neon-button group inline-flex items-center justify-center gap-3 rounded-full bg-cyan-300 px-7 py-4 font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-200"
            >
              Выбрать канал связи
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full border border-cyan-200/25 px-7 py-4 font-semibold text-cyan-100 transition hover:-translate-y-1 hover:bg-cyan-200/10"
            >
              Смотреть проекты
            </a>
          </div>
          <div className="mt-10 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="glass-panel rounded-2xl p-4">
                <div className="font-mono text-2xl font-bold text-cyan-200">{metric.value}</div>
                <div className="mt-1 text-sm text-slate-400">{metric.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="glass-panel relative min-h-[420px] overflow-hidden rounded-[2rem] p-6"
          initial={{ opacity: 0, scale: 0.94, rotateX: 8 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(103,246,255,0.28),transparent_42%)]" />
          <div className="relative flex h-full min-h-[380px] flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl border border-cyan-200/20 bg-cyan-200/5 p-3">
                <Bot className="h-7 w-7 text-cyan-200" />
              </div>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                Online
              </span>
            </div>
            <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full border border-cyan-200/20 bg-cyan-200/5 shadow-[0_0_80px_rgba(103,246,255,0.18)]">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                className="flex h-36 w-36 items-center justify-center rounded-full border border-dashed border-cyan-200/50"
              >
                <Network className="h-16 w-16 text-cyan-100" />
              </motion.div>
            </div>
            <div className="grid gap-3">
              {["Квалификация лидов", "Автоответы и CRM", "Синхронизация задач"].map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-cyan-200/10 bg-black/20 px-4 py-3"
                  animate={{ x: [0, index % 2 === 0 ? 10 : -10, 0] }}
                  transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-sm text-slate-200">{item}</span>
                  <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,246,255,0.9)]" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
