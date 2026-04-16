import PostCard from "@/components/PostCard";

type Post = {
  id: number;
  author: string;
  handle: string;
  content: string;
  likes: number;
  time: string;
};

const posts: Post[] = [
  {
    id: 1,
    author: "Alice Martin",
    handle: "@alice_dev",
    content: "Je viens de déployer mon premier projet Next.js 🚀",
    likes: 24,
    time: "Il y a 2h",
  },
  {
    id: 2,
    author: "Bob Nguyen",
    handle: "@bob_codes",
    content:
      "Les Server Components changent vraiment la façon de penser le rendu !",
    likes: 18,
    time: "Il y a 4h",
  },
  {
    id: 3,
    author: "Clara Dubois",
    handle: "@clara_ui",
    content:
      "Tailwind ou CSS classique avec Next.js ? Curieuse des pratiques de votre équipe !",
    likes: 41,
    time: "Il y a 6h",
  },
];

export default function Home() {
  return (
    <div className="container">
      <h1>Fil d’actualité</h1>

      {posts.map((post) => (
        <PostCard
          key={post.id}
          author={post.author}
          handle={post.handle}
          content={post.content}
          likes={post.likes}
          time={post.time}
        />
      ))}
    </div>
  );
}