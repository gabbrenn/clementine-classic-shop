import { Router } from 'express';
import { InventoryController } from '../controllers/inventory.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// All inventory routes require authentication and admin privileges
router.use(authenticateToken);
router.use(requireAdmin);

// Inventory logs
router.get('/logs', InventoryController.getAllInventoryLogs);
router.get('/logs/product/:productId', InventoryController.getProductInventoryLogs);

// Stock management
router.post('/adjust', InventoryController.adjustStock);
router.post('/bulk-adjust', InventoryController.bulkAdjustStock);

// Inventory alerts and monitoring
router.get('/alerts', InventoryController.getInventoryAlerts);
router.get('/summary', InventoryController.getInventorySummary);

// Reports
router.get('/valuation', InventoryController.getInventoryValuation);
router.get('/turnover', InventoryController.getInventoryTurnover);
router.get('/movement', InventoryController.getStockMovement);

// Reconciliation
router.post('/reconcile', InventoryController.reconcileInventory);

// Recommendations
router.get('/restock-recommendations', InventoryController.getRestockRecommendations);

export default router;
