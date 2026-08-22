import { pageFaqs } from "@/lib/faqs";
import { Reveal } from "./Reveal";

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <Reveal>
          <p className="font-mono text-sm uppercase tracking-[0.32em] text-cyan-200">FAQ</p>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">Коротко о внедрении AI</h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Ответы на вопросы, которые обычно появляются перед первой автоматизацией.
          </p>
        </Reveal>

        <div className="grid gap-4">
          {pageFaqs.map((item, index) => (
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
