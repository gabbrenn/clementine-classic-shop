import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// All cart routes require authentication
router.use(authenticateToken);

// Get user's cart
router.get('/', CartController.getCart);

// Get cart item count
router.get('/count', CartController.getCartItemCount);

// Validate cart before checkout
router.get('/validate', CartController.validateCart);

// Add item to cart
router.post('/items', CartController.addItem);

// Update cart item quantity
router.patch('/items/:cartItemId', CartController.updateItemQuantity);

// Remove item from cart
router.delete('/items/:cartItemId', CartController.removeItem);

// Clear cart
router.delete('/clear', CartController.clearCart);

// Apply coupon
router.post('/coupon', CartController.applyCoupon);

// Remove coupon
router.delete('/coupon', CartController.removeCoupon);

// Merge guest cart with user cart
router.post('/merge', CartController.mergeGuestCart);

export default router;
