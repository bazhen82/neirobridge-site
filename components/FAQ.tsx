import { Reveal } from "./Reveal";

const questions = [
  {
    question: "С чего лучше начать?",
    answer: "С одного процесса: заявки, поддержка, задачи, отчеты, контент или аналитика. Так быстрее проверить пользу."
  },
  {
    question: "Сколько занимает первый прототип?",
    answer: "Обычно от нескольких дней до пары недель. Срок зависит от количества сервисов, данных и веток сценария."
  },
  {
    question: "Можно ли подключить мои текущие сервисы?",
    answer: "Да. Чаще всего подключаются CRM, таблицы, Telegram, VK, почта, n8n, API, базы знаний и AI-модели."
  },
  {
    question: "AI заменит сотрудников?",
    answer: "Нет. Цель — убрать рутину и подготовить данные, чтобы команда быстрее отвечала, продавала и принимала решения."
  },
  {
    question: "Что происходит после заявки?",
    answer: "Я изучаю задачу, уточняю контекст и предлагаю первый сценарий автоматизации с понятным следующим шагом."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <Reveal>
          <p className="font-mono text-sm uppercase tracking-[0.32em] text-cyan-200">FAQ</p>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Коротко о внедрении AI</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Ответы на вопросы, которые обычно появляются перед первой автоматизацией.
          </p>
        </Reveal>

        <div className="grid gap-4">
          {questions.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.06} className="glass-panel rounded-[1.5rem] p-6">
              <h3 className="text-lg font-bold text-white">{item.question}</h3>
              <p className="mt-3 leading-7 text-slate-300">{item.answer}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
