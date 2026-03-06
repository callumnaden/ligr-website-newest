import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LIGR — Broadcast-Quality Sports Production for Everyone",
  description:
    "LIGR gives every sports organisation the tools to deliver professional live broadcasts with real-time graphics, automated scoring, and AI-driven design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
