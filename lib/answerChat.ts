import {
  daishinjiKnowledge,
  type KnowledgeEntry,
  feeInquiryAnswer,
  feeIntentKeywords,
  ossuaryIntentKeywords,
  ossuaryKnowledgeIds,
  ritualConsultationAnswer,
  ritualConsultationKeywords,
  ritualConsultationPhrases,
  unknownAnswer,
  visitConsultationAnswer,
  visitIntentKeywords,
} from "./daishinjiKnowledge";

const minimumKeywordScore = 1;

const blockedKeywords = [
  "値段",
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

function includesFeeIntent(message: string): boolean {
  return feeIntentKeywords.some((keyword) => message.includes(normalizeText(keyword)));
}

function includesOssuaryIntent(message: string): boolean {
  return ossuaryIntentKeywords.some((keyword) => message.includes(normalizeText(keyword)));
}

function includesRitualConsultationIntent(message: string): boolean {
  if (includesOssuaryIntent(message)) {
    return false;
  }

  if (
    ritualConsultationKeywords.some((keyword) => message.includes(normalizeText(keyword)))
  ) {
    return true;
  }

  return ritualConsultationPhrases.some((phrase) => message.includes(normalizeText(phrase)));
}

function includesVisitConsultationIntent(message: string): boolean {
  return visitIntentKeywords.some((keyword) => message.includes(normalizeText(keyword)));
}

function findBestKnowledgeMatch(
  message: string,
  entries: KnowledgeEntry[],
): KnowledgeEntry | undefined {
  return entries
    .map((entry) => {
      const score = entry.keywords.reduce((count, keyword) => {
        return message.includes(normalizeText(keyword)) ? count + 1 : count;
      }, 0);

      return { entry, score };
    })
    .filter((candidate) => candidate.score >= minimumKeywordScore)
    .sort((a, b) => b.score - a.score)[0]?.entry;
}

const locationIntentKeywords = [
  "何処",
  "どこ",
  "何所",
  "住所",
  "所在地",
  "アクセス",
  "行き方",
];

function includesLocationIntent(message: string): boolean {
  return locationIntentKeywords.some((keyword) => message.includes(normalizeText(keyword)));
}

export function answerChatMessage(message: string): string {
  const normalizedMessage = normalizeText(message);

  if (normalizedMessage.length === 0) {
    return unknownAnswer;
  }

  if (includesFeeIntent(normalizedMessage)) {
    return feeInquiryAnswer;
  }

  if (includesAnyBlockedKeyword(normalizedMessage)) {
    return unknownAnswer;
  }

  if (includesOssuaryIntent(normalizedMessage)) {
    const ossuaryEntries = daishinjiKnowledge.filter((entry) =>
      (ossuaryKnowledgeIds as readonly string[]).includes(entry.id),
    );
    const ossuaryMatch = findBestKnowledgeMatch(normalizedMessage, ossuaryEntries);
    if (ossuaryMatch) {
      return ossuaryMatch.answer;
    }
  }

  if (includesRitualConsultationIntent(normalizedMessage)) {
    return ritualConsultationAnswer;
  }

  if (includesVisitConsultationIntent(normalizedMessage)) {
    return visitConsultationAnswer;
  }

  if (includesLocationIntent(normalizedMessage)) {
    const addressEntry = daishinjiKnowledge.find((entry) => entry.id === "daishinji-address");
    if (addressEntry) {
      return addressEntry.answer;
    }
  }

  const bestMatch = findBestKnowledgeMatch(normalizedMessage, daishinjiKnowledge);

  return bestMatch?.answer ?? unknownAnswer;
}

export {
  feeInquiryAnswer,
  ritualConsultationAnswer,
  unknownAnswer,
  visitConsultationAnswer,
};
