import type { Metadata } from "next";
import FollowButton from "@/components/FollowButton";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Explorer · LinkUp",
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  company: { name: string };
  address: { city: string };
};

async function getUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error("Impossible de charger les utilisateurs");
  }

  return res.json();
}

export default async function ExplorePage() {
  const users = await getUsers();

  return (
    <div className="container">
      <h1>Explorer</h1>

      {users.map((user) => (
        <div key={user.id} className="user-card">
          <div className="user-row">
            <div>
              <Link href={`/profile/${user.id}`} className="user-profile-link">
                <h2 className="user-name">{user.name}</h2>
              </Link>
              <p className="user-handle">@{user.username}</p>
              <p className="user-email">{user.email}</p>
              <p className="user-city">{user.address.city}</p>
            </div>
            <FollowButton />
          </div>
        </div>
      ))}
    </div>
  );
}
