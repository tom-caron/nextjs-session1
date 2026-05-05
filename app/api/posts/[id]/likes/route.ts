import { NextResponse } from "next/server";
import { getPostById, toggleLike } from "@/lib/store";

type Params = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, { params }: Params) {
  const { id } = await params;

  const post = getPostById(Number(id));

  if (!post) {
    return NextResponse.json(
      { error: "Post introuvable" },
      { status: 404 }
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps JSON invalide" },
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

  const updated = toggleLike(Number(id), increment);

  return NextResponse.json({ likes: updated?.likes });
}