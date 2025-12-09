import { Request, Response } from 'express';
import { WishlistService } from '../services/wishlist.service';

export class WishlistController {
  /**
   * Get user's wishlist
   */
  static async getWishlist(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const wishlist = await WishlistService.getUserWishlist(userId);
      res.json(wishlist);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching wishlist',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Add product to wishlist
   */
  static async addToWishlist(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const { productId } = req.body;

      if (!productId) {
        return res.status(400).json({ message: 'Product ID is required' });
      }

      const item = await WishlistService.addToWishlist(userId, productId);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Product not found') {
          return res.status(404).json({ message: error.message });
        }
        if (error.message === 'Product already in wishlist') {
          return res.status(409).json({ message: error.message });
        }
      }
      res.status(500).json({
        message: 'Error adding to wishlist',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Remove item from wishlist
   */
  static async removeFromWishlist(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const { id } = req.params;

      await WishlistService.removeFromWishlist(userId, id);
      res.json({ message: 'Item removed from wishlist' });
    } catch (error) {
      if (error instanceof Error && error.message === 'Wishlist item not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({
        message: 'Error removing from wishlist',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Remove product from wishlist by product ID
   */
  static async removeByProductId(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const { productId } = req.params;

      await WishlistService.removeByProductId(userId, productId);
      res.json({ message: 'Product removed from wishlist' });
    } catch (error) {
      if (error instanceof Error && error.message === 'Product not in wishlist') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({
        message: 'Error removing from wishlist',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Check if product is in wishlist
   */
  static async checkInWishlist(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const { productId } = req.params;

      const inWishlist = await WishlistService.isInWishlist(userId, productId);
      res.json({ inWishlist });
    } catch (error) {
      res.status(500).json({
        message: 'Error checking wishlist',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Clear wishlist
   */
  static async clearWishlist(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const count = await WishlistService.clearWishlist(userId);
      res.json({ message: 'Wishlist cleared', itemsRemoved: count });
    } catch (error) {
      res.status(500).json({
        message: 'Error clearing wishlist',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get wishlist count
   */
  static async getCount(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const count = await WishlistService.getCount(userId);
      res.json({ count });
    } catch (error) {
      res.status(500).json({
        message: 'Error getting wishlist count',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Move wishlist items to cart
   */
  static async moveToCart(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const movedCount = await WishlistService.moveToCart(userId);
      res.json({
        message: 'Items moved to cart',
        movedCount,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error moving items to cart',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
