import Link from "next/link";

export default function Home() {
  return (
    <main className="home-shell">
      <section className="home-card">
        <p className="eyebrow">大信寺AI案内チャットボット</p>
        <h1>チャットボット専用アプリ</h1>
        <p>
          このプロジェクトは大信寺WEB本体とは分離して作成されています。
          埋め込み用画面は <code>/chat-embed</code> です。
        </p>
        <Link className="home-link" href="/chat-embed">
          /chat-embed を開く
        </Link>
      </section>
    </main>
  );
}
