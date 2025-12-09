import apiClient, { handleApiResponse, handleApiError } from '@/lib/api-client';
import { Review, ProductReviewStats, CreateReviewData } from '@/types/api';

export const reviewsApi = {
  /**
   * Get product reviews with statistics
   */
  getProductReviews: async (productId: string): Promise<ProductReviewStats> => {
    try {
      const response = await apiClient.get(`/reviews/products/${productId}`);
      return handleApiResponse<ProductReviewStats>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get single review by ID
   */
  getById: async (id: string): Promise<Review> => {
    try {
      const response = await apiClient.get(`/reviews/${id}`);
      return handleApiResponse<Review>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get user's own reviews
   */
  getUserReviews: async (): Promise<Review[]> => {
    try {
      const response = await apiClient.get('/reviews/user/me');
      return handleApiResponse<Review[]>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Check if user can review a product
   */
  canReview: async (productId: string): Promise<boolean> => {
    try {
      const response = await apiClient.get(`/reviews/can-review/${productId}`);
      return handleApiResponse<{ canReview: boolean }>(response).data!.canReview;
    } catch (error) {
      return false;
    }
  },

  /**
   * Create a review
   */
  create: async (data: CreateReviewData): Promise<Review> => {
    try {
      const response = await apiClient.post('/reviews', data);
      return handleApiResponse<Review>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Update a review
   */
  update: async (id: string, data: Partial<CreateReviewData>): Promise<Review> => {
    try {
      const response = await apiClient.put(`/reviews/${id}`, data);
      return handleApiResponse<Review>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Delete a review
   */
  delete: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/reviews/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
