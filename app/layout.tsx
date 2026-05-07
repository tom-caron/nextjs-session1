import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

import SessionWrapper from "@/components/SessionWrapper";
import AuthButton from "@/components/AuthButton";
import SearchBar from "@/components/SearchBar";

export const metadata: Metadata = {
  title: "LinkUp",
  description: "Une application sociale construite avec Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <SessionWrapper>
          <header className="header">
            <nav className="nav">
              <Link href="/" className="logo">
                🔗 LinkUp
              </Link>

              <Link href="/">Accueil</Link>
              <Link href="/explorer">Explorer</Link>
              <Link href="/profile">Mon profil</Link>
              <Link href="/about">À propos</Link>

              <SearchBar />
              <AuthButton />
            </nav>
          </header>

          <main>{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
