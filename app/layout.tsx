import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trust Forever Marriage Bureau | Meaningful Introductions",
  description: "A trusted, personal matchmaking service for sincere individuals and families in Pakistan and around the world.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
