import type { Metadata } from "next";
import FollowButton from "@/components/FollowButton";

export const metadata: Metadata = {
  title: "Explorer · LinkUp",
};

const suggestedUsers = [
  {
    id: 1,
    name: "David Chen",
    handle: "@david_ts",
    bio: "TypeScript fanatic 💙",
    followers: 1240,
  },
  {
    id: 2,
    name: "Eva Rossi",
    handle: "@eva_design",
    bio: "UI/UX · CSS lover 🎨",
    followers: 3800,
  },
  {
    id: 3,
    name: "Frank Müller",
    handle: "@frank_devops",
    bio: "DevOps · K8s · CI/CD 🛠️",
    followers: 920,
  },
  {
    id: 4,
    name: "Giulia Romano",
    handle: "@giulia_ml",
    bio: "ML · Python 🤖",
    followers: 5600,
  },
];

export default function ExplorePage() {
  return (
    <div className="container">
      <h1>Explorer</h1>

      {suggestedUsers.map((user) => (
        <div key={user.id} className="user-card">
          <div className="user-row">
            <div>
              <h2 className="user-name">{user.name}</h2>
              <p className="user-handle">{user.handle}</p>
              <p className="user-bio">{user.bio}</p>
              <p className="user-followers">
                {user.followers.toLocaleString("fr-FR")} abonnés
              </p>
            </div>

            <FollowButton />
          </div>
        </div>
      ))}
    </div>
  );
}