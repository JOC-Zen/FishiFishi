import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/lib/auth";
import { redirect } from "next/navigation";

export interface UserSession {
  user: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "CLIENT";
    tier: "GOLD" | "SILVER" | "BRONZE" | null;
  };
}

/**
 * AuthService
 * Handles server-side session validation and role-based redirection.
 */
export class AuthService {
  /**
   * Validates the current session and returns the user object.
   * Redirects to home if no session exists.
   */
  static async validateSession() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/");
    return session as unknown as UserSession;
  }

  /**
   * Ensures the current user has the specified role.
   */
  static async requireRole(role: "ADMIN" | "CLIENT") {
    const session = await this.validateSession();
    if (session.user.role !== role) {
      redirect(session.user.role === "ADMIN" ? "/dashboard" : "/portal");
    }
    return session;
  }
}
