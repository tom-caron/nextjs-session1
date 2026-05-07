import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CommentForm from "@/components/CommentForm";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!post) {
    return {
      title: "Post introuvable · LinkUp",
    };
  }

  const title =
    post.content.length > 60 ? post.content.slice(0, 60) + "..." : post.content;

  return {
    title: `${title} · LinkUp`,
    description: post.content,
  };
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      author: true,
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
        },
      },
    },
  });

  if (!post) {
    throw new Error("Post introuvable");
  }

  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Retour au fil
      </Link>

      <article className="post-detail-card">
        <div className="post-author-row">
          <strong>{post.author.name ?? "Utilisateur"}</strong>
          <span className="api-handle">{post.author.handle ?? "@unknown"}</span>
        </div>

        <p className="post-detail-content">{post.content}</p>

        <p className="post-detail-meta">
          ❤️ {post.likes} · Publié le{" "}
          {post.createdAt.toLocaleDateString("fr-FR")}
        </p>
      </article>

      <CommentForm postId={post.id} />

      <h2>Commentaires ({post.comments.length})</h2>

      {post.comments.length === 0 ? (
        <p className="empty-comments">Aucun commentaire pour le moment.</p>
      ) : (
        post.comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <p className="comment-name">
              {comment.author.name ?? "Utilisateur"}
            </p>
            <p className="comment-email">
              {comment.author.handle ?? comment.author.email ?? "@unknown"} ·{" "}
              {comment.createdAt.toLocaleDateString("fr-FR")}
            </p>
            <p className="comment-body">{comment.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
