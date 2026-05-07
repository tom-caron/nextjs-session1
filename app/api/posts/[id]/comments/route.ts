import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;

  const comments = await prisma.comment.findMany({
    where: {
      postId: Number(id),
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
    },
  });

  return NextResponse.json({
    comments,
    total: comments.length,
  });
}
