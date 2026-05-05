"use client";

import { useRouter } from "next/navigation";

type DeletePostButtonProps = {
  postId: number;
};

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    const res = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="delete-button"
      title="Supprimer le post"
    >
      🗑️
    </button>
  );
}