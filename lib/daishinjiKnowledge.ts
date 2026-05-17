export type KnowledgeEntry = {
  id: string;
  title: string;
  keywords: string[];
  answer: string;
  sourceUrl: string;
};

export const unknownAnswer =
  "申し訳ありません。その内容については現在ご案内できる情報がありません。詳しくは直接お問い合わせください。";

export const ritualConsultationAnswer =
  "法要や供養のご相談については、内容や日時によって個別の確認が必要です。詳しくは大信寺へ直接お問い合わせください。";

/** 法要・年忌などの相談意図（単独の「供養」は含めない） */
export const ritualConsultationKeywords = [
  "法要",
  "読経",
  "お経",
  "お勤め",
  "命日",
  "年忌",
  "一周忌",
  "三回忌",
  "四十九日",
];

/** 「供養をお願い」など、法要相談として扱うフレーズ */
export const ritualConsultationPhrases = [
  "供養をお願い",
  "供養の相談",
  "供養を依頼",
  "供養のご相談",
  "供養をお願",
];

/** 納骨・永代供養・蓮寿堂の案内（法要相談より先に判定） */
export const ossuaryIntentKeywords = [
  "納骨堂",
  "納骨墓",
  "納骨供養",
  "永代供養",
  "永代納骨",
  "納骨",
  "お骨",
  "遺骨",
  "骨壺",
  "預けたい",
  "蓮寿堂",
];

export const ossuaryKnowledgeIds = ["cemetery", "renjudo"] as const;

export const daishinjiKnowledge: KnowledgeEntry[] = [
  {
    id: "about-daishinji",
    title: "大信寺について",
    keywords: ["大信寺", "だいしんじ", "寺", "お寺", "浄土真宗", "真宗", "親鸞", "聖貫山"],
    answer:
      "大信寺は、広島県広島市安芸区中野東にある、親鸞聖人を宗祖と仰ぐ真宗（浄土真宗）のお寺です。公式サイトでは、親鸞聖人のみ教えを共に聴かせていただく場として案内されています。",
    sourceUrl: "https://daishinji-tp.com/",
  },
  {
    id: "daishinji-address",
    title: "大信寺の所在地・アクセス",
    keywords: [
      "何処",
      "どこ",
      "何所",
      "住所",
      "所在地",
      "アクセス",
      "行き方",
      "場所",
      "大信寺",
      "お寺",
    ],
    answer:
      "大信寺は、広島県広島市安芸区中野東にございます。公式サイトでは、JR安芸中野駅より徒歩8分ほど、駐車場ありとも案内されています。詳しいアクセスは直接お問い合わせください。",
    sourceUrl: "https://daishinji-tp.com/",
  },
  {
    id: "cemetery",
    title: "大信寺墓苑について",
    keywords: [
      "墓苑",
      "墓地",
      "お墓",
      "墓",
      "大信寺墓苑",
      "永代納骨墓",
      "納骨墓",
      "納骨堂",
      "納骨",
      "お骨",
      "遺骨",
      "骨壺",
      "預けたい",
      "永代供養",
    ],
    answer:
      "大信寺墓苑は、大信寺が管理している墓苑です。公式サイトでは、永代納骨墓を備えており、門信徒に関わらず利用できること、勧誘や寄付などの要求は一切ないことが案内されています。詳しい内容は直接お問い合わせください。",
    sourceUrl: "https://daishinji-tp.com/daishinjiboen.html",
  },
  {
    id: "renjudo",
    title: "蓮寿堂（永代合葬墓）について",
    keywords: [
      "蓮寿堂",
      "永代合葬墓",
      "合葬墓",
      "合葬",
      "永代",
      "永代供養",
      "一時預かり",
      "短期",
      "長期",
      "納骨堂",
      "納骨",
      "納骨墓",
      "お骨",
      "遺骨",
      "骨壺",
      "預けたい",
    ],
    answer:
      "蓮寿堂は、大信寺墓苑にある永代合葬墓です。公式サイトでは、お骨は短期（一時預かり）・長期（永代）のどちらでも納骨可能で、短期の場合は寺院（大信寺）・蓮寿堂のどちらでも預かれると案内されています。詳しい内容は直接お問い合わせください。",
    sourceUrl: "https://daishinji-tp.com/daishinjiboen.html",
  },
  {
    id: "cemetery-access",
    title: "大信寺墓苑の所在地・アクセス",
    keywords: ["アクセス", "行き方", "場所", "所在地", "住所", "駐車場", "安芸中野駅", "jr"],
    answer:
      "公式サイトでは、大信寺墓苑の所在地は広島県広島市安芸区中野、JR安芸中野駅より徒歩8分、車でも2分ほどで到着する場所と案内されています。駐車場ありとも掲載されています。",
    sourceUrl: "https://daishinji-tp.com/daishinjiboen.html",
  },
  {
    id: "contact",
    title: "お問い合わせ",
    keywords: ["問い合わせ", "問合せ", "お問い合わせ", "連絡", "相談", "電話", "fax", "メール"],
    answer:
      "公式サイトでは、連絡先として Tel 082-893-0405、Fax 082-893-0416 が掲載されています。メールでのお問い合わせは、公式サイトのお問い合わせページから案内されています。詳しい内容は直接お問い合わせください。",
    sourceUrl: "https://daishinji-tp.com/contact.html",
  },
];
