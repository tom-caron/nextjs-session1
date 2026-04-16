"use client";

import { useState } from "react";

export default function FollowButton() {
  const [following, setFollowing] = useState(false);

  const handleClick = () => {
    setFollowing(!following);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        border: "1px solid",
        cursor: "pointer",
        fontWeight: "bold",
        background: following ? "#e5e7eb" : "#6d28d9",
        color: following ? "#374151" : "white",
        borderColor: following ? "#d1d5db" : "#6d28d9",
      }}
    >
      {following ? "Abonné ✓" : "Suivre"}
    </button>
  );
}