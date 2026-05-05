export type Post = {
  id: number;
  author: string;
  handle: string;
  content: string;
  likes: number;
  createdAt: string;
};

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Alice Martin",
    handle: "@alice_dev",
    content: "Je viens de déployer mon premier projet Next.js 🚀",
    likes: 24,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    author: "Bob Nguyen",
    handle: "@bob_codes",
    content:
      "Les Server Components changent vraiment la façon de penser le rendu !",
    likes: 18,
    createdAt: "2024-01-15T08:30:00Z",
  },
  {
    id: 3,
    author: "Clara Dubois",
    handle: "@clara_ui",
    content:
      "Tailwind ou CSS classique avec Next.js ? Curieuse des pratiques !",
    likes: 41,
    createdAt: "2024-01-14T18:00:00Z",
  },
];

const globalForPosts = globalThis as unknown as {
  posts?: Post[];
};

if (!globalForPosts.posts) {
  globalForPosts.posts = initialPosts;
}

export const getAllPosts = () => [...globalForPosts.posts!];

export const getPostById = (id: number) =>
  globalForPosts.posts!.find((post) => post.id === id);

export const createPost = (
  data: Omit<Post, "id" | "createdAt" | "likes">
) => {
  const newPost: Post = {
    id: Date.now(),
    ...data,
    likes: 0,
    createdAt: new Date().toISOString(),
  };

  globalForPosts.posts = [newPost, ...globalForPosts.posts!];

  return newPost;
};

export const updatePost = (id: number, data: Partial<Post>) => {
  globalForPosts.posts = globalForPosts.posts!.map((post) =>
    post.id === id ? { ...post, ...data } : post
  );

  return globalForPosts.posts.find((post) => post.id === id);
};

export const deletePost = (id: number) => {
  const exists = globalForPosts.posts!.some((post) => post.id === id);

  globalForPosts.posts = globalForPosts.posts!.filter(
    (post) => post.id !== id
  );

  return exists;
};

export const toggleLike = (id: number, increment: boolean) => {
  globalForPosts.posts = globalForPosts.posts!.map((post) =>
    post.id === id
      ? { ...post, likes: post.likes + (increment ? 1 : -1) }
      : post
  );

  return globalForPosts.posts.find((post) => post.id === id);
};