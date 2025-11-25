import Link from 'next/link';

export default function Demo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation Header - 使用全局 AppHeader */}

      {/* Main Content */}
      <div className="px-6 py-12">
        <div className="max-w-6xl mx-auto">

          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              功能演示
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                美评宝 ReviewX 使用演示
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              跟随以下步骤，体验AI智能生成美团规范的商品评价。整个过程只需30秒！
            </p>
          </div>

          {/* Demo Steps */}
          <div className="space-y-16 mb-20">

            {/* Step 1 */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-indigo-600">1</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-1">选择商品类别</h3>
                    <p className="text-indigo-100">从六大品类中选择您的商品类型</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {[
                    { name: '冰洗', icon: '❄️', active: true },
                    { name: '空调', icon: '🌡️', active: false },
                    { name: '电视', icon: '📺', active: false },
                    { name: '厨卫', icon: '🍳', active: false },
                    { name: '个护', icon: '🧴', active: false },
                    { name: '3C', icon: '📱', active: false }
                  ].map((category) => (
                    <div
                      key={category.name}
                      className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-center font-medium transition-all duration-300 ${
                        category.active
                          ? 'border-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                          : 'border-gray-200 text-gray-700 bg-white'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-medium">已选择：冰洗类商品</span>
                  </div>
                  <p className="text-gray-600 text-sm ml-11">
                    系统将根据冰箱、洗衣机等家电的特点生成相应的评价内容。
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-600">2</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-1">选择评价风格</h3>
                    <p className="text-purple-100">选择适合您的评价风格</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {[
                    { name: '真实自然型', icon: '🌱', desc: '朴实自然的评价风格', active: true },
                    { name: '服务夸赞型', icon: '⭐', desc: '突出服务体验', active: false },
                    { name: '高能好评型', icon: '🔥', desc: '充满热情的评价', active: false },
                    { name: '人情温度型', icon: '💛', desc: '真实有温度、贴近生活的正向评价', active: false },
                    { name: '理性分析型', icon: '📊', desc: '专业理性分析', active: false },
                    { name: '家庭使用场景型', icon: '🏠', desc: '家庭生活场景', active: false }
                  ].map((style) => (
                    <div
                      key={style.name}
                      className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-center font-medium transition-all duration-300 ${
                        style.active
                          ? 'border-purple-500 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg'
                          : 'border-gray-200 text-gray-700 bg-white'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-2xl">{style.icon}</span>
                        <span className="text-sm font-medium leading-tight">{style.name}</span>
                        <span className="text-xs opacity-75">{style.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-medium">已选择：真实自然型</span>
                  </div>
                  <p className="text-gray-600 text-sm ml-11">
                    生成朴实、自然、符合真实用户体验的评价内容，字数适中，真实可信。
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 - Result */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white font-semibold text-base">AI 智能生成完成 ✓</span>
                </div>
              </div>

              <div className="p-8">
                <div className="bg-gradient-to-br from-gray-50 to-indigo-50 rounded-2xl p-8 border border-gray-200 shadow-inner">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">美</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="font-semibold text-gray-900 text-lg">美团用户</span>
                        <div className="flex text-yellow-400 gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-xl animate-in zoom-in duration-300" style={{ animationDelay: `${star * 100}ms` }}>
                              ⭐
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                          {new Date().toLocaleString('zh-CN')}
                        </span>
                      </div>
                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg mb-6 font-medium">
                        这款美的冰箱用了快一个月了，制冷效果很稳定，噪音控制得很好。冷冻室和冷藏室的空间分配很合理，存放食物很方便。冰箱门密封性很好，不会漏冷气。整体体验还是挺满意的，推荐给有需要的人。
                      </p>
                      <button
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 border-2 border-transparent hover:border-indigo-300"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>复制评价</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                现在就开始使用美评宝 ReviewX
              </h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                体验AI驱动的智能评价生成，让您的购物体验更完美
              </p>
              <Link
                href="/generate"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-indigo-600 font-semibold text-lg rounded-2xl hover:bg-gray-50 focus:ring-4 focus:ring-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                开始生成评价
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
