export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import PostCard from "@/components/PostCard";
import NewPostForm from "@/components/NewPostForm";

export default async function HomePage() {
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
          author={post.author.name}
          handle={post.author.handle}
          content={post.content}
          likes={post.likes}
          time={post.createdAt.toLocaleDateString("fr-FR")}
        />
      ))}
    </div>
  );
}
