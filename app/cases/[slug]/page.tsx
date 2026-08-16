import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, MessageCircle } from "lucide-react";
import { Background } from "@/components/Background";
import { getCaseBySlug } from "@/lib/cases";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return [{ slug: "deskmate" }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCaseBySlug(slug);
  if (!item) return { title: "Кейс — NeiroBridge" };

  return {
    title: `${item.title} — NeiroBridge`,
    description: item.summary,
    openGraph: {
      title: item.title,
      description: item.summary,
      url: `https://neirobridge.ru/cases/${item.slug}`,
      images:
        item.slug === "deskmate"
          ? [{ url: "/cases/deskmate-cover.jpg", width: 1600, height: 900, alt: item.title }]
          : undefined
    }
  };
}

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const item = getCaseBySlug(slug);

  if (!item || !item.detailPath) {
    notFound();
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Background />

      <div className="relative mx-auto max-w-4xl px-4 pb-24 pt-10 sm:px-6 lg:px-8">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-sm text-cyan-200/90 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к кейсам
        </Link>

        {item.slug === "deskmate" && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[1.75rem] border border-cyan-200/15">
            <Image
              src="/cases/deskmate-cover.jpg"
              alt="DeskMate — обложка кейса"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        )}

        <p className="mt-10 font-mono text-sm uppercase tracking-[0.32em] text-cyan-200">{item.eyebrow}</p>
        <h1 className="mt-4 text-3xl font-black text-white sm:text-5xl">{item.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">{item.summary}</p>

        {item.telegramUrl && (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={item.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="neon-button inline-flex items-center justify-center gap-3 rounded-full bg-cyan-300 px-7 py-4 font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-200"
            >
              <MessageCircle className="h-5 w-5" />
              Открыть бота {item.telegramLabel}
            </a>
            <a
              href={item.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-200/25 px-7 py-4 font-semibold text-cyan-100 transition hover:-translate-y-1 hover:bg-cyan-200/10"
            >
              Код на GitHub
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        )}

        {item.metrics.length > 0 && (
          <div className="mt-12 grid gap-3 sm:grid-cols-3">
            {item.metrics.map((metric) => (
              <div key={metric.label} className="glass-panel rounded-2xl p-4">
                <div className="font-mono text-sm text-cyan-200">{metric.label}</div>
                <div className="mt-2 text-lg font-bold text-white">{metric.value}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 grid gap-6">
          {[
            { title: "Задача", text: item.task },
            { title: "Решение", text: item.solution },
            { title: "Результат", text: item.result }
          ].map((block) => (
            <section key={block.title} className="glass-panel rounded-[1.75rem] p-6 sm:p-8">
              <h2 className="text-xl font-bold text-cyan-200">{block.title}</h2>
              <p className="mt-3 text-base leading-7 text-slate-300">{block.text}</p>
            </section>
          ))}
        </div>

        {item.highlights.length > 0 && (
          <section className="glass-panel mt-6 rounded-[1.75rem] p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white">Что внутри кейса</h2>
            <ul className="mt-4 space-y-3 text-slate-300">
              {item.highlights.map((line) => (
                <li key={line} className="flex gap-3 leading-7">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="mt-10 rounded-[1.75rem] border border-cyan-200/20 bg-cyan-300/10 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white">Попробовать вживую</h2>
          <p className="mt-3 max-w-2xl leading-7 text-slate-300">
            Бот развёрнут на сервере NeiroBridge. Напишите /start, переключитесь на /mode rag и задайте вопрос по
            услугам или диагностике. Команда /stats покажет метрики ответов и кэша.
          </p>
          {item.telegramUrl && (
            <a
              href={item.telegramUrl}
              target="_blank"
              rel="noreferrer"
              className="neon-button mt-6 inline-flex items-center gap-3 rounded-full bg-cyan-300 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-200"
            >
              <MessageCircle className="h-5 w-5" />
              Перейти в {item.telegramLabel}
            </a>
          )}
        </section>
      </div>
    </main>
  );
}
