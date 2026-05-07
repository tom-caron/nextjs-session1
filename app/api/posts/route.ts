import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const limit = Number(searchParams.get("limit") ?? 20);

  const posts = await prisma.post.findMany({
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });

  return NextResponse.json({
    posts,
    total: posts.length,
  });
}

export async function POST(request: Request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON invalide" }, { status: 400 });
  }

  const { content } = body;

  if (!content) {
    return NextResponse.json({ error: "content requis" }, { status: 400 });
  }

  if (content.length > 280) {
    return NextResponse.json(
      { error: "Le contenu ne peut pas dépasser 280 caractères" },
      { status: 400 },
    );
  }

  const post = await prisma.post.create({
    data: {
      content,
      authorId: session.user.id,
    },
    include: {
      author: true,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
