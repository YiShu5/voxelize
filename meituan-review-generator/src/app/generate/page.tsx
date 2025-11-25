'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

// ========================================
// 配置选项
const CATEGORY_OPTIONS = ['冰洗', '空调', '电视', '厨卫', '个护', '3C'];
const STYLE_OPTIONS = ['真实自然型', '服务夸赞型', '高能好评型', '人情温度型', '理性分析型', '家庭使用场景型'];

// 类别图标映射
const CATEGORY_ICONS = {
  冰洗: '❄️',
  空调: '🌡️',
  电视: '📺',
  厨卫: '🍳',
  个护: '🧴',
  '3C': '📱',
};

// 风格图标映射
const STYLE_ICONS = {
  真实自然型: '🌱',
  服务夸赞型: '⭐',
  高能好评型: '🔥',
  人情温度型: '💛',
  理性分析型: '📊',
  家庭使用场景型: '🏠',
};


export default function Generate() {
  // 状态管理
  const [productCategory, setProductCategory] = useState<string>('');
  const [reviewStyle, setReviewStyle] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [generatedReview, setGeneratedReview] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 结果引用
  const resultRef = useRef<HTMLDivElement>(null);

  // 生成评价
  const generateReview = async () => {
    if (!productCategory || !reviewStyle) {
      alert('请选择商品类别和评价风格');
      return;
    }

    setErrorMessage('');
    setGeneratedReview('');
    setShowResult(false);
    setIsGenerating(true);

    try {
      const trimmedProductName = productName.trim();

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({
          category: productCategory,
          style: reviewStyle,
          productName: trimmedProductName || undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || '评价生成服务暂时不可用，请稍后重试');
      }

      const data = await response.json();
      setGeneratedReview(data.content);
      setShowResult(true);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } catch (error) {
      console.error('生成失败:', error);
      const message = error instanceof Error ? error.message : '生成失败，请稍后重试';
      setErrorMessage(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedReview);
      alert('评价内容已复制到剪贴板！');
    } catch (err) {
      console.error('复制失败:', err);
      const textArea = document.createElement('textarea');
      textArea.value = generatedReview;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert('评价内容已复制到剪贴板！');
      } catch {
        alert('复制失败，请手动复制');
      }
      document.body.removeChild(textArea);
    }
  };

  const regenerateReview = () => {
    generateReview();
  };

  const saveReview = () => {
    try {
      const reviewData = {
        category: productCategory,
        style: reviewStyle,
        productName: productName || '',
        review: generatedReview,
        createdAt: new Date().toISOString(),
      };
      const blob = new Blob([JSON.stringify(reviewData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `评价_${productCategory}_${new Date().getTime()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      alert('评价已保存！');
    } catch (err) {
      console.error('保存失败:', err);
      alert('保存失败，请稍后重试');
    }
  };

  // 页面渲染
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-indigo-50/50">
      {/* Navigation Header - 使用全局 AppHeader */}

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#31D9FF]/10 to-[#9B5CF6]/10 border border-[#31D9FF]/20 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
              <svg className="w-4 h-4 text-[#31D9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI 驱动的智能评价生成工具
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-[#31D9FF] via-[#6A8FFF] to-[#9B5CF6] bg-clip-text text-transparent">
                生成美团评价
              </span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              只需几秒钟，AI 就能为您生成高质量、美团规范的商品评价
            </p>
          </div>

          {/* 配置信息卡片 */}
          <div className="card overflow-hidden mb-6 sm:mb-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-[#31D9FF] via-[#6A8FFF] to-[#9B5CF6] p-6 sm:p-8 flex items-center gap-4">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl sm:text-2xl flex-shrink-0">⚙️</div>
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1">旗舰级评价配置</h2>
                <p className="text-white/90 text-xs sm:text-sm">分步骤完成配置，体验更轻盈的操作流程</p>
              </div>
            </div>

            <div className="p-8 space-y-6">
              {/* 商品类别选择 */}
              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-slate-50/60 p-6 shadow-sm hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl">📦</div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.3em] text-indigo-400 uppercase">Step 01</p>
                    <label className="text-lg font-semibold text-slate-900">
                      商品类别 <span className="text-red-500">*</span>
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {CATEGORY_OPTIONS.map((option) => (
                    <button
                      key={option}
                      onClick={() => setProductCategory(option)}
                      className={`option-card ${productCategory === option ? 'option-card-active' : ''}`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-2xl">
                          {CATEGORY_ICONS[option as keyof typeof CATEGORY_ICONS]}
                        </span>
                        <span className="text-sm font-medium">
                          {option}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 评价风格选择 */}
              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-slate-50/60 p-6 shadow-sm hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl">✨</div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.3em] text-purple-400 uppercase">Step 02</p>
                    <label className="text-lg font-semibold text-slate-900">
                      评价风格 <span className="text-red-500">*</span>
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {STYLE_OPTIONS.map((option) => (
                    <button
                      key={option}
                      onClick={() => setReviewStyle(option)}
                      className={`option-card ${reviewStyle === option ? (option === '人情温度型' ? 'option-card-warm-active' : 'option-card-active') : ''}`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-2xl">
                          {STYLE_ICONS[option as keyof typeof STYLE_ICONS]}
                        </span>
                        <span className="text-sm font-medium leading-tight">
                          {option}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 商品名称输入 */}
              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-slate-50/60 p-6 shadow-sm hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">📝</div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.3em] text-emerald-400 uppercase">Step 03</p>
                    <label htmlFor="productName" className="text-lg font-semibold text-slate-900">
                      商品名称（可选）
                    </label>
                  </div>
                </div>
                <input
                  type="text"
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="例如：iPhone 15、美的冰箱、海飞丝洗发水..."
                  className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300 text-gray-700 placeholder-gray-400 text-base shadow-sm hover:shadow-md"
                />
              </div>

              {/* 生成按钮 */}
              <div className="pt-4">
                <button
                  onClick={generateReview}
                  disabled={isGenerating || !productCategory || !reviewStyle}
                  className="btn-primary w-full py-4 sm:py-5 px-6 sm:px-8 text-base sm:text-lg lg:text-xl font-semibold"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>AI 正在生成评价...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>生成评价</span>
                    </div>
                  )}
                </button>
                {errorMessage && (
                  <div className="mt-4 rounded-xl sm:rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 生成结果 - 独立卡片，居中展示 */}
          {generatedReview && (
            <div
              ref={resultRef}
              className={`bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-[0_30px_90px_rgba(15,23,42,0.12)] overflow-hidden mb-6 mx-auto max-w-3xl px-4 sm:px-0 ${showResult ? 'animate-in fade-in slide-in-from-bottom-8' : 'opacity-0 translate-y-8'}`}
            >
              {/* 顶部标题区域 - 渐变背景 */}
              <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 p-6 sm:p-8 flex items-center gap-3 sm:gap-4">
                <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-1 truncate">评价生成完成</h2>
                  <p className="text-green-100/90 text-xs sm:text-sm truncate">AI 已为您生成高质量评价内容</p>
                </div>
              </div>

              {/* 内容区域 */}
              <div className="p-4 sm:p-6 lg:p-8">
                {/* 商品信息层级 - 带图标，移动端自适应 */}
                <div className="mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-4">
                    {/* 商品类别 */}
                    <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-50 rounded-lg sm:rounded-xl border border-indigo-100 flex-shrink-0">
                      <span className="text-base sm:text-lg">{CATEGORY_ICONS[productCategory as keyof typeof CATEGORY_ICONS]}</span>
                      <span className="text-xs sm:text-sm font-medium text-indigo-700 whitespace-nowrap">商品类别</span>
                      <span className="text-xs sm:text-sm font-semibold text-indigo-900 truncate max-w-[80px] sm:max-w-none">{productCategory}</span>
                    </div>

                    {/* 评价风格 */}
                    <div className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border flex-shrink-0 ${
                      reviewStyle === '人情温度型' 
                        ? 'bg-orange-50 border-orange-200' 
                        : 'bg-purple-50 border-purple-100'
                    }`}>
                      <span className="text-base sm:text-lg">{STYLE_ICONS[reviewStyle as keyof typeof STYLE_ICONS]}</span>
                      <span className={`text-xs sm:text-sm font-medium whitespace-nowrap ${
                        reviewStyle === '人情温度型' 
                          ? 'text-orange-700' 
                          : 'text-purple-700'
                      }`}>评价风格</span>
                      <span className={`text-xs sm:text-sm font-semibold truncate max-w-[80px] sm:max-w-none ${
                        reviewStyle === '人情温度型' 
                          ? 'text-orange-900' 
                          : 'text-purple-900'
                      }`}>{reviewStyle}</span>
                    </div>

                    {/* 商品名称（如果有） */}
                    {productName && (
                      <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-emerald-50 rounded-lg sm:rounded-xl border border-emerald-100 flex-shrink-0">
                        <span className="text-base sm:text-lg">📝</span>
                        <span className="text-xs sm:text-sm font-medium text-emerald-700 whitespace-nowrap">商品名称</span>
                        <span className="text-xs sm:text-sm font-semibold text-emerald-900 truncate max-w-[80px] sm:max-w-none">{productName}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 评价正文区域 */}
                <div className="mb-4 sm:mb-6">
                  <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100">
                    <div className="text-gray-800 text-sm sm:text-base leading-relaxed whitespace-pre-wrap word-break break-words">
                      {generatedReview}
                    </div>
                  </div>
                </div>

                {/* 操作按钮组 - 三个按钮，移动端自适应 */}
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  {/* 复制按钮 */}
                  <button
                    onClick={copyToClipboard}
                    className="result-action-button group inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex-1 sm:flex-none"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span>复制</span>
                  </button>

                  {/* 重新生成按钮 */}
                  <button
                    onClick={regenerateReview}
                    disabled={isGenerating}
                    className="result-action-button group inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex-1 sm:flex-none"
                  >
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>生成中...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span>重新生成</span>
                      </>
                    )}
                  </button>

                  {/* 保存按钮 */}
                  <button
                    onClick={saveReview}
                    className="result-action-button group inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex-1 sm:flex-none"
                  >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    <span>保存</span>
                  </button>
                </div>

                {/* 技术支持信息 */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="text-[12px] sm:text-[13px] text-gray-400 text-center">
                    技术支持：黄超（豆芽号 25090825）
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Loading Skeleton */}
          {isGenerating && !generatedReview && (
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="h-5 bg-white/20 rounded w-32 animate-pulse"></div>
                </div>
              </div>
              <div className="p-8">
                <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl p-8 border border-gray-200">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-gray-300 rounded-2xl animate-pulse"></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-6 bg-gray-300 rounded w-28 animate-pulse"></div>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-5 h-5 bg-yellow-200 rounded animate-pulse"></div>
                          ))}
                        </div>
                        <div className="h-5 bg-gray-300 rounded w-24 animate-pulse"></div>
                      </div>
                      <div className="space-y-3 mb-6">
                        <div className="h-5 bg-gray-300 rounded w-full animate-pulse"></div>
                        <div className="h-5 bg-gray-300 rounded w-4/5 animate-pulse"></div>
                        <div className="h-5 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                        <div className="h-5 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                      </div>
                      <div className="h-12 bg-gray-300 rounded-2xl w-36 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 返回首页 */}
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-300 rounded-2xl text-base font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>返回首页</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
