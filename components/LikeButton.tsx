"use client";

import { useState } from "react";

type LikeButtonProps = {
  initialLikes: number;
};

export default function LikeButton({ initialLikes }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialLikes);

  const handleClick = () => {
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        border: "1px solid",
        borderColor: liked ? "#ec4899" : "#e5e7eb",
        background: liked ? "#fce7f3" : "transparent",
        color: liked ? "#ec4899" : "#6b7280",
        borderRadius: "8px",
        padding: "0.4rem 0.8rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
      }}
    >
      {liked ? "❤️" : "🤍"} {count}
    </button>
  );
}