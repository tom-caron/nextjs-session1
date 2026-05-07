"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  handle: string;
  email: string;
};

export default function NewPostForm() {
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    async function fetchFirstUser() {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.error ?? "Impossible de charger les utilisateurs",
          );
        }

        setAuthorId(data.users[0]?.id ?? null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Erreur lors du chargement",
        );
      } finally {
        setLoadingUser(false);
      }
    }

    fetchFirstUser();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!content.trim() || !authorId) return;

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
          authorId,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Erreur lors de la création");
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
          disabled={loading || loadingUser || !content.trim() || !authorId}
          className="publish-button"
        >
          {loading
            ? "Publication..."
            : loadingUser
              ? "Chargement..."
              : "Publier"}
        </button>
      </div>
    </form>
  );
}
