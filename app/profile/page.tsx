import type { Metadata } from "next";
import PostCard from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Mon profil · LinkUp",
};

const currentUser = {
  name: "Alice Martin",
  handle: "@alice_dev",
  bio: "Développeuse full-stack · Next.js addict · Coffee ☕",
  followers: 312,
  following: 148,
  joinedDate: "Septembre 2024",
};

const myPosts = [
  {
    id: 1,
    content: "Je viens de déployer mon premier projet Next.js 🚀",
    likes: 24,
    time: "Il y a 2h",
  },
  {
    id: 2,
    content:
      "Les hooks React sont vraiment puissants quand on les maîtrise 💡",
    likes: 15,
    time: "Hier",
  },
];

export default function ProfilePage() {
  return (
    <div className="container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">A</div>

          <div>
            <h1 className="profile-name">{currentUser.name}</h1>
            <p className="profile-handle">{currentUser.handle}</p>
            <p className="profile-bio">{currentUser.bio}</p>
            <p className="profile-posts">{myPosts.length} posts</p>

            <div className="profile-stats">
              <span>
                <strong>{currentUser.followers}</strong> abonnés
              </span>
              <span>
                <strong>{currentUser.following}</strong> abonnements
              </span>
            </div>

            <p className="profile-joined">Inscrite en {currentUser.joinedDate}</p>
          </div>
        </div>
      </div>

      <h2>Mes posts</h2>

      {myPosts.map((post) => (
        <PostCard
          key={post.id}
          author={currentUser.name}
          handle={currentUser.handle}
          content={post.content}
          likes={post.likes}
          time={post.time}
        />
      ))}
    </div>
  );
}