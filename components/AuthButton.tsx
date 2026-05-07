"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="auth-loading">...</span>;
  }

  if (!session) {
    return (
      <button onClick={() => signIn("github")} className="auth-login-button">
        Se connecter avec GitHub
      </button>
    );
  }

  return (
    <div className="auth-user">
      {session.user?.image && (
        <img
          src={session.user.image}
          alt={session.user.name ?? "Avatar"}
          width={28}
          height={28}
          className="auth-avatar"
        />
      )}

      <span className="auth-name">{session.user?.name}</span>

      <button onClick={() => signOut()} className="auth-logout-button">
        Déconnexion
      </button>
    </div>
  );
}
