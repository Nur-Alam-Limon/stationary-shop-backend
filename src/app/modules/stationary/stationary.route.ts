import express from 'express';
import { productController } from './stationary.controller';

const router = express.Router();

router.post('/api/products', productController.createStationaryProduct);
