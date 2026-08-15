import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ChatWidget } from "@/components/ChatWidget";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"]
});

export const viewport: Viewport = {
  themeColor: "#02070b"
};

export const metadata: Metadata = {
  metadataBase: new URL("https://neirobridge.ru"),
  title: "NeiroBridge — мост между нейросетями и бизнесом",
  description:
    "NeiroBridge помогает бизнесу быстрее обрабатывать заявки, отвечать клиентам и убирать рутину с помощью AI-агентов и автоматизации.",
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png"
  },
  openGraph: {
    title: "NeiroBridge — мост между нейросетями и бизнесом",
    description: "AI-агенты и автоматизация для заявок, поддержки и процессов малого и среднего бизнеса.",
    url: "https://neirobridge.ru",
    siteName: "NeiroBridge",
    images: [
      {
        url: "/og-neirobridge.jpg",
        width: 1200,
        height: 630,
        alt: "NeiroBridge"
      }
    ],
    locale: "ru_RU",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "NeiroBridge — мост между нейросетями и бизнесом",
    description: "AI-агенты и автоматизация для заявок, поддержки и процессов малого и среднего бизнеса.",
    images: ["/og-neirobridge.jpg"]
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
        <ChatWidget />
      </body>
    </html>
  );
}
