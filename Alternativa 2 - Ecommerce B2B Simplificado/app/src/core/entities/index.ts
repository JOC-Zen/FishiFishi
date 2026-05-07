/**
 * Barrel export for all domain entities.
 * Allows importing any entity from '@/core/entities'.
 */

export type {
  User,
  UserRole,
  UserStatus,
  CreateUserInput,
  UpdateUserInput,
} from "./User";

export type {
  Product,
  ProductStatus,
  PriceTier,
  CreateProductInput,
  UpdateProductInput,
} from "./Product";

export type {
  Order,
  OrderStatus,
  OrderItem,
  CreateOrderInput,
} from "./Order";
