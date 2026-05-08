import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "大信寺AI案内チャットボット",
  description: "大信寺WEB本体とは分離された、iframe埋め込み用の案内チャットボットです。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
