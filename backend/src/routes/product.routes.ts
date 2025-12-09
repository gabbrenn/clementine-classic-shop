import { Router } from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  updateProductStock,
  getProductInventoryLogs,
  getFeaturedProducts,
  getLowStockProducts,
  getOutOfStockProducts,
  getProductStats,
  bulkUpdateProducts,
  searchProducts,
} from '../controllers/product.controller';
import { authenticateToken, requireAdmin, optionalAuth } from '../middleware/auth.middleware';

const router = Router();

// Public routes
router.get('/', getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/search', searchProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProductById);

// Admin routes
router.post('/', authenticateToken, requireAdmin, createProduct);
router.put('/:id', authenticateToken, requireAdmin, updateProduct);
router.delete('/:id', authenticateToken, requireAdmin, deleteProduct);
router.patch('/:id/stock', authenticateToken, requireAdmin, updateProductStock);
router.get('/:id/inventory-logs', authenticateToken, requireAdmin, getProductInventoryLogs);
router.get('/admin/low-stock', authenticateToken, requireAdmin, getLowStockProducts);
router.get('/admin/out-of-stock', authenticateToken, requireAdmin, getOutOfStockProducts);
router.get('/admin/stats', authenticateToken, requireAdmin, getProductStats);
router.post('/admin/bulk-update', authenticateToken, requireAdmin, bulkUpdateProducts);

export default router;
