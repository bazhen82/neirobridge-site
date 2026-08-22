"use client";

import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, X } from "lucide-react";
import type { ChatMessage } from "@/lib/rag/types";

const STARTER_PROMPTS = [
  "Что входит в бесплатную диагностику?",
  "Сколько стоит AI-агент для заявок?",
  "Какие интеграции вы делаете?",
  "Хочу обсудить свой кейс"
];

type View = "chat" | "lead";

function useContainScroll(ref: RefObject<HTMLDivElement | null>, enabled: boolean) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    const onWheel = (event: WheelEvent) => {
      event.stopPropagation();
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop <= 0 && event.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && event.deltaY > 0;
      if (atTop || atBottom) event.preventDefault();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [ref, enabled]);
}

function readStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode / blocked storage should not break the widget.
  }
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<View>("chat");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Привет! Я Аркадий, Neiro-консультант NeiroBridge. Отвечаю по услугам, ценам и интеграциям. Выберите вопрос или напишите свой."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [leadTask, setLeadTask] = useState("");
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [leadMessage, setLeadMessage] = useState("");
  const listRef = useRef<HTMLDivElement>(null);
  const leadRef = useRef<HTMLDivElement>(null);

  useContainScroll(listRef, open && view === "chat");
  useContainScroll(leadRef, open && view === "lead");

  useEffect(() => {
    const seen = readStorage("arkadiy-hint-seen");
    if (!seen) {
      const timer = setTimeout(() => setShowHint(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, view]);

  function dismissHint() {
    setShowHint(false);
    writeStorage("arkadiy-hint-seen", "1");
  }

  function openWidget() {
    dismissHint();
    setOpen(true);
  }

  async function sendMessage(text: string) {
    const question = text.trim();
    if (!question || loading) return;

    const nextHistory: ChatMessage[] = [...messages, { role: "user", content: question }];
    setMessages(nextHistory);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: question,
          history: nextHistory.filter((m) => m.role === "user" || m.role === "assistant")
        })
      });

      const data = (await response.json()) as {
        reply?: string;
        message?: string;
        suggestLead?: boolean;
        sources?: string[];
      };

      const reply =
        data.reply ??
        data.message ??
        "Не удалось получить ответ. Можете оставить заявку на бесплатную диагностику.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: reply,
          sources: Array.isArray(data.sources) ? data.sources.slice(0, 2) : undefined
        }
      ]);

      if (data.suggestLead) {
        setLeadTask((prev) => prev || `Вопрос из чата: ${question}`);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Сейчас сервис недоступен. Оставьте заявку — мы ответим вручную."
        }
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLeadStatus("loading");
    setLeadMessage("");

    const formData = new FormData(event.currentTarget);
    const chatContext = messages
      .slice(-6)
      .map((m) => `${m.role === "user" ? "Клиент" : "Аркадий"}: ${m.content}`)
      .join("\n");

    const payload = Object.fromEntries(formData.entries());
    payload.source = "arkadiy-chat";
    payload.chatContext = chatContext;

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = (await response.json()) as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Ошибка отправки");

      setLeadStatus("success");
      setLeadMessage("Заявка отправлена. Свяжемся после изучения задачи.");
      event.currentTarget.reset();
    } catch (error) {
      setLeadStatus("error");
      setLeadMessage(error instanceof Error ? error.message : "Не удалось отправить заявку");
    }
  }

  return (
    <>
      <AnimatePresence>
        {showHint && !open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed bottom-24 right-6 z-50 max-w-[220px] rounded-2xl border border-cyan-200/25 bg-[#031018]/95 px-4 py-3 text-sm text-slate-200 shadow-[0_0_30px_rgba(103,246,255,0.15)]"
          >
            Спросите Аркадия про услуги и цены NeiroBridge
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            className="glass-panel fixed bottom-24 right-4 z-50 flex h-[min(640px,calc(100dvh-6.5rem))] w-[min(420px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[1.5rem] sm:right-6"
          >
            <header className="flex shrink-0 items-center justify-between border-b border-cyan-200/15 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-300/15 text-cyan-200">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-bold text-white">Аркадий</p>
                  <p className="text-xs text-cyan-200/80">Neiro-консультант · онлайн</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-slate-400 transition hover:bg-cyan-200/10 hover:text-white"
                aria-label="Свернуть чат"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {view === "chat" ? (
              <>
                <div
                  ref={listRef}
                  className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
                >
                  {messages.map((message, index) => (
                    <div
                      key={`${message.role}-${index}`}
                      className={`max-w-[90%] rounded-2xl px-3 py-2 text-[13px] leading-5 sm:text-sm sm:leading-6 ${
                        message.role === "user"
                          ? "ml-auto bg-cyan-300 text-slate-950"
                          : "border border-cyan-200/15 bg-black/30 text-slate-200"
                      }`}
                    >
                      {message.content}
                      {message.role === "assistant" && message.sources && message.sources.length > 0 ? (
                        <p className="mt-1.5 text-[11px] leading-4 text-cyan-200/55">
                          Источник: {message.sources.join(" · ")}
                        </p>
                      ) : null}
                    </div>
                  ))}
                  {loading && (
                    <p className="text-sm text-cyan-200/70">Ищу в базе знаний NeiroBridge…</p>
                  )}
                </div>

                <div className="shrink-0 border-t border-cyan-200/10 px-3 py-2.5 sm:px-4 sm:py-3">
                  {messages.length <= 2 && (
                    <div className="mb-2 flex flex-wrap gap-1.5">
                      {STARTER_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => sendMessage(prompt)}
                          className="rounded-full border border-cyan-200/20 bg-black/20 px-2.5 py-1 text-[11px] leading-4 text-slate-300 transition hover:border-cyan-200/50 hover:text-white"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  )}

                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      sendMessage(input);
                    }}
                    className="flex gap-2"
                  >
                    <input
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      placeholder="Ваш вопрос…"
                      className="min-w-0 flex-1 rounded-2xl border border-cyan-200/15 bg-black/30 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-200/50"
                    />
                    <button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="neon-button shrink-0 rounded-full bg-cyan-300 p-2 text-slate-950 disabled:opacity-50"
                      aria-label="Отправить"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </form>

                  <button
                    type="button"
                    onClick={() => setView("lead")}
                    className="mt-2 w-full rounded-full border border-cyan-200/25 px-3 py-1.5 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-200/10 sm:text-sm"
                  >
                    Записаться на бесплатную диагностику
                  </button>
                </div>
              </>
            ) : (
              <div
                ref={leadRef}
                className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4"
              >
                <button
                  type="button"
                  onClick={() => setView("chat")}
                  className="mb-4 text-left text-sm text-cyan-200 hover:underline"
                >
                  ← Назад к чату
                </button>
                <h3 className="text-lg font-bold text-white">Бесплатная диагностика — 0 ₽</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Опишите задачу — разберём процесс за 1–2 рабочих дня и предложим следующий шаг.
                </p>
                <form onSubmit={submitLead} className="mt-4 grid gap-3">
                  <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />
                  <input
                    name="name"
                    required
                    maxLength={120}
                    autoComplete="name"
                    placeholder="Ваше имя"
                    className="rounded-2xl border border-cyan-200/15 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-cyan-200/50"
                  />
                  <input
                    name="contact"
                    required
                    maxLength={200}
                    autoComplete="tel"
                    placeholder="Telegram, e-mail или телефон"
                    className="rounded-2xl border border-cyan-200/15 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-cyan-200/50"
                  />
                  <textarea
                    name="task"
                    required
                    rows={4}
                    maxLength={2000}
                    defaultValue={leadTask}
                    placeholder="Что хотите автоматизировать?"
                    className="resize-none rounded-2xl border border-cyan-200/15 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-cyan-200/50"
                  />
                  <input type="hidden" name="channel" value="Telegram" />
                  <label className="flex items-start gap-2 text-xs leading-5 text-slate-400">
                    <input name="consent" required type="checkbox" className="mt-1" />
                    Согласен на обработку данных для обратной связи.
                  </label>
                  <button
                    type="submit"
                    disabled={leadStatus === "loading"}
                    className="neon-button rounded-full bg-cyan-300 px-4 py-3 text-sm font-bold text-slate-950 disabled:opacity-60"
                  >
                    {leadStatus === "loading" ? "Отправляю…" : "Отправить заявку"}
                  </button>
                  {leadMessage && (
                    <p className={`text-sm ${leadStatus === "success" ? "text-emerald-200" : "text-rose-200"}`}>
                      {leadMessage}
                    </p>
                  )}
                </form>
              </div>
            )}
          </motion.section>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openWidget())}
        className="neon-button fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-300 text-slate-950 shadow-[0_0_28px_rgba(103,246,255,0.45)] transition hover:-translate-y-0.5 hover:bg-cyan-200"
        aria-expanded={open}
        aria-label={open ? "Свернуть чат" : "Открыть чат с Аркадием"}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}
