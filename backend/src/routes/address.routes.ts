import { Router } from 'express';
import { AddressController } from '../controllers/address.controller';
import { authenticateToken } from '../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

// Get all addresses for logged-in user
router.get('/', AddressController.getAll);

// Get default address
router.get('/default', AddressController.getDefault);

// Get address by ID
router.get('/:id', AddressController.getById);

// Create new address
router.post('/', AddressController.create);

// Update address
router.put('/:id', AddressController.update);

// Set address as default
router.patch('/:id/default', AddressController.setDefault);

// Delete address
router.delete('/:id', AddressController.delete);

export default router;
