// Example service structure
// This file demonstrates how to structure services

export class BaseService {
  protected handleError(error: unknown): never {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred');
  }
}
