import Link from "next/link";

type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

type User = {
  id: number;
  name: string;
  username: string;
};

type EnrichedPost = Post & {
  author: string;
  handle: string;
};

async function getPostsWithUsers(): Promise<EnrichedPost[]> {
  const [postsRes, usersRes] = await Promise.all([
    fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=10",
      //"https://jsonplaceholder.typicode.com/posts-invalide",
      {
        next: { revalidate: 60 },
      },
    ),
    fetch("https://jsonplaceholder.typicode.com/users", {
      next: { revalidate: 300 },
    }),
  ]);

  if (!postsRes.ok || !usersRes.ok) {
    throw new Error("Erreur lors du chargement des données");
  }

  const [posts, users]: [Post[], User[]] = await Promise.all([
    postsRes.json(),
    usersRes.json(),
  ]);

  const usersById = Object.fromEntries(users.map((user) => [user.id, user]));

  return posts.map((post) => ({
    ...post,
    author: usersById[post.userId]?.name ?? "Inconnu",
    handle: "@" + (usersById[post.userId]?.username ?? "inconnu"),
  }));
}

export default async function HomePage() {
  const posts = await getPostsWithUsers();

  return (
    <div className="container">
      <h1>Fil d’actualité</h1>

      {posts.map((post) => (
        <article key={post.id} className="api-post-card">
          <div className="post-author-row">
            <strong>{post.author}</strong>
            <span className="api-handle">{post.handle}</span>
          </div>

          <Link href={`/posts/${post.id}`} className="post-link">
            <p className="api-post-title">{post.title}</p>
          </Link>
          <p className="api-post-body">{post.body}</p>
        </article>
      ))}
    </div>
  );
}
