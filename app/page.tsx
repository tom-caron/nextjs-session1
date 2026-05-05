export const dynamic = "force-dynamic";

import { getAllPosts } from "@/lib/store";
import PostCard from "@/components/PostCard";
import NewPostForm from "@/components/NewPostForm";

export default async function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="container">
      <h1>Fil d’actualité</h1>

      <NewPostForm />

      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          author={post.author}
          handle={post.handle}
          content={post.content}
          likes={post.likes}
          time={new Date(post.createdAt).toLocaleDateString("fr-FR")}
        />
      ))}
    </div>
  );
}
