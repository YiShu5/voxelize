import type { Metadata } from "next";
import "./globals.css";
import AppHeader from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "美评宝 ReviewX - AI 智能评价生成工具",
  description: "美评宝 ReviewX - 基于 AI 技术的智能评价生成工具，快速生成高质量、符合规范的商品评价。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#0C1222" />
      </head>
      <body className="bg-slate-50 text-slate-900 font-sans antialiased">
        <AppHeader />
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
