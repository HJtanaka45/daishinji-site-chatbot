# 大信寺AI案内チャットボット｜0ベース再開発指示

## 前提

これまでの大信寺AI案内チャットボット開発では、チャットボット実装と大信寺WEBサイト本体のリポジトリ・デプロイ環境が混在していました。

その結果、チャットボットだけでなく、大信寺WEBサイト本体ごとVercelへデプロイされる状態になっていました。また、Vercel側にenvも登録されていたため、既存環境の継続利用や修復は行いません。

今回の方針は、既存環境を修復することではなく、チャットボット専用プロジェクトとして0から安全に再開発することです。

## 最重要方針

大信寺AI案内チャットボットは、大信寺WEBサイト本体とは完全に分離して開発してください。

大信寺WEB本体リポジトリの中で開発してはいけません。大信寺WEB本体をVercelへデプロイしてはいけません。大信寺WEB本体に直接チャットボット機能を作り込んではいけません。

最終的に大信寺WEB本体側へ入れるのは、iframe等の埋め込みコードだけです。

## 今後の構成

### 1. 大信寺WEB本体

役割:

- 大信寺公式サイト本体
- ページ制作・文言修正・画像調整・サイト更新
- トト側で管理

禁止:

- チャットボット本体の開発
- OpenAI / Supabase / RAG処理の実装
- VercelへのWEB本体デプロイ
- envやAPIキーの管理

### 2. 大信寺AI案内チャットボット

役割:

- チャットボット専用アプリ
- iframe埋め込み用の画面を提供
- チャットAPIを提供
- 将来的にサイト情報に基づく回答制御・RAGを実装

専用プロジェクト名:

```txt
daishinji-site-chatbot
```

想定構成:

```txt
daishinji-site-chatbot
├─ app/
│  ├─ chat-embed/
│  │  └─ page.tsx
│  └─ api/
│     └─ chat/
│        └─ route.ts
├─ components/
├─ lib/
├─ docs/
├─ README.md
├─ .env.example
└─ .gitignore
```

## 開発禁止事項

以下は絶対に行わないでください。

- 旧リポジトリを修復しようとする
- 旧Vercelプロジェクトを再利用する
- 大信寺WEB本体リポジトリ内で開発する
- 大信寺WEB本体をVercelへデプロイする
- 大信寺WEB本体のファイルを変更する
- `.env` をコミットする
- APIキーをコードに直接書く
- APIキーをREADMEやdocsに書く
- APIキーをチャットに貼る
- `git add .` を使う
- 確認なしに `git push` する
- OpenAI / Supabase / RAG / 自動クロールをいきなり実装する

## 最初に作るもの

今回は0ベース再開発なので、まずは最小構成だけを作ってください。

### Phase 1: 最小チャットUI

作成対象:

```txt
/chat-embed
```

目的:

大信寺WEB本体へiframeで埋め込める、独立したチャット画面を作る。

必要要素:

- チャットメッセージ表示
- 入力欄
- 送信ボタン
- ローディング表示
- エラー表示
- スマホ対応
- PC対応
- 大信寺サイトに合う落ち着いたデザイン
- iframe内で表示しても崩れないレイアウト

この段階では、OpenAI接続は不要です。

### Phase 2: 仮応答API

作成対象:

```txt
/api/chat
```

目的:

チャットUIからPOSTを受け取り、仮応答を返すAPIを作る。

最初の応答例:

```json
{
  "answer": "現在、案内情報を準備中です。詳しくは大信寺までお問い合わせください。"
}
```

必要要素:

- POSTリクエストを受け取る
- 入力メッセージを受け取る
- 仮応答を返す
- エラー時のレスポンスを返す
- クライアント側に秘密情報を出さない

### Phase 3: 環境変数の安全設計

作成対象:

- `.env.example`
- `.gitignore`

`.env.example` には、必要な変数名だけを書く。本物の値は絶対に入れない。

例:

```txt
OPENAI_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

`.gitignore` には必ず以下を含める。

```txt
.env
.env.local
.env.*.local
.vercel
node_modules
.next
```

注意:

- `.env` はGit管理しない
- `.env.example` に本物の値を書かない
- Service Role Keyはクライアント側へ絶対に出さない
- `NEXT_PUBLIC_` に秘密情報を入れない

### Phase 4: README作成

作成対象:

```txt
README.md
```

最低限書く内容:

- プロジェクト概要
- 大信寺WEB本体とは分離していること
- セットアップ方法
- 起動方法
- 環境変数
- `/chat-embed` の説明
- `/api/chat` の説明
- iframe埋め込み方法
- セキュリティ注意事項
- 禁止事項

## 回答制御の基本方針

このチャットボットは、雑談AIではありません。

大信寺サイトに掲載されている情報をもとに、参拝者・利用者へ正確に案内するためのAI案内チャットボットです。

回答してよい内容:

- 大信寺サイトに掲載されている内容
- 墓苑に関する掲載情報
- 樹木葬に関する掲載情報
- 納骨堂に関する掲載情報
- 合葬墓に関する掲載情報
- アクセス情報
- 問い合わせ方法
- サイト内に明示されている費用・条件

回答してはいけない内容:

- サイトにない費用
- サイトにない供養内容
- サイトにない宗派条件
- サイトにない納骨条件
- サイトにない法要内容
- 一般論による補完
- 他寺院の情報
- AIの推測
- OpenAIの一般知識による断定
- 雑談目的の自由回答

不明時の基本回答:

```txt
申し訳ありません。その内容については現在ご案内できる情報がありません。詳しくは直接お問い合わせください。
```

## 今回まだ実装しないもの

今回の最初の作業では、以下はまだ実装しないでください。

- OpenAI接続
- Supabase接続
- embedding
- pgvector
- RAG
- 自動クロール
- 管理画面
- 定期更新処理

まずは、安全に分離された最小チャットUIと仮APIを完成させることを優先してください。

## 最初の完了条件

- 大信寺WEB本体とは別の専用プロジェクトとして作られている
- `/chat-embed` が表示できる
- `/chat-embed` からメッセージ送信できる
- `/api/chat` が仮応答を返す
- `.env.example` がある
- `.gitignore` で `.env` や `.vercel` が除外されている
- `README.md` に分離方針と起動方法が書かれている
- OpenAIキーやSupabaseキーを一切コードに含めていない
- `git add .` を使っていない
- 大信寺WEB本体のファイルを触っていない

## 作業後の報告フォーマット

```md
# 作業報告｜大信寺AI案内チャットボット 0ベース再開発

## 1. 実施内容

-

## 2. 作成・変更ファイル

-

## 3. 動作確認

- `/chat-embed`:
- `/api/chat`:
- スマホ表示:
- エラー時表示:

## 4. セキュリティ確認

- `.env` をコミットしていない:
- `.env.example` に本物の値を入れていない:
- APIキーをコードに書いていない:
- `NEXT_PUBLIC_` に秘密情報を入れていない:
- `.vercel` をGit管理していない:
- `git add .` を使っていない:

## 5. 大信寺WEB本体との分離確認

- 大信寺WEB本体リポジトリ内で作業していない:
- 大信寺WEB本体ファイルを変更していない:
- 大信寺WEB本体をVercelへデプロイしていない:
- iframe埋め込み前提で作成している:

## 6. 未対応

-

## 7. 次にやるべきこと

-
```

## 重要

今回の目的は、機能を急いで増やすことではありません。

最初の目的は、大信寺WEB本体と完全に分離された、安全なチャットボット専用アプリを0から作ることです。

新たにフォルダを作成し、その直下で開発します。フォルダ名は `daishinji-site-chatbot` です。

## 作業方針メモ

まずは旧リポジトリや旧Vercelを触らず、専用フォルダだけを作る形で進めます。OpenAI・Supabase・RAGは入れず、UIと仮API、README、安全用ファイルまでに絞ります。

## 前回作業報告

# 作業報告｜大信寺AI案内チャットボット 0ベース再開発

## 1. 実施内容

- `/Applications/daishinji-site-chatbot` に新規フォルダを作成
- 大信寺WEB本体とは分離した、チャットボット専用Next.js構成を作成
- `/chat-embed` の最小チャットUIを作成
- `/api/chat` の仮応答APIを作成
- `.env.example`、`.gitignore`、`README.md` を作成
- OpenAI / Supabase / RAG は未実装のままにしています

## 2. 作成・変更ファイル

- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `next-env.d.ts`
- `.gitignore`
- `.env.example`
- `README.md`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `app/chat-embed/page.tsx`
- `app/chat-embed/ChatEmbedClient.tsx`
- `app/api/chat/route.ts`
- `components/.gitkeep`
- `lib/.gitkeep`
- `docs/.gitkeep`

## 3. 動作確認

- `/chat-embed`: 実装済み
- `/api/chat`: 仮応答API実装済み
- スマホ表示: CSSでレスポンシブ対応済み
- エラー時表示: UI側・API側ともに実装済み

補足: 依存関係のインストールとブラウザ起動までは未実施。ソース構成・必須ファイル・安全設定の静的確認は実施済み。

## 4. セキュリティ確認

- `.env` をコミットしていない: OK
- `.env.example` に本物の値を入れていない: OK
- APIキーをコードに書いていない: OK
- `NEXT_PUBLIC_` に秘密情報を入れていない: OK
- `.vercel` をGit管理していない: OK
- `git add .` を使っていない: OK

## 5. 大信寺WEB本体との分離確認

- 大信寺WEB本体リポジトリ内で作業していない: OK
- 大信寺WEB本体ファイルを変更していない: OK
- 大信寺WEB本体をVercelへデプロイしていない: OK
- iframe埋め込み前提で作成している: OK

## 6. 未対応

- OpenAI接続
- Supabase接続
- embedding
- pgvector
- RAG
- 自動クロール
- 管理画面
- 定期更新処理
- 実ブラウザでの表示確認
- Vercel新規プロジェクト作成
- GitHub新規リポジトリ作成・push

## 7. 次にやるべきこと

- `npm install`
- `npm run dev`
- `http://localhost:3000/chat-embed` を確認
- `/api/chat` へPOSTして仮応答を確認
- 問題なければ、旧Vercelではなく新しいチャットボット専用Vercelプロジェクトを作成する
