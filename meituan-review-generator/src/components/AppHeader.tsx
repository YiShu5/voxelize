"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function AppHeader() {
  const pathname = usePathname();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openContactModal = () => {
    setIsContactOpen(true);
  };

  const closeContactModal = () => {
    setIsContactOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeContactModal();
    }
  };

  // ESC 键关闭弹窗
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isContactOpen) {
        setIsContactOpen(false);
      }
    };

    if (isContactOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isContactOpen]);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path === "demo") {
      return pathname === "/demo";
    }
    return false;
  };

  // 统一的导航按钮样式类 - 完全一致的渐变胶囊风格
  const navButtonBase = "px-5 py-2 rounded-[22px] text-sm font-medium transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-[#31D9FF] to-[#9B5CFF] text-white shadow-[0_0_12px_rgba(49,217,255,0.4)] hover:shadow-[0_0_16px_rgba(49,217,255,0.6)] hover:brightness-110";
  const navButtonActive = "brightness-110 shadow-[0_0_16px_rgba(49,217,255,0.6)]";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5"
      style={{ 
        background: "rgba(12,18,34,0.85)", 
        backdropFilter: "blur(16px)",
        height: "68px"
      }}
    >
      <div className="mx-auto max-w-7xl h-full flex items-center justify-between px-6">
        {/* 左侧 Logo 和品牌标题 */}
        <Link 
          href="/" 
          className="flex items-center gap-3 group"
        >
          {/* Logo 图标 */}
          <div className="flex-shrink-0">
            <Image
              src="/logo-icon.svg"
              alt="美评宝 ReviewX"
              width={40}
              height={40}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* 品牌文字 */}
          <div className="flex flex-col">
            <span 
              className="text-base font-bold text-white leading-tight"
              style={{ 
                letterSpacing: "0.02em",
                background: "linear-gradient(135deg, #31D9FF, #9B5CFF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              美评宝
            </span>
            <span 
              className="text-xs font-medium leading-tight"
              style={{ 
                letterSpacing: "0.05em",
                color: "rgba(255,255,255,0.6)"
              }}
            >
              ReviewX
            </span>
          </div>
        </Link>

        {/* 右侧导航 - 统一渐变按钮样式 */}
        <nav className="hidden md:flex items-center gap-3">
          {/* 首页按钮 */}
          <Link 
            href="/" 
            className={`nav-button ${navButtonBase} ${isActive("/") ? navButtonActive : ""}`}
          >
            首页
          </Link>

          {/* 功能介绍按钮 */}
          <Link 
            href="/demo" 
            className={`nav-button ${navButtonBase} ${isActive("demo") ? navButtonActive : ""}`}
          >
            功能介绍
          </Link>

          {/* 联系我们按钮 */}
          <button
            type="button"
            onClick={openContactModal}
            className={`nav-button ${navButtonBase}`}
          >
            联系我们
          </button>
        </nav>

        {/* 移动端菜单 */}
        <details className="md:hidden relative">
          <summary className="cursor-pointer text-sm font-medium text-[rgba(255,255,255,0.7)] hover:text-white transition-colors list-none">
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </summary>
          <div className="absolute right-0 top-full mt-2 flex flex-col rounded-xl border border-white/10 bg-[rgba(12,18,34,0.95)] backdrop-blur-xl p-3 text-sm shadow-xl min-w-[180px] gap-2">
            <Link 
              href="/" 
              className={`nav-button px-4 py-2 rounded-[22px] text-sm font-medium transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-[#31D9FF] to-[#9B5CFF] text-white shadow-[0_0_12px_rgba(49,217,255,0.4)] hover:shadow-[0_0_16px_rgba(49,217,255,0.6)] hover:brightness-110 ${isActive("/") ? "brightness-110 shadow-[0_0_16px_rgba(49,217,255,0.6)]" : ""}`}
            >
              首页
            </Link>
            <Link
              href="/demo"
              className={`nav-button px-4 py-2 rounded-[22px] text-sm font-medium transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-[#31D9FF] to-[#9B5CFF] text-white shadow-[0_0_12px_rgba(49,217,255,0.4)] hover:shadow-[0_0_16px_rgba(49,217,255,0.6)] hover:brightness-110 ${isActive("demo") ? "brightness-110 shadow-[0_0_16px_rgba(49,217,255,0.6)]" : ""}`}
            >
              功能介绍
            </Link>
            <button
              type="button"
              onClick={(event) => {
                event.preventDefault();
                openContactModal();
              }}
              className="nav-button px-4 py-2 rounded-[22px] text-sm font-medium transition-all duration-300 relative overflow-hidden bg-gradient-to-r from-[#31D9FF] to-[#9B5CFF] text-white shadow-[0_0_12px_rgba(49,217,255,0.4)] hover:shadow-[0_0_16px_rgba(49,217,255,0.6)] hover:brightness-110"
            >
              联系我们
            </button>
          </div>
        </details>
      </div>

      {/* 联系弹窗 Modal - 使用 Portal 渲染到 body */}
      {mounted && isContactOpen && createPortal(
        <>
          {/* 遮罩（固定，不滚动） */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={handleBackdropClick}
          />

          {/* 弹窗本体（固定在屏幕中央，背景可滚动） */}
          <div
            className="fixed top-1/2 left-1/2 bg-[#0f1b2a] rounded-2xl p-10 shadow-2xl max-w-md w-[90%] border border-white/10 z-[9999]"
            style={{
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* 关闭按钮 - 更明显 */}
            <button
              type="button"
              onClick={closeContactModal}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-full text-2xl leading-none transition-all duration-200 font-bold"
              aria-label="关闭"
            >
              ×
            </button>

            {/* 弹窗内容 */}
            <div className="text-center">
              <h2 className="text-3xl text-white/90 text-center mb-6 font-bold">
                联系豆芽（黄超）
              </h2>
              
              <p className="text-white/80 text-center text-lg mb-6 leading-relaxed">
                如需开通或咨询，请添加下方豆芽：
              </p>

              {/* 豆芽号显示 */}
              <div>
                <p className="text-white/80 text-center text-sm mb-2">豆芽号：</p>
                <p className="text-center text-4xl font-bold text-cyan-300 drop-shadow-[0_0_20px_rgba(103,232,249,0.5)] tracking-wider">
                  25090825
                </p>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </header>
  );
}


