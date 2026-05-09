# 大信寺AI案内チャットボット iframe埋め込み方法

## 目的

大信寺WEB本体へチャットボットをiframeで埋め込むためのコードを整理します。

この作業では、大信寺WEB本体は直接変更しません。大信寺WEB本体側で触る範囲は、最終的にこのドキュメントに記載したiframe埋め込みコードのみです。

## 埋め込みURL

```txt
https://daishinji-ai-chatbot.vercel.app/chat-embed
```

## 基本iframeコード

```html
<div style="width: 100%; max-width: 960px; height: 720px; margin: 0 auto;">
  <iframe
    src="https://daishinji-ai-chatbot.vercel.app/chat-embed"
    title="大信寺AI案内チャットボット"
    style="width: 100%; height: 100%; border: 0; border-radius: 16px; overflow: hidden;"
    loading="lazy"
  ></iframe>
</div>
```

## スマホ対応込みのiframeコード

```html
<div class="daishinji-chatbot-embed">
  <iframe
    src="https://daishinji-ai-chatbot.vercel.app/chat-embed"
    title="大信寺AI案内チャットボット"
    loading="lazy"
  ></iframe>
</div>

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
  }

  @media (max-width: 768px) {
    .daishinji-chatbot-embed {
      height: 680px;
    }

    .daishinji-chatbot-embed iframe {
      border-radius: 0;
    }
  }
</style>
```

## 右下固定で表示する場合

大信寺WEB本体の右下にチャットボットを固定表示する場合は、以下のコードを使用します。

PCでは右下にチャットパネルを表示し、スマホでは画面幅に合わせて表示します。最初から大きく表示するより、開閉ボタン付きにして、利用者が必要なときだけ開ける形がおすすめです。

大信寺WEB本体側で触るのは、このiframe埋め込みコードのみです。チャットUIやAPI本体は、チャットボット専用アプリ側で管理します。

今回の整理では、OpenAI / Supabase / RAG は未対応です。また、iframe埋め込み確認に環境変数は不要です。

```html
<button class="daishinji-chatbot-button" onclick="toggleDaishinjiChatbot()">
  AI案内
</button>

<div id="daishinji-chatbot-panel" class="daishinji-chatbot-panel">
  <iframe
    src="https://daishinji-ai-chatbot.vercel.app/chat-embed"
    title="大信寺AI案内チャットボット"
    loading="lazy"
  ></iframe>
</div>

<style>
  .daishinji-chatbot-button {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 10000;
    border: 0;
    border-radius: 999px;
    padding: 14px 20px;
    background: #6b4f2a;
    color: #fff;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 10px 28px rgba(0, 0, 0, 0.24);
  }

  .daishinji-chatbot-panel {
    position: fixed;
    right: 24px;
    bottom: 84px;
    width: 380px;
    height: 620px;
    max-width: calc(100vw - 32px);
    max-height: calc(100vh - 110px);
    z-index: 9999;
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.22);
    background: #fffaf2;
    display: none;
  }

  .daishinji-chatbot-panel.is-open {
    display: block;
  }

  .daishinji-chatbot-panel iframe {
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
  }

  @media (max-width: 768px) {
    .daishinji-chatbot-button {
      right: 16px;
      bottom: 16px;
    }

    .daishinji-chatbot-panel {
      right: 12px;
      bottom: 76px;
      width: calc(100vw - 24px);
      height: 72vh;
      border-radius: 16px;
    }
  }
</style>

<script>
  function toggleDaishinjiChatbot() {
    const panel = document.getElementById("daishinji-chatbot-panel");
    panel.classList.toggle("is-open");
  }
</script>
```

## 表示確認項目

- `docs/iframe-preview.html` をブラウザで開けること
- iframe内に `/chat-embed` が表示されること
- PC幅でレイアウトが崩れないこと
- スマホ幅でレイアウトが崩れないこと
- 入力欄に文字を入力できること
- 送信できること
- 仮応答が返ること
- iframe外のページへ影響しないこと

## 大信寺WEB本体側で触る範囲

大信寺WEB本体側で触る範囲は、iframe埋め込みコードのみです。

チャットボット本体のUI、API、今後のAI連携は、チャットボット専用プロジェクト側で管理します。

大信寺WEB本体リポジトリには、OpenAI、Supabase、RAG、チャットAPI処理を実装しません。

## 今回未対応のもの

今回の作業では、以下は対応しません。

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
