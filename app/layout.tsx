import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://neirobridge.ru"),
  title: "NeiroBridge — Интеллектуальные решения для бизнеса",
  description:
    "Портфолио NeuroBridge: автоматизация бизнес-процессов, AI-агенты, n8n-интеграции и интеллектуальные решения.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png"
  },
  openGraph: {
    title: "NeiroBridge — Интеллектуальные решения для бизнеса",
    description: "Автоматизация, AI-агенты и интеграции для роста бизнеса.",
    url: "https://neirobridge.ru",
    siteName: "NeiroBridge",
    images: [
      {
        url: "/og-neirobridge.png",
        width: 1200,
        height: 630,
        alt: "NeiroBridge"
      }
    ],
    locale: "ru_RU",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
