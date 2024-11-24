import express from 'express';
import { productController } from './stationary.controller';

const router = express.Router();

//All Routes for stationary
router.post('/', productController.createStationaryProduct);
router.get('/', productController.getAllStationaryProducts);
router.get('/:productId', productController.getStationaryProductById);
router.put('/:productId', productController.updateStationaryProduct);
router.delete('/:productId', productController.deleteStationaryProduct);

export const productRoutes = router;
