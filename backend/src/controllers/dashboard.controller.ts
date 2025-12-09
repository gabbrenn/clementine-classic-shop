import { Request, Response } from 'express';
import { DashboardService } from '../services/dashboard.service';

export class DashboardController {
  /**
   * Get overall statistics
   */
  static async getOverallStats(req: Request, res: Response) {
    try {
      const stats = await DashboardService.getOverallStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching statistics',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get sales analytics
   */
  static async getSalesAnalytics(req: Request, res: Response) {
    try {
      const { period = 'month' } = req.query;
      const validPeriods = ['week', 'month', 'year'];
      
      if (!validPeriods.includes(period as string)) {
        return res.status(400).json({ message: 'Invalid period. Must be week, month, or year' });
      }

      const analytics = await DashboardService.getSalesAnalytics(period as 'week' | 'month' | 'year');
      res.json(analytics);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching sales analytics',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get top selling products
   */
  static async getTopProducts(req: Request, res: Response) {
    try {
      const { limit = '10' } = req.query;
      const products = await DashboardService.getTopProducts(parseInt(limit as string));
      res.json(products);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching top products',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get recent orders
   */
  static async getRecentOrders(req: Request, res: Response) {
    try {
      const { limit = '10' } = req.query;
      const orders = await DashboardService.getRecentOrders(parseInt(limit as string));
      res.json(orders);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching recent orders',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get revenue by category
   */
  static async getRevenueByCategory(req: Request, res: Response) {
    try {
      const revenue = await DashboardService.getRevenueByCategory();
      res.json(revenue);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching revenue by category',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get low stock alert
   */
  static async getLowStockAlert(req: Request, res: Response) {
    try {
      const { threshold = '10' } = req.query;
      const products = await DashboardService.getLowStockAlert(parseInt(threshold as string));
      res.json(products);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching low stock alert',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get customer insights
   */
  static async getCustomerInsights(req: Request, res: Response) {
    try {
      const insights = await DashboardService.getCustomerInsights();
      res.json(insights);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching customer insights',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
