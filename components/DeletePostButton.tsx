"use client";

import { useRouter } from "next/navigation";

type DeletePostButtonProps = {
  postId: number;
};

export default function DeletePostButton({ postId }: DeletePostButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer ce post ?",
    );

    if (!confirmDelete) return;

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
