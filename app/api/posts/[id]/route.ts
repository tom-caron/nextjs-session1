import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      author: true,
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Post introuvable" }, { status: 404 });
  }

  return NextResponse.json(post);
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params;

  const { content } = await request.json();

  if (!content) {
    return NextResponse.json({ error: "content requis" }, { status: 400 });
  }

  if (content.length > 280) {
    return NextResponse.json(
      { error: "Le contenu ne peut pas dépasser 280 caractères" },
      { status: 400 },
    );
  }

  try {
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        content,
      },
      include: {
        author: true,
      },
    });

    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Post introuvable" }, { status: 404 });
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;

  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Post introuvable" }, { status: 404 });
  }

  if (post.authorId !== session.user.id) {
    return NextResponse.json(
      { error: "Interdit — vous n'êtes pas l'auteur de ce post" },
      { status: 403 },
    );
  }

  await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });

  return new Response(null, { status: 204 });
}
