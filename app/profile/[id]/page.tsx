import Link from "next/link";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  company: { name: string };
  address: { city: string };
};

type Post = {
  id: number;
  title: string;
  body: string;
};

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const users: User[] = await fetch(
    "https://jsonplaceholder.typicode.com/users",
  ).then((res) => res.json());

  return users.map((user) => ({
    id: String(user.id),
  }));
}

export default async function UserProfilePage({ params }: Props) {
  const { id } = await params;

  const [userRes, postsRes] = await Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      next: { revalidate: 300 },
    }),
    fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`, {
      next: { revalidate: 60 },
    }),
  ]);

  if (!userRes.ok) {
    throw new Error(`Utilisateur ${id} introuvable`);
  }

  if (!postsRes.ok) {
    throw new Error("Impossible de charger les posts");
  }

  const [user, posts]: [User, Post[]] = await Promise.all([
    userRes.json(),
    postsRes.json(),
  ]);

  if (!user.id) {
    throw new Error(`Utilisateur ${id} introuvable`);
  }

  return (
    <div className="container">
      <Link href="/explore" className="back-link">
        ← Retour à Explorer
      </Link>
      <div className="profile-card">
        <div className="avatar">👤</div>

        <h1 className="profile-name">{user.name}</h1>
        <p className="profile-handle">@{user.username}</p>

        <p className="profile-bio">
          {user.company.name} · {user.address.city}
        </p>

        <p className="profile-joined">{user.email}</p>
      </div>

      <h2>Posts ({posts.length})</h2>

      {posts.map((post) => (
        <div key={post.id} className="api-post-card">
          <p className="api-post-title">{post.title}</p>
          <p className="api-post-body">{post.body}</p>
        </div>
      ))}
    </div>
  );
}
