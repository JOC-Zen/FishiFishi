/**
 * Entidad de dominio: Usuario/Cliente B2B.
 * Representa a un cliente mayorista o administrador del sistema.
 *
 * Esta interfaz es agnóstica al framework: no depende de React,
 * Next.js ni Prisma. Es TypeScript puro.
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
  /** Nivel de cliente para precios escalonados (Tier 1 = mejor precio) */
  pricingTier: number;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Datos necesarios para crear un nuevo usuario.
 * Excluye campos que se generan automáticamente.
 */
export type CreateUserInput = Omit<User, "id" | "createdAt" | "updatedAt" | "status"> & {
  password: string;
};

/**
 * Datos editables del perfil de usuario.
 */
export type UpdateUserInput = Partial<Pick<User, "name" | "companyName" | "phone" | "pricingTier">>;
