import { Router } from 'express';
import { ReviewController } from '../controllers/review.controller';
import { authenticateToken, requireAdmin } from '../middleware/auth.middleware';

const router = Router();

// Public routes
// Get product reviews with stats
router.get('/products/:productId', ReviewController.getProductReviews);

// Get review by ID
router.get('/:id', ReviewController.getById);

// Protected routes (require authentication)
// Get user's own reviews
router.get('/user/me', authenticateToken, ReviewController.getUserReviews);

// Check if user can review a product
router.get('/can-review/:productId', authenticateToken, ReviewController.canReview);

// Create review
router.post('/', authenticateToken, ReviewController.create);

// Update own review
router.put('/:id', authenticateToken, ReviewController.update);

// Delete own review
router.delete('/:id', authenticateToken, ReviewController.delete);

// Admin routes
// Get all reviews with filters
router.get('/', authenticateToken, requireAdmin, ReviewController.getAll);

// Delete any review
router.delete('/admin/:id', authenticateToken, requireAdmin, ReviewController.adminDelete);

// Verify/unverify review
router.patch('/:id/verify', authenticateToken, requireAdmin, ReviewController.verifyReview);

export default router;
