import { Router } from 'express';
import healthRoutes from './health.routes';

const router = Router();

// API Routes
router.use('/health', healthRoutes);

// Add more routes here as they are created
// router.use('/auth', authRoutes);
// router.use('/products', productRoutes);
// router.use('/users', userRoutes);
// router.use('/orders', orderRoutes);

export default router;
