"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostForm() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!content.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: "Alice Martin",
          handle: "@alice_dev",
          content,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
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
          disabled={loading || !content.trim()}
          className="publish-button"
        >
          {loading ? "Publication..." : "Publier"}
        </button>
      </div>
    </form>
  );
}