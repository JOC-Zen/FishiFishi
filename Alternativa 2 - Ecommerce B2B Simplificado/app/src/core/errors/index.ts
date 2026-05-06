/**
 * Errores de dominio personalizados para FishiFishi B2B.
 * Estos errores son agnósticos al framework y se usan
 * tanto en servicios como en API routes.
 */

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id
      ? `${resource} con ID "${id}" no fue encontrado.`
      : `${resource} no encontrado.`;
    super(message, 404);
  }
}

export class ValidationError extends AppError {
  public readonly field?: string;

  constructor(message: string, field?: string) {
    super(message, 400);
    this.field = field;
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = "No tienes autorización para esta acción.") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "No tienes permisos suficientes.") {
    super(message, 403);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}
