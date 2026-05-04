import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

  if (!res.ok) {
    return { title: "Post introuvable · LinkUp" };
  }

  const post = await res.json();

  const truncatedTitle =
    post.title.length > 60 ? post.title.slice(0, 60) + "..." : post.title;

  return {
    title: `${truncatedTitle} · LinkUp`,
    description: post.body,
  };
}

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Props) {
  const { id } = await params;

  const [postRes, commentsRes] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      next: { revalidate: 60 },
    }),
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, {
      next: { revalidate: 60 },
    }),
  ]);

  if (!postRes.ok) {
    throw new Error("Post introuvable");
  }

  if (!commentsRes.ok) {
    throw new Error("Impossible de charger les commentaires");
  }

  const [post, comments]: [Post, Comment[]] = await Promise.all([
    postRes.json(),
    commentsRes.json(),
  ]);

  if (!post.id) {
    throw new Error("Post introuvable");
  }

  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Retour au fil
      </Link>
      <article className="post-detail-card">
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </article>

      <h2>Commentaires ({comments.length})</h2>

      {comments.map((comment) => (
        <div key={comment.id} className="comment-card">
          <p className="comment-name">{comment.name}</p>
          <p className="comment-email">{comment.email}</p>
          <p className="comment-body">{comment.body}</p>
        </div>
      ))}
    </div>
  );
}
