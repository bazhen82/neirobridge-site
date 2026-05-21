import { MessageCircle, RadioTower } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contacts" className="px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-cyan-200/25 bg-cyan-200/10 p-1 shadow-[0_0_80px_rgba(103,246,255,0.14)]">
        <div className="relative rounded-[1.8rem] bg-[#031018]/95 p-8 sm:p-12">
          <div className="absolute right-8 top-8 hidden text-cyan-200/20 sm:block">
            <RadioTower className="h-28 w-28" />
          </div>
          <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.32em] text-cyan-200">Contact</p>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">
                Получите бесплатную диагностику процесса
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Опишите задачу, а я посмотрю, где можно убрать ручную работу, какие сервисы подключить и с чего
                безопаснее начать внедрение AI-агента или n8n-сценария.
              </p>
              <a
                href="https://t.me/bazhen82"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-3 rounded-full border border-cyan-200/30 px-5 py-3 font-semibold text-cyan-100 transition hover:-translate-y-1 hover:bg-cyan-200/10"
              >
                <MessageCircle className="h-5 w-5" />
                Telegram: @bazhen82
              </a>
              <p className="mt-4 text-sm leading-6 text-slate-500">
                Почта и телефон не публикуются на сайте. Контакт для ответа вы указываете только в заявке.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-cyan-200/15 bg-black/20 p-5 sm:p-6">
              <LeadForm />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
