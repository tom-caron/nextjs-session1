import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import FollowButton from "@/components/FollowButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Explorer · LinkUp",
};

export default async function ExplorePage() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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

              <p className="user-handle">{user.handle}</p>
              <p className="user-email">{user.email}</p>
            </div>

            <FollowButton />
          </div>
        </div>
      ))}
    </div>
  );
}
