# 大信寺AI案内チャットボット Phase 1.6 完成報告・引き継ぎ

**作成日**: 2026-05-17  
**ステータス**: Phase 1.6 完了（キーワード照合・固定ナレッジ方式）  
**正リポジトリ**: https://github.com/HJtanaka45/daishinji-site-chatbot.git  
**作業フォルダ（ローカル）**: `C:\Users\rtana\HILLSJAPANAPP\大信寺\daishinji-site-chatbot-github-review`

---

## 1. 何ができているか

| 項目 | 状態 |
|------|------|
| 本番デプロイ（Vercel） | OK |
| iframe 埋め込み UI（`/chat-embed`） | OK |
| チャット API（`POST /api/chat`） | OK |
| 固定ナレッジ + キーワード判定 | OK |
| OpenAI / Supabase / RAG | **未実装（意図的）** |

### 本番 URL

| 用途 | URL |
|------|-----|
| チャット埋め込み | https://daishinji-ai-chatbot.vercel.app/chat-embed |
| API | https://daishinji-ai-chatbot.vercel.app/api/chat |
| 仮サーバー（WEB本体 iframe） | https://www.hillsjapan.com/daishinji-preview/ |

仮サーバーは `DAISHINJI-WEB` の `out/` を `public_html/daishinji-preview/` に同期。iframe の `src` は上記本番チャット URL を向ける。

---

## 2. 回答の仕組み（Phase 1.6）

### 参照元の方針

- **回答の根拠**: 公式サイト `https://daishinji-tp.com/` に掲載されている範囲
- **金額・未掲載の詳細**: 勝手に作らず、専用の問い合わせ誘導文へ
- **プレビュー用 WEB**（`DAISHINJI-WEB`）にだけある情報（例: 樹木葬「往還」の詳細）は、チャットでは断定しない

### 主要ファイル

| ファイル | 役割 |
|----------|------|
| `lib/daishinjiKnowledge.ts` | ナレッジ配列、固定誘導文、意図キーワード定数 |
| `lib/answerChat.ts` | 判定順・キーワード照合・`answerChatMessage()` |
| `app/api/chat/route.ts` | `POST` 受付 → `{ answer: string }` |
| `app/chat-embed/` | 埋め込み用チャット UI |

### 判定順（`answerChatMessage`）

```
1. 空メッセージ                    → unknown
2. 費用系意図                      → feeInquiryAnswer
3. ブロックキーワード              → unknown
4. 納骨・永代供養・蓮寿堂意図      → cemetery / renjudo ナレッジ
5. 墓苑利用条件意図（宗派・檀家等） → cemetery ナレッジ
6. 樹木葬意図                      → treeBurialInquiryAnswer
7. 法要相談意図                    → ritualConsultationAnswer
8. 見学・相談・予約・お参り意図    → visitConsultationAnswer
9. 所在地・アクセス意図            → daishinji-address
10. 通常ナレッジ照合（スコア最大） → 各 entry.answer
11. 該当なし                       → unknown
```

※ 単独の「供養」は法要相談にしない（「永代供養」誤判定防止）。  
※ 「供養をお願い」等のフレーズは法要相談。

---

## 3. 固定誘導文一覧

| 定数 | 用途 | 回答文（要約） |
|------|------|----------------|
| `unknownAnswer` | 不明・ブロック | 現在ご案内できる情報がありません。直接お問い合わせください。 |
| `feeInquiryAnswer` | 費用・料金 | 墓苑・納骨方法・ご相談内容により異なる。大信寺へお問い合わせください。 |
| `ritualConsultationAnswer` | 法要・供養相談 | 内容・日時により個別確認が必要。大信寺へお問い合わせください。 |
| `visitConsultationAnswer` | 見学・相談・予約・お参り | 日時・内容により個別確認が必要。大信寺へお問い合わせください。 |
| `treeBurialInquiryAnswer` | 樹木葬 | 掲載情報の確認が必要。大信寺へお問い合わせください。 |

全文は `lib/daishinjiKnowledge.ts` を参照。

---

## 4. ナレッジエントリ（`daishinjiKnowledge`）

| id | タイトル | 主なトピック |
|----|----------|--------------|
| `about-daishinji` | 大信寺について | 浄土真宗・親鸞・寺院概要 |
| `daishinji-address` | 所在地・アクセス | 住所・安芸中野駅徒歩8分・駐車場 |
| `cemetery` | 大信寺墓苑 | 永代納骨墓・門信徒不要・勧誘・寄付なし |
| `renjudo` | 蓮寿堂 | 永代合葬墓・短期/長期預かり |
| `cemetery-access` | 墓苑アクセス | 墓苑所在地・駅・駐車場 |
| `contact` | お問い合わせ | Tel / Fax / メール案内 |

---

## 5. 対応確認済みの質問カテゴリ

仮サーバー・本番 API で確認済み（2026-05-17 時点）。

| カテゴリ | 例 | 期待 |
|----------|-----|------|
| 大信寺概要 | 大信寺について | about ナレッジ |
| 所在地・アクセス | アクセスを教えて / 駅から近いですか？ | address |
| 駐車場 | 駐車場はありますか？ | cemetery-access 等 |
| 電話・問い合わせ | 電話番号を教えて | contact |
| 法要・供養相談 | 法要をお願いしたい / 供養をお願いできますか？ | ritual 誘導 |
| 見学・相談・予約・お参り | 見学できますか？ / 相談したいです | visit 誘導 |
| 納骨・お骨 | 納骨できますか？ / お骨を預けたい | cemetery / renjudo |
| 永代供養・蓮寿堂 | 永代供養はありますか？ / 蓮寿堂について | cemetery / renjudo |
| 費用・料金 | 費用を教えて | fee 誘導 |
| 宗派・檀家・門信徒・寄付 | 宗派は関係ありますか？ / 檀家になる必要は？ | cemetery（利用条件） |
| 樹木葬 | 樹木葬はありますか？ | tree 専用誘導（詳細は出さない） |

### 回帰確認用（短いセット）

```txt
法要をお願いしたいのですが？
永代供養はありますか
費用を教えて
見学できますか？
宗派は関係ありますか？
樹木葬はありますか？
駅から近いですか？
電話番号を教えて
```

---

## 6. Phase 1.6 で入ったコミット（新しい順）

| hash | message |
|------|---------|
| `6fa9c6d` | fix: improve access and cemetery eligibility responses |
| `8481b1d` | fix: add visit consultation fallback response |
| `29b4bc2` | fix: add fee inquiry fallback response |
| `c123c07` | fix: prioritize columbarium questions over ritual fallback |
| `3c963db` | fix: add ritual consultation fallback response |
| `f212833` | docs: sync README with knowledge answer engine |

**現在**: `main` は `origin/main` と同期済み（push 済み）。

---

## 7. 開発・デプロイ手順

### ローカル起動

```powershell
cd "C:\Users\rtana\HILLSJAPANAPP\大信寺\daishinji-site-chatbot-github-review"
npm install
npm run dev
# http://localhost:3000/chat-embed （PORT が変わる場合あり）
```

### API 直接確認

```powershell
$body = '{"message":"費用を教えて"}'
Invoke-RestMethod -Uri "http://localhost:3000/api/chat" -Method POST -Body $body -ContentType "application/json; charset=utf-8"
```

### ビルド・コミット（ルール）

- `git add .` **禁止** → 変更ファイルのみ `git add`
- `.env` **触らない**
- 確認なしに `git push` しない（運用ルール）

```powershell
npm run build
git add lib/answerChat.ts lib/daishinjiKnowledge.ts
git commit -m "fix: ..."
git push origin main
```

push 後、Vercel Production が Ready になってから仮サーバーで再確認。キャッシュ疑い時は `?v=YYYYMMDD-N` または Ctrl+F5。

---

## 8. 意図的にやっていないこと（Phase 2 以降）

- OpenAI による生成回答
- Supabase / pgvector / RAG
- サイト自動クロール・ナレッジ自動更新
- 管理画面
- 樹木葬「往還」の詳細ナレッジ（**公式 tp.com に詳細ページが整備されたら**追加検討）
- 一般墓地・法話会スケジュール等の未掲載情報

### ブロックされている質問例

雑談、天気、他寺比較、葬儀一般論、営業時間の断定、法要の具体手順など → `unknownAnswer`。

---

## 9. 関連プロジェクト（別リポ）

| プロジェクト | パス / 備考 |
|--------------|-------------|
| チャットボット（本ドキュメント） | `daishinji-site-chatbot-github-review` |
| WEB本体 | `大信寺RIKU\DAISHINJI-WEB`（`basePath: /daishinji-preview`） |
| RIKU zip 版 | 参照のみ。API 欠落あり。**正は GitHub 版** |

**次の候補タスク（B）**: WEB本体の正リポ整理（git 未整備・`out/` 同期運用の文書化）。

---

## 10. ナレッジ追加時のチェリスト

1. 公式サイトに根拠があるか確認（なければ誘導文のみ）
2. `daishinjiKnowledge.ts` に entry または意図キーワード追加
3. `answerChat.ts` の判定順との競合を確認（費用・法要・納骨・visit より先に拾われないか）
4. ローカル API で 5〜10 問テスト
5. `npm run build` → 対象ファイルのみ commit → push → 本番・仮サーバー確認

---

## 11. 連絡・障害時

- 本番が古い回答のとき: `git log -1` と Vercel Production のデプロイ commit を照合
- iframe が動かないとき: 仮サーバーの HTML に `daishinji-ai-chatbot.vercel.app` が含まれるか、`out/` 再ビルド・再アップロード
- API のみ確認: `POST https://daishinji-ai-chatbot.vercel.app/api/chat` に `{ "message": "..." }`

---

**Phase 1.6 完了。** 受付AIとしての入口（場所・墓苑・法要・費用・見学・利用条件）は一通り整備済み。Phase 2 は RAG 設計または公式サイト追従のナレッジ拡充から着手可能。
