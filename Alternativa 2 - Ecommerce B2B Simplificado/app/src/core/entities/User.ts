/**
 * Domain Entity: B2B User / Client.
 * Represents a wholesale customer or system administrator.
 *
 * This interface is framework-agnostic: it does not depend on React,
 * Next.js, or Prisma. Pure TypeScript.
 */

export type UserRole = "admin" | "client";

export type UserStatus = "active" | "pending" | "suspended";

export interface User {
  id: string;
  email: string;
  name: string;
  companyName: string;
  role: UserRole;
  status: UserStatus;
  /** Client tier for volume-based pricing (Tier 1 = best price) */
  pricingTier: number;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Data required to create a new user.
 * Excludes auto-generated fields.
 */
export type CreateUserInput = Omit<User, "id" | "createdAt" | "updatedAt" | "status"> & {
  password: string;
};

/**
 * Editable user profile fields.
 */
export type UpdateUserInput = Partial<Pick<User, "name" | "companyName" | "phone" | "pricingTier">>;
