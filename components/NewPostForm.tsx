"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NewPostForm() {
  const { data: session, status } = useSession();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="new-post-form">
        <p className="char-count">Chargement de la session...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="new-post-form not-connected-box">
        <p>
          <button
            type="button"
            onClick={() => signIn("github")}
            className="login-link-button"
          >
            Connectez-vous
          </button>{" "}
          pour publier un post
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!content.trim() || !session?.user.id) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
        }),
      });

      let data = null;

      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        throw new Error(data?.error ?? "Erreur lors de la création");
      }

      setContent("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="new-post-form">
      <p className="posting-as">
        Publier en tant que <strong>{session.user.name}</strong>
      </p>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Quoi de neuf dans votre stack ?"
        rows={3}
        className="new-post-textarea"
        maxLength={280}
      />

      {error && <p className="form-error">{error}</p>}

      <div className="new-post-footer">
        <span className="char-count">{content.length}/280 caractères</span>

        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="publish-button"
        >
          {loading ? "Publication..." : "Publier"}
        </button>
      </div>
    </form>
  );
}
