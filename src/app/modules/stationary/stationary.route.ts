import express from 'express';
import { productController } from './stationary.controller';
import { authorizeRoles, verifyToken } from '../auth/auth.middleware';

const router = express.Router();

//All Routes for stationary
router.post('/',verifyToken,authorizeRoles('admin'), productController.createStationaryProduct);
router.get('/', productController.getAllStationaryProducts);
router.get('/:productId', productController.getStationaryProductById);
router.put('/:productId',verifyToken,authorizeRoles('admin'), productController.updateStationaryProduct);
router.delete('/:productId',verifyToken,authorizeRoles('admin'), productController.deleteStationaryProduct);

export const productRoutes = router;
