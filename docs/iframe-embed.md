# 大信寺AI案内チャットボット iframe埋め込みメモ

## 埋め込みURL

```txt
https://daishinji-ai-chatbot.vercel.app/chat-embed
```

## 基本iframeコード

```html
<iframe
  src="https://daishinji-ai-chatbot.vercel.app/chat-embed"
  title="大信寺AI案内チャットボット"
  loading="lazy"
  style="width: 100%; height: 720px; border: 0;"
></iframe>
```

## スマホ対応込みのiframeコード

```html
<style>
  .daishinji-chatbot-embed {
    width: 100%;
    max-width: 960px;
    height: 720px;
    margin: 0 auto;
  }

  .daishinji-chatbot-embed iframe {
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 16px;
    overflow: hidden;
    background: #fffaf2;
  }

  @media (max-width: 768px) {
    .daishinji-chatbot-embed {
      height: 100vh;
      max-width: none;
    }

    .daishinji-chatbot-embed iframe {
      border-radius: 0;
    }
  }
</style>

<div class="daishinji-chatbot-embed">
  <iframe
    src="https://daishinji-ai-chatbot.vercel.app/chat-embed"
    title="大信寺AI案内チャットボット"
    loading="lazy"
  ></iframe>
</div>
```

## 表示確認項目

- `docs/iframe-preview.html` をブラウザで開けること
- iframe内に `https://daishinji-ai-chatbot.vercel.app/chat-embed` が表示されること
- PC幅でレイアウトが崩れないこと
- スマホ幅でレイアウトが崩れないこと
- 入力欄に文字を入力できること
- 送信できること
- 仮応答が返ること
- iframe外のページ要素に影響しないこと

## 大信寺WEB本体側で触る範囲

大信寺WEB本体側で触る範囲は、上記のiframe埋め込みコードのみです。

チャットボット本体のUI、API、今後のAI連携は、チャットボット専用プロジェクト側で管理します。大信寺WEB本体リポジトリには、OpenAI、Supabase、RAG、チャットAPI処理を実装しません。

## 今回未対応のもの

- OpenAI連携
- Supabase連携
- RAG
- embedding
- pgvector
- 自動クロール
- 本番用回答制御

## 環境変数

今回のiframe埋め込み確認に環境変数は不要です。

`.env` の作成、APIキー追加、Vercel env登録は行いません。
