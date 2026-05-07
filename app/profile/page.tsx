import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      posts: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <div className="container">
      <div className="profile-card">
        <div className="profile-header">
          {user.image ? (
            <img src={user.image} alt="Avatar" className="profile-avatar-img" />
          ) : (
            <div className="avatar">👤</div>
          )}

          <div>
            <h1 className="profile-name">{user.name}</h1>

            {user.handle && <p className="profile-handle">{user.handle}</p>}

            {user.email && <p className="profile-bio">{user.email}</p>}
          </div>
        </div>
      </div>

      <h2>Mes posts ({user.posts.length})</h2>

      {user.posts.map((post) => (
        <div key={post.id} className="api-post-card">
          <p className="api-post-body">{post.content}</p>
          <small className="likes">❤️ {post.likes}</small>
        </div>
      ))}
    </div>
  );
}
