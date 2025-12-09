import { Request, Response } from 'express';
import { InventoryService } from '../services/inventory.service';
import { InventoryLogType } from '@prisma/client';

export class InventoryController {
  /**
   * Get product inventory logs
   */
  static async getProductInventoryLogs(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const type = req.query.type as InventoryLogType | undefined;

      const result = await InventoryService.getProductInventoryLogs(
        productId,
        page,
        limit,
        type
      );
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get all inventory logs (admin)
   */
  static async getAllInventoryLogs(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const type = req.query.type as InventoryLogType | undefined;
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

      const result = await InventoryService.getAllInventoryLogs(
        page,
        limit,
        type,
        startDate,
        endDate
      );
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Adjust stock quantity
   */
  static async adjustStock(req: Request, res: Response) {
    try {
      const { productId, quantity, type, reason } = req.body;

      if (!productId || quantity === undefined || !type || !reason) {
        return res.status(400).json({ 
          error: 'Product ID, quantity, type, and reason are required' 
        });
      }

      const validTypes = ['RESTOCK', 'SALE', 'RETURN', 'DAMAGED', 'ADJUSTMENT'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({ error: 'Invalid inventory log type' });
      }

      const result = await InventoryService.adjustStock({
        productId,
        quantity,
        type,
        reason,
      });

      res.json(result);
    } catch (error: any) {
      if (error.message === 'Product not found') {
        return res.status(404).json({ error: error.message });
      }
      if (
        error.message.includes('must be positive') ||
        error.message.includes('must be negative') ||
        error.message.includes('Insufficient stock')
      ) {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Bulk stock adjustment
   */
  static async bulkAdjustStock(req: Request, res: Response) {
    try {
      const { adjustments } = req.body;

      if (!adjustments || !Array.isArray(adjustments)) {
        return res.status(400).json({ error: 'Adjustments array is required' });
      }

      if (adjustments.length === 0) {
        return res.status(400).json({ error: 'At least one adjustment is required' });
      }

      // Validate each adjustment
      for (const adj of adjustments) {
        if (!adj.productId || adj.quantity === undefined || !adj.type || !adj.reason) {
          return res.status(400).json({ 
            error: 'Each adjustment must have productId, quantity, type, and reason' 
          });
        }
      }

      const result = await InventoryService.bulkAdjustStock(adjustments);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get inventory alerts
   */
  static async getInventoryAlerts(req: Request, res: Response) {
    try {
      const threshold = parseInt(req.query.threshold as string) || 10;
      const alerts = await InventoryService.getInventoryAlerts(threshold);
      res.json(alerts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get inventory summary
   */
  static async getInventorySummary(req: Request, res: Response) {
    try {
      const summary = await InventoryService.getInventorySummary();
      res.json(summary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get inventory valuation report
   */
  static async getInventoryValuation(req: Request, res: Response) {
    try {
      const valuation = await InventoryService.getInventoryValuation();
      res.json(valuation);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get inventory turnover report
   */
  static async getInventoryTurnover(req: Request, res: Response) {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const turnover = await InventoryService.getInventoryTurnover(days);
      res.json(turnover);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get stock movement report
   */
  static async getStockMovement(req: Request, res: Response) {
    try {
      const productId = req.query.productId as string | undefined;
      const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
      const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;

      const movement = await InventoryService.getStockMovement(
        startDate,
        endDate,
        productId
      );
      res.json(movement);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Reconcile inventory
   */
  static async reconcileInventory(req: Request, res: Response) {
    try {
      const { actualCounts } = req.body;

      if (!actualCounts || !Array.isArray(actualCounts)) {
        return res.status(400).json({ error: 'Actual counts array is required' });
      }

      if (actualCounts.length === 0) {
        return res.status(400).json({ error: 'At least one count is required' });
      }

      // Validate each count
      for (const count of actualCounts) {
        if (!count.productId || count.actualCount === undefined) {
          return res.status(400).json({ 
            error: 'Each count must have productId and actualCount' 
          });
        }
      }

      const result = await InventoryService.reconcileInventory(actualCounts);
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get restock recommendations
   */
  static async getRestockRecommendations(req: Request, res: Response) {
    try {
      const threshold = parseInt(req.query.threshold as string) || 10;
      const daysToAnalyze = parseInt(req.query.days as string) || 30;

      const recommendations = await InventoryService.getRestockRecommendations(
        threshold,
        daysToAnalyze
      );
      res.json(recommendations);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
