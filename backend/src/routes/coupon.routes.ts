import { Router } from 'express';
import {
  createCoupon,
  getAllCoupons,
  getCouponById,
  getCouponByCode,
  updateCoupon,
  deleteCoupon,
  validateCoupon,
  applyCoupon,
  getUserCouponUsage,
  getAvailableCoupons,
  getCouponStats,
  deactivateExpiredCoupons,
  getTopPerformingCoupons,
} from '../controllers/coupon.controller';
import { authenticateToken, requireAdmin, optionalAuth } from '../middleware/auth.middleware';

const router = Router();

// Public routes (with optional auth)
router.get('/available', optionalAuth, getAvailableCoupons);

// User routes (requires authentication)
router.post('/validate/:code', authenticateToken, validateCoupon);
router.post('/apply/:id', authenticateToken, applyCoupon);
router.get('/my-usage', authenticateToken, getUserCouponUsage);

// Admin routes
router.get('/', authenticateToken, requireAdmin, getAllCoupons);
router.get('/stats', authenticateToken, requireAdmin, getCouponStats);
router.get('/top-performing', authenticateToken, requireAdmin, getTopPerformingCoupons);
router.post('/', authenticateToken, requireAdmin, createCoupon);
router.get('/code/:code', authenticateToken, requireAdmin, getCouponByCode);
router.get('/:id', authenticateToken, requireAdmin, getCouponById);
router.put('/:id', authenticateToken, requireAdmin, updateCoupon);
router.delete('/:id', authenticateToken, requireAdmin, deleteCoupon);
router.post('/deactivate-expired', authenticateToken, requireAdmin, deactivateExpiredCoupons);

export default router;
