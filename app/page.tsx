export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";
import NewPostForm from "@/components/NewPostForm";

export default async function HomePage() {
  const session = await auth();

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
    take: 20,
  });

  return (
    <div className="container">
      <h1>Fil d’actualité</h1>

      <NewPostForm />

      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          authorId={post.authorId}
          currentUserId={session?.user.id}
          author={post.author.name ?? "Utilisateur"}
          handle={post.author.handle ?? "@unknown"}
          content={post.content}
          likes={post.likes}
          time={post.createdAt.toLocaleDateString("fr-FR")}
        />
      ))}
    </div>
  );
}
