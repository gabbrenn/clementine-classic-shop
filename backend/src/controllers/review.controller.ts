import { Request, Response } from 'express';
import { ReviewService } from '../services/review.service';

export class ReviewController {
  /**
   * Get all reviews (with filters)
   */
  static async getAll(req: Request, res: Response) {
    try {
      const { productId, userId, rating, isVerified } = req.query;

      const filters: any = {};
      if (productId) filters.productId = productId as string;
      if (userId) filters.userId = userId as string;
      if (rating) filters.rating = parseInt(rating as string);
      if (isVerified !== undefined) filters.isVerified = isVerified === 'true';

      const reviews = await ReviewService.getAll(filters);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching reviews',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get product reviews with statistics
   */
  static async getProductReviews(req: Request, res: Response) {
    try {
      const { productId } = req.params;
      const result = await ReviewService.getProductReviews(productId);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching product reviews',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get review by ID
   */
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const review = await ReviewService.getById(id);
      res.json(review);
    } catch (error) {
      if (error instanceof Error && error.message === 'Review not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({
        message: 'Error fetching review',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Get user's own reviews
   */
  static async getUserReviews(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const reviews = await ReviewService.getUserReviews(userId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching user reviews',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Create review
   */
  static async create(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const { productId, rating, title, comment, images } = req.body;

      if (!productId || !rating || !comment) {
        return res.status(400).json({
          message: 'Required fields: productId, rating, comment',
        });
      }

      const review = await ReviewService.create(userId, {
        productId,
        rating,
        title,
        comment,
        images,
      });

      res.status(201).json(review);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Product not found') {
          return res.status(404).json({ message: error.message });
        }
        if (error.message === 'You have already reviewed this product') {
          return res.status(409).json({ message: error.message });
        }
        if (error.message === 'Rating must be between 1 and 5') {
          return res.status(400).json({ message: error.message });
        }
      }
      res.status(500).json({
        message: 'Error creating review',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Update review
   */
  static async update(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const { id } = req.params;
      const updateData = req.body;

      const review = await ReviewService.update(id, userId, updateData);
      res.json(review);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Review not found') {
          return res.status(404).json({ message: error.message });
        }
        if (error.message === 'Rating must be between 1 and 5') {
          return res.status(400).json({ message: error.message });
        }
      }
      res.status(500).json({
        message: 'Error updating review',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Delete review
   */
  static async delete(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const { id } = req.params;

      await ReviewService.delete(id, userId);
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      if (error instanceof Error && error.message === 'Review not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({
        message: 'Error deleting review',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Check if user can review product
   */
  static async canReview(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const { productId } = req.params;

      const canReview = await ReviewService.canUserReview(userId, productId);
      res.json({ canReview });
    } catch (error) {
      res.status(500).json({
        message: 'Error checking review eligibility',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Admin: Delete any review
   */
  static async adminDelete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await ReviewService.adminDelete(id);
      res.json({ message: 'Review deleted successfully' });
    } catch (error) {
      if (error instanceof Error && error.message === 'Review not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({
        message: 'Error deleting review',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  /**
   * Admin: Verify review
   */
  static async verifyReview(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { isVerified } = req.body;

      if (typeof isVerified !== 'boolean') {
        return res.status(400).json({ message: 'isVerified must be a boolean' });
      }

      const review = await ReviewService.verifyReview(id, isVerified);
      res.json(review);
    } catch (error) {
      if (error instanceof Error && error.message === 'Review not found') {
        return res.status(404).json({ message: error.message });
      }
      res.status(500).json({
        message: 'Error verifying review',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
}
