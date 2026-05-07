import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, { params }: Params) {
  const { id } = await params;

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "JSON invalide" },
      { status: 400 }
    );
  }

  const { increment } = body;

  if (typeof increment !== "boolean") {
    return NextResponse.json(
      { error: "increment doit être un booléen" },
      { status: 400 }
    );
  }

  try {
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        likes: {
          [increment ? "increment" : "decrement"]: 1,
        },
      },
    });

    return NextResponse.json({
      likes: post.likes,
    });
  } catch {
    return NextResponse.json(
      { error: "Post introuvable" },
      { status: 404 }
    );
  }
}