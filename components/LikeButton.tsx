"use client";

import { useState } from "react";

type LikeButtonProps = {
  postId: number;
  initialLikes: number;
};

export default function LikeButton({ postId, initialLikes }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialLikes);
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (loading) return;

    const nextLiked = !liked;

    setLiked(nextLiked);
    setCount((prev) => prev + (nextLiked ? 1 : -1));
    setLoading(true);

    try {
      const res = await fetch(`/api/posts/${postId}/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          increment: nextLiked,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Erreur lors du like");
      }

      setCount(data.likes);
    } catch {
      setLiked(!nextLiked);
      setCount((prev) => prev + (nextLiked ? -1 : 1));
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`like-button ${liked ? "liked" : ""}`}
      disabled={loading}
    >
      {liked ? "❤️" : "🤍"} {count}
    </button>
  );
}
