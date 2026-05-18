import { Mail, MessageCircle, Phone, RadioTower, Smartphone } from "lucide-react";
import { Reveal } from "./Reveal";

const contacts = [
  {
    label: "E-mail",
    value: "bazhenov.maxim@gmail.com",
    href: "mailto:bazhenov.maxim@gmail.com?subject=Запрос%20для%20NeiroBridge",
    icon: Mail,
    note: "Лучший канал для деловых запросов, ТЗ и материалов."
  },
  {
    label: "Телефон",
    value: "+7 967 918-25-61",
    href: "tel:+79679182561",
    icon: Phone,
    note: "Подходит для срочных вопросов и первичного звонка."
  },
  {
    label: "MAX",
    value: "Поиск по номеру телефона",
    href: "tel:+79679182561",
    icon: Smartphone,
    note: "Добавьте номер в контакты и найдите профиль в MAX через синхронизацию контактов."
  },
  {
    label: "Telegram",
    value: "@bazhen82",
    href: "https://t.me/bazhen82",
    icon: MessageCircle,
    note: "Дополнительный канал, если Telegram открывается у клиента."
  }
];

export function Contact() {
  return (
    <section id="contacts" className="px-4 py-24 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-cyan-200/25 bg-cyan-200/10 p-1 shadow-[0_0_80px_rgba(103,246,255,0.14)]">
        <div className="relative rounded-[1.8rem] bg-[#031018]/95 p-8 sm:p-12">
          <div className="absolute right-8 top-8 hidden text-cyan-200/20 sm:block">
            <RadioTower className="h-28 w-28" />
          </div>
          <div className="relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-sm uppercase tracking-[0.32em] text-cyan-200">Contact</p>
              <h2 className="mt-4 text-3xl font-black text-white sm:text-5xl">
                Обсудим, где AI уже может экономить ваше время
              </h2>
              <p className="mt-6 text-lg leading-8 text-slate-300">
                Выберите удобный канал связи. Для первого обращения лучше e-mail: так проще приложить задачу,
                ссылки и контекст для оценки автоматизации.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {contacts.map((contact) => {
                const Icon = contact.icon;
                const isExternal = contact.href.startsWith("http");

                return (
                  <a
                    key={contact.label}
                    href={contact.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noreferrer" : undefined}
                    className="group rounded-[1.5rem] border border-cyan-200/15 bg-black/20 p-5 transition hover:-translate-y-1 hover:border-cyan-200/40 hover:bg-cyan-200/10"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="rounded-2xl border border-cyan-200/20 bg-cyan-200/5 p-3 text-cyan-100 transition group-hover:shadow-[0_0_26px_rgba(103,246,255,0.35)]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-200">
                        available
                      </span>
                    </div>
                    <div className="mt-5 text-sm uppercase tracking-[0.22em] text-cyan-200">{contact.label}</div>
                    <div className="mt-2 break-words text-base font-bold leading-snug text-white xl:text-lg">
                      {contact.value}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{contact.note}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
