"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

type ChatApiResponse = {
  answer?: string;
  error?: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: "initial-assistant-message",
    role: "assistant",
    content:
      "大信寺サイトに掲載されている内容をもとにご案内します。分からない内容は直接お問い合わせください。",
  },
];

export default function ChatEmbedClient() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isLoading]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedInput,
    };

    setMessages((currentMessages) => [...currentMessages, userMessage]);
    setInput("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmedInput }),
      });

      const data = (await response.json()) as ChatApiResponse;

      if (!response.ok) {
        throw new Error(data.error ?? "回答の取得に失敗しました。");
      }

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          data.answer ??
          "申し訳ありません。その内容については現在ご案内できる情報がありません。詳しくは直接お問い合わせください。",
      };

      setMessages((currentMessages) => [...currentMessages, assistantMessage]);
    } catch {
      setError("通信に失敗しました。時間をおいて再度お試しください。");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="chat-page" aria-label="大信寺AI案内チャット">
      <section className="chat-frame">
        <header className="chat-header">
          <p className="eyebrow">大信寺AI案内</p>
          <h1>大信寺についてのご案内</h1>
          <p>参拝・墓苑・納骨に関するご質問を入力してください。</p>
        </header>

        <div className="message-list" aria-live="polite">
          <div className="message-stack">
            {messages.map((message) => (
              <div key={message.id} className={`message-row ${message.role}`}>
                <div className="message-bubble">
                  <span className="message-label">
                    {message.role === "user" ? "あなた" : "大信寺AI案内"}
                  </span>
                  {message.content}
                </div>
              </div>
            ))}

            {isLoading ? (
              <div className="message-row assistant">
                <div className="message-bubble" aria-label="回答を準備中です">
                  <span className="message-label">大信寺AI案内</span>
                  <span className="typing-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div>
            ) : null}
            <div ref={bottomRef} />
          </div>
        </div>

        <footer className="chat-form-wrap">
          {error ? <p className="error-box">{error}</p> : null}
          <form className="chat-form" onSubmit={handleSubmit}>
            <textarea
              className="chat-input"
              aria-label="質問を入力"
              placeholder="質問を入力してください"
              value={input}
              rows={1}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
            />
            <button className="send-button" type="submit" disabled={isLoading || !input.trim()}>
              {isLoading ? "送信中" : "送信"}
            </button>
          </form>
          <p className="notice-text">
            サイト掲載情報をもとにご案内します。不明な内容は直接お問い合わせください。
          </p>
        </footer>
      </section>
    </main>
  );
}
