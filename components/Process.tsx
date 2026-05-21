import { Reveal } from "./Reveal";

const steps = [
  {
    title: "Диагностика",
    text: "Разбираем процесс, роли, сервисы и точки, где ручная работа мешает росту."
  },
  {
    title: "Сценарий",
    text: "Формулируем, что должен делать AI-агент или автоматизация, какие данные нужны и где результат."
  },
  {
    title: "Прототип",
    text: "Собираем минимальную рабочую версию, чтобы быстро проверить пользу без большого бюджета."
  },
  {
    title: "Интеграция",
    text: "Подключаем API, n8n, CRM, таблицы, ботов и каналы коммуникации."
  },
  {
    title: "Сопровождение",
    text: "Тестируем сценарии, улучшаем промпты, добавляем новые ветки и контролируем стабильность."
  }
];

export function Process() {
  return (
    <section id="process" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-sm uppercase tracking-[0.32em] text-cyan-200">Workflow</p>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Как проходит внедрение</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Прозрачный путь от идеи до работающего сценария: без обещаний “магии”, с проверкой пользы на каждом шаге.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.08} className="glass-panel rounded-[1.5rem] p-5">
              <div className="font-mono text-sm text-cyan-200">0{index + 1}</div>
              <h3 className="mt-4 text-xl font-bold text-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
