"use client";

import { motion } from "framer-motion";
import { Bot, Brain, Code2, Container, DatabaseZap, GitGraph, Globe, Network, ServerCog, Workflow } from "lucide-react";
import { Reveal } from "./Reveal";

const stack = [
  { name: "Python", icon: ServerCog },
  { name: "n8n", icon: Workflow },
  { name: "LLMs", icon: Brain },
  { name: "Docker", icon: Container },
  { name: "GitHub", icon: GitGraph },
  { name: "Telegram Bots", icon: Bot },
  { name: "APIs", icon: Network },
  { name: "Data Tables", icon: DatabaseZap },
  { name: "Next.js", icon: Globe },
  { name: "React", icon: Code2 },
  { name: "TypeScript", icon: Code2 },
  { name: "Tailwind CSS", icon: Code2 },
  { name: "Framer Motion", icon: Workflow },
  { name: "SEO & Deploy", icon: Globe }
];

export function TechStack() {
  return (
    <section id="stack" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-sm uppercase tracking-[0.32em] text-cyan-200">Tech Stack</p>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Технологии, которые двигают автоматизацию</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Стек подобран под практические задачи: AI-агенты, интеграции, API, современные сайты, SEO и надежная
            доставка сценариев.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {stack.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.name} delay={index * 0.05}>
                <motion.div
                  className="glass-panel group flex min-h-36 flex-col items-center justify-center rounded-[1.5rem] p-5 text-center"
                  animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }}
                  transition={{ duration: 5 + index * 0.25, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="rounded-2xl border border-cyan-200/20 bg-cyan-200/5 p-4 text-cyan-100 transition group-hover:shadow-[0_0_30px_rgba(103,246,255,0.35)]">
                    <Icon className="h-8 w-8" />
                  </div>
                  <span className="mt-4 font-semibold text-slate-100">{item.name}</span>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
