import { NextRequest, NextResponse } from "next/server";

type GenerateRequestBody = {
  category?: string;
  style?: string;
  productName?: string;
  imageBase64?: string;
};

type DeepSeekResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message: string;
  };
};

const CATEGORY_OPTIONS = ["冰洗", "空调", "电视", "厨卫", "个护", "3C"] as const;
const STYLE_OPTIONS = [
  "真实自然型",
  "服务夸赞型",
  "高能好评型",
  "吐槽转好评型",
  "理性分析型",
  "家庭使用场景型",
] as const;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const parseJsonSafe = async <T>(res: Response): Promise<T | null> => {
  try {
    return (await res.json()) as T;
  } catch (error) {
    console.error("响应 JSON 解析失败:", error);
    return null;
  }
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json().catch(() => null)) as
      | GenerateRequestBody
      | null;

    if (!body) {
      return NextResponse.json(
        { error: "请求体解析失败，请检查 JSON 格式" },
        { status: 400 }
      );
    }

    const category = body.category?.trim();
    const style = body.style?.trim();
    const productName = body.productName?.trim();
    const imageBase64 = body.imageBase64?.trim();

    if (!category || !style) {
      return NextResponse.json(
        { error: "商品类别和评价风格为必填参数" },
        { status: 400 }
      );
    }

    if (
      !CATEGORY_OPTIONS.includes(category as (typeof CATEGORY_OPTIONS)[number])
    ) {
      return NextResponse.json(
        { error: "商品类别不在允许范围内" },
        { status: 400 }
      );
    }

    if (
      !STYLE_OPTIONS.includes(style as (typeof STYLE_OPTIONS)[number])
    ) {
      return NextResponse.json(
        { error: "评价风格不在允许范围内" },
        { status: 400 }
      );
    }

    const apiKey = process.env.DEEPSEEK_API_KEY?.trim();
    const baseUrl = process.env.DEEPSEEK_API_URL?.trim();
    if (!apiKey) {
      console.error("DEEPSEEK_API_KEY 环境变量未配置");
      return NextResponse.json(
        { error: "服务配置缺失，请联系管理员" },
        { status: 500 }
      );
    }
    if (!baseUrl) {
      console.error("DEEPSEEK_API_URL 环境变量未配置");
      return NextResponse.json(
        { error: "服务端未正确配置 DeepSeek API 地址" },
        { status: 500 }
      );
    }

    const cleanedImageBase64 = imageBase64
      ? (imageBase64.includes(",")
          ? imageBase64.split(",")[1]
          : imageBase64
        ).replace(/\s+/g, "")
      : "";

    const imageHint = cleanedImageBase64
      ? "用户上传了商品图片（base64 数据已提供）。请根据常见家电/数码产品体验结合图像可能的信息，描述真实感受，但不要提及“根据图片”或“我看到图片”等字样。"
      : "用户未上传图片，可忽略图像描述。";

    const prompt = `你是一名真实的美团消费者，即将给出一条符合平台规范的评价，请满足以下要求：
1. 字数保持在60-120字之间，语气口语化、真实自然。
2. 不出现品牌词、极端词和广告语，禁止带有“官方、客服、旗舰店”等暗示托评的词汇。
3. 商品类别：${category}；评价风格：${style}；商品名称：${productName || "未提供"}。
4. 可从外观质感、使用场景、噪音/性能、配送/安装体验、售后感受等角度展开描述。
5. ${imageHint}

请直接输出最终评价内容，不要带标题。`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45_000);

    const aiResponse = await fetch(`${baseUrl.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text().catch(() => "请求失败");
      console.error("DeepSeek API 请求失败:", aiResponse.status, errorText);
      const clientMessage =
        aiResponse.status === 401
          ? "鉴权失败，请检查 API Key 是否正确。"
          : aiResponse.status === 429
          ? "请求过于频繁，请稍后再试。"
          : "评价生成服务暂时不可用，请稍后重试";
      return NextResponse.json(
        { error: clientMessage },
        { status: 503 }
      );
    }

    const aiData = await parseJsonSafe<DeepSeekResponse>(aiResponse);
    if (!aiData) {
      return NextResponse.json(
        { error: "评价生成服务数据解析失败，请稍后重试" },
        { status: 502 }
      );
    }

    if (aiData.error) {
      console.error("DeepSeek API 返回错误:", aiData.error);
      return NextResponse.json(
        { error: "评价生成失败，请稍后再试" },
        { status: 500 }
      );
    }

    const content = aiData.choices?.[0]?.message?.content?.trim();
    if (!content || content.length < 40) {
      return NextResponse.json(
        { error: "生成内容不符合要求，请重试" },
        { status: 500 }
      );
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("生成接口异常:", error);
    const message =
      error instanceof Error ? error.message : "未知错误";
    return NextResponse.json(
      { error: `服务异常：${message}` },
      { status: 500 }
    );
  }
}
