import { NextRequest, NextResponse } from "next/server";

type ChatRequestBody = {
  message?: unknown;
};

const fallbackAnswer =
  "現在、案内情報を準備中です。詳しくは大信寺までお問い合わせください。";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatRequestBody;

    if (typeof body.message !== "string" || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: "メッセージを入力してください。" },
        { status: 400 },
      );
    }

    return NextResponse.json({ answer: fallbackAnswer });
  } catch {
    return NextResponse.json(
      { error: "リクエスト形式が正しくありません。" },
      { status: 400 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    { error: "このエンドポイントはPOSTのみ対応しています。" },
    { status: 405 },
  );
}
