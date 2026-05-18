import { BrainCircuit, Cable, Workflow } from "lucide-react";
import { Reveal } from "./Reveal";

const focusAreas = [
  {
    icon: BrainCircuit,
    title: "AI-агенты",
    text: "Проектирование ассистентов, которые отвечают клиентам, анализируют заявки и готовят следующие действия."
  },
  {
    icon: Workflow,
    title: "Автоматизация",
    text: "Связка Telegram, CRM, таблиц, n8n, GigaChat и внутренних процессов в устойчивые сценарии."
  },
  {
    icon: Cable,
    title: "Интеграции",
    text: "Быстрое соединение API, ботов, таск-трекеров и бизнес-инструментов без лишней ручной работы."
  }
];

export function About() {
  return (
    <section id="about" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="glass-panel rounded-[2rem] p-8 sm:p-10">
          <p className="font-mono text-sm uppercase tracking-[0.32em] text-cyan-200">About</p>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Мост между задачей и AI-решением</h2>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            NeiroBridge помогает бизнесу внедрять автоматизацию без хаоса: от идеи и прототипа до работающего
            сценария, который экономит время, уменьшает ошибки и создает управляемую цифровую инфраструктуру.
          </p>
        </Reveal>
        <div className="grid gap-5">
          {focusAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <Reveal key={area.title} delay={index * 0.1} className="glass-panel rounded-[1.75rem] p-6">
                <div className="flex gap-5">
                  <div className="h-fit rounded-2xl border border-cyan-200/20 bg-cyan-200/5 p-3 text-cyan-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{area.title}</h3>
                    <p className="mt-2 leading-7 text-slate-300">{area.text}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
