import type { Metadata } from "next";
import "./globals.css";
import AppHeader from "@/components/AppHeader";

export const metadata: Metadata = {
  title: "苏宁易购 · 美团智能评价系统",
  description: "企业级美团智能评价系统，为苏宁易购全国门店提供高质量评价生成能力。",
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
      <body className="bg-[#0C1222] text-white font-sans antialiased">
        <AppHeader />
        <div className="min-h-screen flex flex-col bg-[#0C1222]">
          <main className="flex-1 pt-24 pb-12 px-4 sm:px-6 lg:px-8">{children}</main>
          {/* Copyright will be provided separately by user */}
        </div>
      </body>
    </html>
  );
}
