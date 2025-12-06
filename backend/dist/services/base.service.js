"use strict";
// Example service structure
// This file demonstrates how to structure services
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
class BaseService {
    handleError(error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('An unexpected error occurred');
    }
}
exports.BaseService = BaseService;
