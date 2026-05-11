import { NextRequest, NextResponse } from "next/server";
import { answerChatMessage } from "../../../lib/answerChat";

type ChatRequestBody = {
  message?: unknown;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ChatRequestBody;

    if (typeof body.message !== "string" || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: "メッセージを入力してください。" },
        { status: 400 },
      );
    }

    return NextResponse.json({ answer: answerChatMessage(body.message) });
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
