import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-indigo-50/50">
      {/* Navigation Header - 使用全局 AppHeader */}

      {/* Hero Section */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#31D9FF]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#9B5CF6]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#31D9FF]/10 to-[#9B5CF6]/10 border border-[#31D9FF]/20 rounded-full text-sm font-medium text-slate-700 backdrop-blur-sm">
                  <svg className="w-4 h-4 text-[#31D9FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI 驱动的智能评价生成工具
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span 
                    className="bg-gradient-to-r from-[#31D9FF] via-[#6A8FFF] to-[#9B5CF6] bg-clip-text text-transparent"
                    style={{
                      filter: 'drop-shadow(0 4px 12px rgba(49, 217, 255, 0.2))'
                    }}
                  >
                    美团一键好评生成器
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  基于先进的人工智能技术，自动生成高质量、符合美团规范的商品评价。
                  支持多种品类和评价风格，让您的购物体验更完美。
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/generate"
                  className="btn-primary inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-semibold"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  开始生成评价
                </a>
                <Link 
                  href="/demo" 
                  className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  查看演示
                </Link>
              </div>
            </div>

            {/* Right Content - Hero Preview Card */}
            <div className="relative">
              <div className="card p-6 sm:p-8 transform hover:scale-[1.02] transition-transform duration-500">
                <div className="bg-gradient-to-br from-cyan-50/50 to-indigo-50/50 rounded-2xl p-6 border border-cyan-100/50">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#31D9FF] to-[#9B5CF6] rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">评价生成完成</div>
                      <div className="text-sm text-slate-600">耗时 2.3 秒</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-700">选择商品类别：冰洗</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v3M6 4h12l1 12H5L6 4z" />
                        </svg>
                      </div>
                      <span className="text-sm text-slate-700">选择评价风格：真实自然型</span>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-[#31D9FF] to-[#9B5CF6] rounded-xl text-white shadow-lg">
                    <p className="text-sm leading-relaxed">
                      "这款美的冰箱制冷效果很稳定，噪音控制得很好。容量也够用，日常食物存放绰绰有余。整体体验很满意，推荐购买。"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features-section" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              为什么选择<span className="bg-gradient-to-r from-[#31D9FF] to-[#9B5CF6] bg-clip-text text-transparent"> 美评宝</span>？
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              基于先进的人工智能技术，为您提供最优质的评价生成体验
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1 */}
            <div className="card p-6 sm:p-8 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#31D9FF] to-[#9B5CF6] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">自动生成高质量评价</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                基于深度学习算法，自动生成符合美团规范的真实、自然的商品评价。字数控制在60-120字，保证评价质量和真实性。
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-6 sm:p-8 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">多品类多风格评价模板</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                支持冰洗、空调、电视、厨卫、个护、3C等六大品类，每类提供真实自然、服务夸赞、高能好评等多种评价风格选择。
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-6 sm:p-8 group sm:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 sm:mb-4">快速生成，一键复制</h3>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                只需选择商品类别和评价风格，AI 即可在几秒内生成高质量评价。支持一键复制，方便快捷地使用生成的评价内容。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="card p-8 sm:p-12 bg-gradient-to-r from-[#31D9FF] to-[#9B5CF6] text-white shadow-2xl border-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              立即开始生成您的评价
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              只需几秒钟，AI 就能为您生成高质量、美团规范的商品评价
            </p>
            <a
              href="/generate"
              className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-white text-[#31D9FF] font-semibold text-base sm:text-lg rounded-2xl hover:bg-gray-50 focus:ring-4 focus:ring-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              开始使用
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-[#31D9FF] to-[#9B5CF6] rounded-lg flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <span className="text-lg font-semibold bg-gradient-to-r from-[#31D9FF] to-[#9B5CF6] bg-clip-text text-transparent">美评宝 ReviewX</span>
          </div>
          <p className="text-slate-400 text-sm">
            苏宁2025 -2026 YS。基于先进技术，为您提供个性化的服务。
          </p>
        </div>
      </footer>
    </div>
  );
}
