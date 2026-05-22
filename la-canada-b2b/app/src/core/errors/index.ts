/**
 * Custom domain errors for La Cañada Seafood B2B.
 * These errors are framework-agnostic and are used
 * in both services and API routes.
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
      ? `${resource} with ID "${id}" was not found.`
      : `${resource} not found.`;
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
  constructor(message: string = "You are not authorized to perform this action.") {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = "You do not have sufficient permissions.") {
    super(message, 403);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}
