import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./prisma";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (user && user.password === credentials.password) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
              tier: user.tier,
              status: user.status,
            };
          }
        } catch (error) {
          console.warn("Auth DB not available, checking for demo credentials.");
        }

        // Demo fallback
        if (credentials.email === "admin@fishifishi.com" && credentials.password === "admin123") {
          return {
            id: "demo-id",
            email: "admin@fishifishi.com",
            name: "Admin Demo",
            role: "ADMIN",
            tier: "GOLD",
            status: "ACTIVE",
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.tier = user.tier;
        token.status = user.status;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        session.user.tier = token.tier;
        session.user.status = token.status;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
};
