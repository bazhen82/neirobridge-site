"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "#about", label: "О студии" },
  { href: "#solutions", label: "Решения" },
  { href: "#projects", label: "Кейсы" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacts", label: "Контакты" }
];

export function Header() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50 border-b border-cyan-200/10 bg-[#02070b]/70 backdrop-blur-xl"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#hero" className="flex items-center gap-3" onClick={close}>
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
        <div className="flex items-center gap-2">
          <a
            href="#contacts"
            className="neon-button hidden rounded-full border border-cyan-200/40 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-300/10 sm:inline-flex"
          >
            Связаться
          </a>
          <button
            type="button"
            className="rounded-full p-2 text-cyan-100 transition hover:bg-cyan-200/10 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-cyan-200/10 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className="rounded-xl px-3 py-3 text-sm text-slate-200 transition hover:bg-cyan-200/10 hover:text-cyan-100"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
