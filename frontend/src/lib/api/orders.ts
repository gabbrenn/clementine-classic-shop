import apiClient, { handleApiResponse, handleApiError } from '@/lib/api-client';
import { Order, CreateOrderData, PaginatedResponse, PaginationParams } from '@/types/api';

export const ordersApi = {
  /**
   * Get user's orders
   */
  getAll: async (pagination?: PaginationParams): Promise<PaginatedResponse<Order>> => {
    try {
      const params = new URLSearchParams();
      if (pagination?.page) params.append('page', pagination.page.toString());
      if (pagination?.limit) params.append('limit', pagination.limit.toString());

      const response = await apiClient.get(`/orders?${params.toString()}`);
      return handleApiResponse<PaginatedResponse<Order>>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get single order by ID
   */
  getById: async (id: string): Promise<Order> => {
    try {
      const response = await apiClient.get(`/orders/${id}`);
      return handleApiResponse<Order>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get order by order number
   */
  getByNumber: async (orderNumber: string): Promise<Order> => {
    try {
      const response = await apiClient.get(`/orders/number/${orderNumber}`);
      return handleApiResponse<Order>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Create new order
   */
  create: async (orderData: CreateOrderData): Promise<Order> => {
    try {
      const response = await apiClient.post('/orders', orderData);
      return handleApiResponse<Order>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Cancel order
   */
  cancel: async (id: string): Promise<Order> => {
    try {
      const response = await apiClient.post(`/orders/${id}/cancel`);
      return handleApiResponse<Order>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
