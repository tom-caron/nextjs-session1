import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }

      return session;
    },

    async signIn({ user, profile }) {
      const githubProfile = profile as { login?: string } | undefined;

      if (user.id && githubProfile?.login) {
        try {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              handle: "@" + githubProfile.login,
            },
          });
        } catch {
          // Si le handle est déjà pris, on ignore pour éviter de bloquer la connexion.
        }
      }

      return true;
    },
  },
});