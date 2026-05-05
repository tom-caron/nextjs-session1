import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/store";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.toLowerCase().trim();

  if (!q) {
    return NextResponse.json({ posts: [], total: 0 });
  }

  const posts = getAllPosts().filter((post) => {
    return (
      post.content.toLowerCase().includes(q) ||
      post.author.toLowerCase().includes(q) ||
      post.handle.toLowerCase().includes(q)
    );
  });

  return NextResponse.json({
    posts,
    total: posts.length,
  });
}