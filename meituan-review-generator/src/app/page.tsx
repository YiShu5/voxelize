import Image from 'next/image';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation Header */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Image
            src="/logo.svg"
            alt="美评宝"
            width={180}
            height={45}
            className="h-11 w-auto"
          />
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <span>产品特性</span>
            <span>使用说明</span>
            <span>关于我们</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative px-6 py-20">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-50 blur-3xl opacity-70" />
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  AI 驱动的智能评价生成工具
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-[0_10px_30px_rgba(99,102,241,0.3)]">
                    美团一键好评生成器
                  </span>
          </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  基于人工智能技术，自动生成高质量、美团规范的商品评价。
                  支持多种品类和评价风格，让您的购物体验更完美。
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/generate"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white font-semibold text-lg rounded-2xl shadow-[0_15px_35px_rgba(79,70,229,0.35)] transition-all duration-300 hover:shadow-[0_20px_45px_rgba(99,102,241,0.6)] hover:scale-105 hover:brightness-110 focus:ring-4 focus:ring-indigo-200/50"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  开始生成评价
                </a>
                <Link href="/demo" className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-gray-300 text-gray-700 font-medium rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  查看演示
                </Link>
              </div>
            </div>

            {/* Right Content - Hero Image/Card */}
            <div className="relative">
              <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 opacity-70" />
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_30px_80px_rgba(15,23,42,0.15)] border border-white/60 p-8 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">评价生成完成</div>
                      <div className="text-sm text-gray-600">耗时 2.3 秒</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">选择商品类别：冰洗</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v3M6 4h12l1 12H5L6 4z" />
                        </svg>
                      </div>
                      <span className="text-gray-700">选择评价风格：真实自然型</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="text-gray-700">上传商品图片（可选）</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white">
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
      <div id="features-section" className="px-6 py-20 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              为什么选择我们？
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              基于先进的人工智能技术，为您提供最优质的评价生成体验
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">自动生成高质量评价</h3>
              <p className="text-gray-600 leading-relaxed">
                基于深度学习算法，自动生成符合美团规范的真实、自然的商品评价。字数控制在60-120字，保证评价质量和真实性。
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">智能识别商品图片</h3>
              <p className="text-gray-600 leading-relaxed">
                上传商品图片后，系统自动识别商品类别、外观特征。结合图片信息生成更精准、更贴合实际的个性化评价内容。
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">多品类多风格评价模板</h3>
              <p className="text-gray-600 leading-relaxed">
                支持冰洗、空调、电视、厨卫、个护、3C等六大品类，每类提供真实自然、服务夸赞、高能好评等多种评价风格选择。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              立即开始生成您的评价
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              只需几秒钟，AI 就能为您生成高质量、美团规范的商品评价
            </p>
            <a
              href="/generate"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-indigo-600 font-semibold text-lg rounded-2xl hover:bg-gray-50 focus:ring-4 focus:ring-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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
      <footer className="px-6 py-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <span className="text-lg font-semibold">美评宝</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 美评宝。基于 AI 技术，为您提供优质的评价生成服务。
          </p>
        </div>
      </footer>
    </div>
  );
}
