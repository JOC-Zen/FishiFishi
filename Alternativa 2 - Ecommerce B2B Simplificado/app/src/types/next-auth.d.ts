import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      tier: string;
      status: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
    tier: string;
    status: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    tier: string;
    status: string;
  }
}
