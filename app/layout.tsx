import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkUp",
  description:
    "Connectez-vous avec vos amis et explorez un monde de possibilités",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <header className="header">
          <nav className="nav">
            <Link href="/" className="logo">
              🔗 LinkUp
            </Link>
            <Link href="/">Accueil</Link>
            <Link href="/explorer">Explorer</Link>
            <Link href="/profile">Mon profil</Link>
            <Link href="/about">À propos</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
