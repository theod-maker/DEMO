import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import data from "../data.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${data.profile.firstName} ${data.profile.lastName} — ${data.profile.title}`,
  description: `Portfolio de ${data.profile.firstName} ${data.profile.lastName}, ${data.profile.title.toLowerCase()}.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased bg-[#0e0e0e] text-[#f0f0f0]">{children}</body>
    </html>
  );
}
