"use client";

import { useActionState } from "react";
import { useSession, signIn } from "next-auth/react";
import { createComment } from "@/app/actions";

type CommentFormProps = {
  postId: number;
};

export default function CommentForm({ postId }: CommentFormProps) {
  const { data: session, status } = useSession();
  const [state, formAction, pending] = useActionState(createComment, null);

  if (status === "loading") {
    return (
      <div className="comment-form">
        <p className="char-count">Chargement de la session...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="comment-form not-connected-box">
        <p>
          <button
            type="button"
            onClick={() => signIn("github")}
            className="login-link-button"
          >
            Connectez-vous
          </button>{" "}
          pour commenter ce post
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="comment-form">
      <input type="hidden" name="postId" value={postId} />

      <p className="posting-as">
        Commenter en tant que <strong>{session.user.name}</strong>
      </p>

      <textarea
        name="content"
        rows={3}
        placeholder="Ajouter un commentaire..."
        className="new-post-textarea"
        maxLength={500}
      />

      {state?.error && <p className="form-error">{state.error}</p>}

      <div className="new-post-footer">
        <span className="char-count">Maximum 500 caractères</span>

        <button type="submit" disabled={pending} className="publish-button">
          {pending ? "Envoi..." : "Commenter"}
        </button>
      </div>
    </form>
  );
}
