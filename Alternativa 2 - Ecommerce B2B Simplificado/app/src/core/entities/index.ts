/**
 * Barrel export para todas las entidades del dominio.
 * Permite importar cualquier entidad desde '@/core/entities'.
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
