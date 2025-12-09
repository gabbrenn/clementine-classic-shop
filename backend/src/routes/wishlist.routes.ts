import { Router } from 'express';
import { WishlistController } from '../controllers/wishlist.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Get wishlist
router.get('/', WishlistController.getWishlist);

// Get wishlist count
router.get('/count', WishlistController.getCount);

// Check if product is in wishlist
router.get('/check/:productId', WishlistController.checkInWishlist);

// Add to wishlist
router.post('/', WishlistController.addToWishlist);

// Move all items to cart
router.post('/move-to-cart', WishlistController.moveToCart);

// Remove from wishlist by item ID
router.delete('/:id', WishlistController.removeFromWishlist);

// Remove from wishlist by product ID
router.delete('/product/:productId', WishlistController.removeByProductId);

// Clear wishlist
router.delete('/', WishlistController.clearWishlist);

export default router;
