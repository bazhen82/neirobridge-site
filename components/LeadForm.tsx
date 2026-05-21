"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

type SubmitState = "idle" | "loading" | "success" | "error";

export function LeadForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [channel, setChannel] = useState("Telegram");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setState("loading");
    setMessage("");

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Не удалось отправить заявку");
      }

      form.reset();
      setChannel("Telegram");
      setState("success");
      setMessage("Заявка отправлена. Я свяжусь с вами после изучения задачи.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Не удалось отправить заявку");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input className="hidden" name="website" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-slate-300">
          Ваше имя
          <input
            name="name"
            required
            className="rounded-2xl border border-cyan-200/15 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-200/60"
            placeholder="Максим"
          />
        </label>
        <label className="grid gap-2 text-sm text-slate-300">
          Компания или проект
          <input
            name="company"
            className="rounded-2xl border border-cyan-200/15 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-200/60"
            placeholder="Название или сфера"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm text-slate-300">
        Контакт для ответа
        <input
          name="contact"
          required
          className="rounded-2xl border border-cyan-200/15 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-200/60"
          placeholder="Telegram, e-mail или телефон"
        />
      </label>

      <label className="grid gap-2 text-sm text-slate-300">
        Что хотите автоматизировать?
        <textarea
          name="task"
          required
          rows={5}
          className="resize-none rounded-2xl border border-cyan-200/15 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-200/60"
          placeholder="Опишите процесс, рутину или идею AI-агента"
        />
      </label>

      <label className="grid gap-2 text-sm text-slate-300">
        Удобный канал связи
        <input type="hidden" name="channel" value={channel} />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {["Telegram", "E-mail", "Телефон", "MAX"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setChannel(option)}
              className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                channel === option
                  ? "border-cyan-200/60 bg-cyan-300 text-slate-950 shadow-[0_0_22px_rgba(103,246,255,0.28)]"
                  : "border-cyan-200/15 bg-black/30 text-slate-300 hover:border-cyan-200/40 hover:bg-cyan-200/10"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </label>

      <label className="flex items-start gap-3 text-sm leading-6 text-slate-400">
        <input name="consent" required type="checkbox" className="mt-1 h-4 w-4 rounded border-cyan-200/30" />
        <span>Согласен отправить данные для обработки заявки и обратной связи по проекту.</span>
      </label>

      <button
        type="submit"
        disabled={state === "loading"}
        className="neon-button inline-flex items-center justify-center gap-3 rounded-full bg-cyan-300 px-7 py-4 font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-5 w-5" />
        {state === "loading" ? "Отправляю..." : "Получить бесплатную диагностику"}
      </button>

      {message && (
        <p className={`text-sm leading-6 ${state === "success" ? "text-emerald-200" : "text-rose-200"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
