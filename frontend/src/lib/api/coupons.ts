import apiClient, { handleApiResponse, handleApiError } from '@/lib/api-client';
import { Coupon, CouponValidation } from '@/types/api';

export const couponsApi = {
  /**
   * Get available coupons
   */
  getAvailable: async (): Promise<Coupon[]> => {
    try {
      const response = await apiClient.get('/coupons/available');
      return handleApiResponse<Coupon[]>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get coupon by code
   */
  getByCode: async (code: string): Promise<Coupon> => {
    try {
      const response = await apiClient.get(`/coupons/code/${code}`);
      return handleApiResponse<Coupon>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Validate coupon
   */
  validate: async (code: string, orderTotal: number): Promise<CouponValidation> => {
    try {
      const response = await apiClient.post('/coupons/validate', { code, orderTotal });
      return handleApiResponse<CouponValidation>(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  /**
   * Get user's coupon usage history
   */
  getUserUsage: async (): Promise<any[]> => {
    try {
      const response = await apiClient.get('/coupons/user/usage');
      return handleApiResponse(response).data!;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
