import { Bot, Brain, Code2, DatabaseZap, Network, Workflow } from "lucide-react";
import { Reveal } from "./Reveal";

const solutions = [
  {
    title: "AI-агент для заявок",
    text: "Квалифицирует обращения, задает уточняющие вопросы и готовит заявку для менеджера.",
    icon: Bot
  },
  {
    title: "Автоматизация задач и CRM",
    text: "Связывает заявки, напоминания, статусы и ответственных в единую управляемую цепочку.",
    icon: Workflow
  },
  {
    title: "RivalScope-анализ конкурентов",
    text: "Сравнивает сайты, тексты и позиционирование, чтобы находить слабые места и точки роста.",
    icon: Brain
  },
  {
    title: "AI-контент для маркетплейсов",
    text: "Помогает готовить карточки товаров, описания и визуальные идеи для Ozon и Wildberries.",
    icon: Code2
  },
  {
    title: "n8n-интеграции",
    text: "Соединяет Telegram, VK, таблицы, CRM, API и AI-модели без лишней ручной работы.",
    icon: Network
  },
  {
    title: "Аналитика и отчеты",
    text: "Собирает данные из разных источников и превращает их в понятные решения для бизнеса.",
    icon: DatabaseZap
  }
];

export function Solutions() {
  return (
    <section id="solutions" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-sm uppercase tracking-[0.32em] text-cyan-200">Solutions</p>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Что можно автоматизировать уже сейчас</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Начинаем не с “внедрить AI ради AI”, а с конкретного процесса: где теряется время, заявки, деньги или
            управляемость.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;

            return (
              <Reveal key={solution.title} delay={index * 0.06} className="glass-panel rounded-[1.75rem] p-6">
                <div className="flex items-start gap-5">
                  <div className="rounded-2xl border border-cyan-200/20 bg-cyan-200/5 p-3 text-cyan-100">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{solution.title}</h3>
                    <p className="mt-3 leading-7 text-slate-300">{solution.text}</p>
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
