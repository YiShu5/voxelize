"use client";

import Image from "next/image";
import Link from "next/link";

export default function AppHeader() {
  const scrollToFeatures = () => {
    const section = document.getElementById("features-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10"
      style={{ background: "rgba(12,18,34,0.85)", backdropFilter: "blur(12px)" }}
    >
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#4C6EF5] to-[#8B5CF6] flex items-center justify-center shadow-lg">
            <Image
              src="/logo.svg"
              alt="苏宁易购 · 美团智能评价系统"
              width={28}
              height={28}
              className="h-7 w-auto"
            />
          </div>
          <span className="text-lg font-semibold text-white tracking-wide">
            苏宁易购 · 美团智能评价系统
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
          <Link href="/" className="hover:text-white transition">
            首页
          </Link>
          <button
            type="button"
            onClick={scrollToFeatures}
            className="hover:text-white transition bg-transparent border-none outline-none cursor-pointer p-0 text-slate-200"
          >
            功能介绍
          </button>
          <a href="#contact" className="hover:text-white transition">
            联系我们
          </a>
        </nav>
        <details className="md:hidden">
          <summary className="cursor-pointer text-sm font-medium text-slate-200">
            菜单
          </summary>
          <div className="mt-2 flex flex-col rounded-xl border border-white/20 bg-[#151B2B] p-3 text-sm shadow-lg">
            <Link href="/" className="py-1">
              首页
            </Link>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                scrollToFeatures();
              }}
              className="py-1 text-left bg-transparent border-none outline-none cursor-pointer"
            >
              功能介绍
            </button>
            <a href="#contact" className="py-1">
              联系我们
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}

