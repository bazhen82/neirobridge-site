"use client";

import { motion } from "framer-motion";

const navItems = [
  { href: "#about", label: "Обо мне" },
  { href: "#projects", label: "Проекты" },
  { href: "#stack", label: "Стек" },
  { href: "#contacts", label: "Контакты" }
];

export function Header() {
  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 border-b border-cyan-200/10 bg-[#02070b]/70 backdrop-blur-xl"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#hero" className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(103,246,255,0.9)]" />
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.28em] text-cyan-100">
            NeiroBridge
          </span>
        </a>
        <div className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition hover:text-cyan-200">
              {item.label}
            </a>
          ))}
        </div>
        <a
          href="#contacts"
          className="neon-button rounded-full border border-cyan-200/40 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-300/10"
        >
          Связаться
        </a>
      </nav>
    </motion.header>
  );
}
