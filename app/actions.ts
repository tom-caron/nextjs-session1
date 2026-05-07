"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const createPostSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, "Le contenu ne peut pas être vide")
    .max(280, "Maximum 280 caractères"),
});

const createCommentSchema = z.object({
  postId: z.coerce.number().int().positive("Post invalide"),
  content: z
    .string()
    .trim()
    .min(1, "Le commentaire ne peut pas être vide")
    .max(500, "Maximum 500 caractères"),
});

export async function createPost(
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Vous devez être connecté pour publier" };
  }

  const result = createPostSchema.safeParse({
    content: formData.get("content"),
  });

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  await prisma.post.create({
    data: {
      content: result.data.content,
      authorId: session.user.id,
    },
  });

  revalidatePath("/");

  return { success: true };
}

export async function createComment(
  _prevState: { error?: string; success?: boolean } | null,
  formData: FormData,
) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Vous devez être connecté pour commenter" };
  }

  const result = createCommentSchema.safeParse({
    postId: formData.get("postId"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  await prisma.comment.create({
    data: {
      content: result.data.content,
      postId: result.data.postId,
      authorId: session.user.id,
    },
  });

  revalidatePath(`/posts/${result.data.postId}`);

  return { success: true };
}
