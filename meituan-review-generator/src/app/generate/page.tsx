'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import NextImage from 'next/image';

// ========================================
// 配置选项
const CATEGORY_OPTIONS = ['冰洗', '空调', '电视', '厨卫', '个护', '3C'];
const STYLE_OPTIONS = ['真实自然型', '服务夸赞型', '高能好评型', '吐槽转好评型', '理性分析型', '家庭使用场景型'];

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
  吐槽转好评型: '💭',
  理性分析型: '📊',
  家庭使用场景型: '🏠',
};

interface ImageFeatures {
  hasBrightRectangle: boolean;
  aspectRatio: number;
  horizontalLines: number;
  verticalLines: number;
  edgeDensity: number;
  colorVariance: number;
  brightRatio: number;
}

// ========================================
// 图片分析相关工具
const isEdgePixel = (data: Uint8ClampedArray, x: number, y: number, width: number, height: number): boolean => {
  if (x === 0 || y === 0 || x === width - 1 || y === height - 1) return true;

  const centerBrightness = (data[(y * width + x) * 4] + data[(y * width + x) * 4 + 1] + data[(y * width + x) * 4 + 2]) / 3;

  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = x + dx;
      const ny = y + dy;
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const neighborBrightness = (data[(ny * width + nx) * 4] + data[(ny * width + nx) * 4 + 1] + data[(ny * width + nx) * 4 + 2]) / 3;
        if (Math.abs(centerBrightness - neighborBrightness) > 50) return true;
      }
    }
  }
  return false;
};

const detectBrightRectangle = (brightnessMap: number[][], width: number, height: number): boolean => {
  const threshold = 180;
  let maxRectArea = 0;

  for (let y1 = 0; y1 < height - 10; y1++) {
    for (let y2 = y1 + 10; y2 < height; y2++) {
      for (let x1 = 0; x1 < width - 10; x1++) {
        for (let x2 = x1 + 10; x2 < width; x2++) {
          let brightCount = 0;
          for (let y = y1; y <= y2; y++) {
            for (let x = x1; x <= x2; x++) {
              if (brightnessMap[y][x] > threshold) brightCount++;
            }
          }
          const rectArea = (x2 - x1) * (y2 - y1);
          if (rectArea > 0 && brightCount / rectArea > 0.7 && rectArea > maxRectArea) {
            maxRectArea = rectArea;
          }
        }
      }
    }
  }
  return maxRectArea > width * height * 0.1;
};

const detectLines = (edgeMap: boolean[][], width: number, height: number) => {
  let horizontalLines = 0;
  let verticalLines = 0;

  for (let y = 0; y < height; y++) {
    let consecutiveEdges = 0;
    for (let x = 0; x < width; x++) {
      if (edgeMap[y][x]) {
        consecutiveEdges++;
      } else {
        if (consecutiveEdges >= 10) horizontalLines++;
        consecutiveEdges = 0;
      }
    }
    if (consecutiveEdges >= 10) horizontalLines++;
  }

  for (let x = 0; x < width; x++) {
    let consecutiveEdges = 0;
    for (let y = 0; y < height; y++) {
      if (edgeMap[y][x]) {
        consecutiveEdges++;
      } else {
        if (consecutiveEdges >= 10) verticalLines++;
        consecutiveEdges = 0;
      }
    }
    if (consecutiveEdges >= 10) verticalLines++;
  }

  return { horizontalLines, verticalLines };
};

const analyzeImageFeatures = (data: Uint8ClampedArray, width: number, height: number): ImageFeatures => {
  let totalBrightness = 0;
  let brightPixels = 0;
  const brightnessMap: number[][] = [];
  const edgeMap: boolean[][] = [];

  for (let y = 0; y < height; y++) {
    brightnessMap[y] = [];
    edgeMap[y] = [];
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const brightness = (r + g + b) / 3;

      brightnessMap[y][x] = brightness;
      totalBrightness += brightness;

      if (brightness > 200) brightPixels++;
      edgeMap[y][x] = isEdgePixel(data, x, y, width, height);
    }
  }

  const avgBrightness = totalBrightness / (width * height);
  const brightRatio = brightPixels / (width * height);
  const aspectRatio = width / height;
  const { horizontalLines, verticalLines } = detectLines(edgeMap, width, height);

  let edgeCount = 0;
  let colorVariance = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (edgeMap[y][x]) edgeCount++;
      colorVariance += Math.pow(brightnessMap[y][x] - avgBrightness, 2);
    }
  }

  return {
    hasBrightRectangle: detectBrightRectangle(brightnessMap, width, height),
    aspectRatio,
    horizontalLines,
    verticalLines,
    edgeDensity: edgeCount / (width * height),
    colorVariance: Math.sqrt(colorVariance / (width * height)) / 128,
    brightRatio,
  };
};

const classifyImage = (features: ImageFeatures): string => {
  if (features.hasBrightRectangle && features.aspectRatio > 1.2) {
    return features.aspectRatio > 2 ? '电视' : '3C';
  }
  if (features.aspectRatio < 0.8 && features.verticalLines > features.horizontalLines) {
    return '冰洗';
  }
  if (features.aspectRatio > 2 && features.horizontalLines > features.verticalLines) {
    return '空调';
  }
  if (features.edgeDensity > 0.3 && features.colorVariance > 0.4) {
    return '厨卫';
  }
  if (features.aspectRatio > 0.8 && features.aspectRatio < 1.5 && features.colorVariance < 0.3) {
    return '个护';
  }
  return '';
};

export default function Generate() {
  // 状态管理
  const [productCategory, setProductCategory] = useState<string>('');
  const [reviewStyle, setReviewStyle] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [detectedCategory, setDetectedCategory] = useState<string>('');
  const [generatedReview, setGeneratedReview] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // 文件输入引用
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  // 图片识别
  const detectCategory = async (imageSrc: string): Promise<string> =>
    new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve('');
          return;
        }

        const maxSize = 300;
        const ratio = Math.min(maxSize / img.width, maxSize / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        try {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const features = analyzeImageFeatures(imageData.data, canvas.width, canvas.height);
          resolve(classifyImage(features));
        } catch (error) {
          console.error('图片识别失败:', error);
          resolve('');
        }
      };

      img.onerror = () => resolve('');
      img.src = imageSrc;
    });

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('图片大小不能超过5MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        alert('请选择图片文件');
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onload = async (e) => {
        const imageSrc = e.target?.result as string;
        setImagePreview(imageSrc);

        try {
          const detected = await detectCategory(imageSrc);
          setDetectedCategory(detected);
        } catch (error) {
          console.error('图片识别失败:', error);
          setDetectedCategory('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    setDetectedCategory('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
      const imagePayload = imagePreview
        ? imagePreview.split(',')[1] || imagePreview
        : undefined;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({
          category: productCategory,
          style: reviewStyle,
          productName: trimmedProductName || undefined,
          imageBase64: imagePayload,
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

  // 页面渲染
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation Header */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <NextImage src="/logo.svg" alt="美评宝" width={180} height={45} className="h-11 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <span>产品特性</span>
            <span>使用说明</span>
            <span>关于我们</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI 驱动的智能评价生成工具
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                生成美团评价
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">只需几秒钟，AI 就能为您生成高质量、美团规范的商品评价</p>
          </div>

          {/* 配置信息卡片 */}
          <div className="bg-white/80 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-[0_30px_90px_rgba(15,23,42,0.12)] overflow-hidden mb-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 p-8 flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl">⚙️</div>
              <div>
                <h2 className="text-2xl font-semibold text-white mb-1">旗舰级评价配置</h2>
                <p className="text-indigo-100/90 text-sm">分步骤完成配置，体验更轻盈的操作流程</p>
              </div>
            </div>

            <div className="p-8 space-y-8">
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
                      className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-center font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                        productCategory === option
                          ? 'border-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105'
                          : 'border-gray-200 hover:border-indigo-300 text-gray-700 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-2xl">{CATEGORY_ICONS[option as keyof typeof CATEGORY_ICONS]}</span>
                        <span className="text-sm font-medium">{option}</span>
                      </div>
                      {productCategory === option && <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-600/10 animate-pulse"></div>}
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
                      className={`group relative overflow-hidden rounded-2xl border-2 p-6 text-center font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                        reviewStyle === option
                          ? 'border-purple-500 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg transform scale-105'
                          : 'border-gray-200 hover:border-purple-300 text-gray-700 bg-white hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <span className="text-2xl">{STYLE_ICONS[option as keyof typeof STYLE_ICONS]}</span>
                        <span className="text-sm font-medium leading-tight">{option}</span>
                      </div>
                      {reviewStyle === option && <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-600/10 animate-pulse"></div>}
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

              {/* 图片上传 */}
              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-slate-50/60 p-6 shadow-sm hover:shadow-lg transition">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-orange-100 text-orange-500 flex items-center justify-center text-xl">🖼️</div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.3em] text-orange-400 uppercase">Step 04</p>
                    <label className="text-lg font-semibold text-slate-900">商品图片（可选）</label>
                  </div>
                </div>
                <div className="space-y-4">
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  {!imagePreview ? (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full group relative overflow-hidden bg-white/80 border-2 border-dashed border-indigo-200 rounded-3xl p-12 text-center transition-all duration-300 hover:border-indigo-400 hover:shadow-xl hover:-translate-y-1"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                          <svg className="w-10 h-10 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">上传商品图片</h3>
                        <p className="text-gray-600 text-base mb-4">系统将自动识别商品类别，生成更精准的评价</p>
                        <p className="text-sm text-gray-500">支持 JPG、PNG 格式，最大 5MB</p>
                      </div>
                    </button>
                  ) : (
                    <div className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="aspect-video w-full rounded-3xl overflow-hidden border-2 border-gray-200 shadow-xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imagePreview} alt="商品预览" className="w-full h-full object-cover" />
                      </div>
                      <button
                        onClick={removeImage}
                        className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-2xl hover:bg-red-600 transition-all duration-300 shadow-lg opacity-90 hover:opacity-100 hover:scale-110"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      {detectedCategory && (
                        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-2xl text-sm font-medium shadow-lg flex items-center gap-2">
                          <span>🔍</span>
                          <span>识别: {detectedCategory}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 生成按钮 */}
              <div className="pt-4">
                <button
                  onClick={generateReview}
                  disabled={isGenerating || !productCategory || !reviewStyle}
                  className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-5 px-8 rounded-3xl font-semibold text-xl hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 focus:ring-4 focus:ring-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-indigo-600 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl disabled:hover:scale-100"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>AI 正在生成评价...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>生成评价</span>
                    </div>
                  )}
                </button>
                {errorMessage && (
                  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {errorMessage}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 生成结果 */}
          {generatedReview && (
            <div
              ref={resultRef}
              className={`bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_35px_90px_rgba(15,23,42,0.15)] border border-white/60 overflow-hidden mb-8 transition-all duration-700 ${showResult ? 'animate-in fade-in slide-in-from-bottom-8' : 'opacity-0 translate-y-8'}`}
            >
              <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 px-8 py-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white font-semibold text-base tracking-wide">AI 智能已生成 ✓</span>
              </div>

              <div className="p-8">
                <div className="bg-gradient-to-br from-white to-indigo-50/70 rounded-2xl p-8 border border-white/60 shadow-inner">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-xl">美</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <span className="font-semibold text-gray-900 text-lg">美团用户</span>
                        <div className="flex text-yellow-400 gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className="text-xl animate-in zoom-in duration-300" style={{ animationDelay: `${star * 100}ms` }}>
                              ⭐
                            </span>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 bg-white/70 px-3 py-1 rounded-full font-medium border border-gray-100">
                          {new Date().toLocaleString('zh-CN')}
                        </span>
                      </div>
                      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg mb-6 font-medium">{generatedReview}</p>
                      <button
                        onClick={copyToClipboard}
                        className="inline-flex items-center gap-3 bg-white text-indigo-600 px-8 py-4 rounded-2xl border border-indigo-100 hover:border-indigo-300 hover:bg-indigo-50 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
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
          )}

          {/* Loading Skeleton */}
          {isGenerating && !generatedReview && (
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-8 animate-in slide-in-from-bottom-4 duration-500">
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
          <div className="text-center mt-12">
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
