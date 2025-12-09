import apiClient, { handleApiResponse, handleApiError } from '@/lib/api-client';
import { Cart, CartItem } from '@/types/api';

export const cartApi = {
  /**
   * Get user's cart
   */
  get: async (): Promise<Cart> => {
    try {
      const response = await apiClient.get('/cart');
      return handleApiResponse<Cart>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Add item to cart
   */
  addItem: async (data: {
    productId: string;
    quantity: number;
    size?: string;
    color?: string;
  }): Promise<CartItem> => {
    try {
      const response = await apiClient.post('/cart/items', data);
      return handleApiResponse<CartItem>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Update cart item quantity
   */
  updateItem: async (itemId: string, quantity: number): Promise<CartItem> => {
    try {
      const response = await apiClient.put(`/cart/items/${itemId}`, { quantity });
      return handleApiResponse<CartItem>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Remove item from cart
   */
  removeItem: async (itemId: string): Promise<void> => {
    try {
      await apiClient.delete(`/cart/items/${itemId}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Clear entire cart
   */
  clear: async (): Promise<void> => {
    try {
      await apiClient.delete('/cart');
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Apply coupon to cart
   */
  applyCoupon: async (code: string): Promise<Cart> => {
    try {
      const response = await apiClient.post('/cart/coupon', { code });
      return handleApiResponse<Cart>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Remove coupon from cart
   */
  removeCoupon: async (): Promise<Cart> => {
    try {
      const response = await apiClient.delete('/cart/coupon');
      return handleApiResponse<Cart>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get cart summary (totals)
   */
  getSummary: async (): Promise<{
    subtotal: number;
    discount: number;
    tax: number;
    shippingCost: number;
    total: number;
  }> => {
    try {
      const response = await apiClient.get('/cart/summary');
      return handleApiResponse(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
