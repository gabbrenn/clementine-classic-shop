import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// All order routes require authentication
router.use(authenticateToken);

// User routes
router.post('/', OrderController.createOrder);
router.get('/my-orders', OrderController.getUserOrders);
router.get('/:orderId', OrderController.getOrderById);
router.get('/number/:orderNumber', OrderController.getOrderByNumber);
router.post('/:orderId/cancel', OrderController.cancelOrder);

// Admin routes
router.get('/admin/all', requireAdmin, OrderController.getAllOrders);
router.get('/admin/stats', requireAdmin, OrderController.getOrderStats);
router.get('/admin/recent', requireAdmin, OrderController.getRecentOrders);
router.patch('/admin/:orderId/status', requireAdmin, OrderController.updateOrderStatus);
router.patch('/admin/:orderId/payment-status', requireAdmin, OrderController.updatePaymentStatus);

export default router;
