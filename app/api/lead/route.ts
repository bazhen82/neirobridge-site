import { NextResponse } from "next/server";
import { Resend } from "resend";

type LeadPayload = {
  name?: string;
  company?: string;
  contact?: string;
  task?: string;
  channel?: string;
  consent?: string;
  website?: string;
};

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function sanitize(value: unknown) {
  return String(value ?? "")
    .trim()
    .slice(0, 2000);
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;

    if (body.website) {
      return NextResponse.json({ message: "Заявка отправлена" });
    }

    const name = sanitize(body.name);
    const company = sanitize(body.company);
    const contact = sanitize(body.contact);
    const task = sanitize(body.task);
    const channel = sanitize(body.channel);
    const consent = sanitize(body.consent);

    if (!name || !contact || !task || !consent) {
      return NextResponse.json({ message: "Заполните имя, контакт, задачу и согласие" }, { status: 400 });
    }

    if (!resend || !process.env.LEAD_TO_EMAIL || !process.env.LEAD_FROM_EMAIL) {
      return NextResponse.json({ message: "Форма пока не настроена на сервере" }, { status: 503 });
    }

    await resend.emails.send({
      from: process.env.LEAD_FROM_EMAIL,
      to: process.env.LEAD_TO_EMAIL,
      subject: `Новая заявка NeiroBridge: ${name}`,
      replyTo: isEmail(contact) ? contact : undefined,
      text: [
        "Новая заявка с сайта NeiroBridge",
        "",
        `Имя: ${name}`,
        `Компания/проект: ${company || "Не указано"}`,
        `Контакт: ${contact}`,
        `Удобный канал: ${channel || "Не указан"}`,
        "",
        "Задача:",
        task
      ].join("\n")
    });

    return NextResponse.json({ message: "Заявка отправлена" });
  } catch {
    return NextResponse.json({ message: "Не удалось обработать заявку" }, { status: 500 });
  }
}
