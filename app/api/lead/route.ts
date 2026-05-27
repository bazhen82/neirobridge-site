import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type LeadPayload = {
  name?: string;
  company?: string;
  contact?: string;
  task?: string;
  channel?: string;
  consent?: string;
  website?: string;
  source?: string;
  chatContext?: string;
};

function sanitize(value: unknown, max = 2000) {
  return String(value ?? "")
    .trim()
    .slice(0, max);
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
    const source = sanitize(body.source, 100) || "site-form";
    const chatContext = sanitize(body.chatContext, 3000);

    if (!name || !contact || !task || !consent) {
      return NextResponse.json({ message: "Заполните имя, контакт, задачу и согласие" }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT ?? 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpFrom = process.env.SMTP_FROM;
    const leadToEmail = process.env.LEAD_TO_EMAIL;

    if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom || !leadToEmail) {
      return NextResponse.json({ message: "Форма пока не настроена на сервере" }, { status: 503 });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    await transporter.sendMail({
      from: smtpFrom,
      to: leadToEmail,
      subject: `NeiroBridge заявка (${source}): ${name}`,
      replyTo: isEmail(contact) ? contact : undefined,
      text: [
        "Новая заявка с сайта NeiroBridge",
        "",
        `Источник: ${source}`,
        `Имя: ${name}`,
        `Компания/проект: ${company || "Не указано"}`,
        `Контакт: ${contact}`,
        `Удобный канал: ${channel || "Не указан"}`,
        "",
        "Задача:",
        task,
        chatContext ? "" : undefined,
        chatContext ? "Контекст чата:" : undefined,
        chatContext || undefined
      ]
        .filter(Boolean)
        .join("\n")
    });

    return NextResponse.json({ message: "Заявка отправлена" });
  } catch {
    return NextResponse.json({ message: "Не удалось обработать заявку" }, { status: 500 });
  }
}
