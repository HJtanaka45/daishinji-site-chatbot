import { daishinjiKnowledge, unknownAnswer } from "./daishinjiKnowledge";

const minimumKeywordScore = 1;

const blockedKeywords = [
  "料金",
  "費用",
  "価格",
  "値段",
  "いくら",
  "全部",
  "総額",
  "宗派の条件",
  "宗旨の条件",
  "法要の具体",
  "法要の流れ",
  "受付時間",
  "営業時間",
  "今日",
  "空いて",
  "予定",
  "他のお寺",
  "他寺",
  "比べ",
  "比較",
  "安い",
  "天気",
  "雑談",
  "レストラン",
  "人生相談",
  "葬儀",
  "供養内容",
  "一般的",
];

function normalizeText(value: string): string {
  return value
    .trim()
    .normalize("NFKC")
    .toLowerCase()
    .replace(/\s+/g, "");
}

function includesAnyBlockedKeyword(message: string): boolean {
  return blockedKeywords.some((keyword) => message.includes(normalizeText(keyword)));
}

export function answerChatMessage(message: string): string {
  const normalizedMessage = normalizeText(message);

  if (normalizedMessage.length === 0) {
    return unknownAnswer;
  }

  if (includesAnyBlockedKeyword(normalizedMessage)) {
    return unknownAnswer;
  }

  const bestMatch = daishinjiKnowledge
    .map((entry) => {
      const score = entry.keywords.reduce((count, keyword) => {
        return normalizedMessage.includes(normalizeText(keyword)) ? count + 1 : count;
      }, 0);

      return { entry, score };
    })
    .filter((candidate) => candidate.score >= minimumKeywordScore)
    .sort((a, b) => b.score - a.score)[0];

  return bestMatch?.entry.answer ?? unknownAnswer;
}

export { unknownAnswer };
