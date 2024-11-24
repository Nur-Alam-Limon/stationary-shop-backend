import express from 'express';
import * as OrderController from './orders.controller';

const router = express.Router();

//All Order Routes
router.post('/', OrderController.createOrder); // Place an order
router.get('/', OrderController.getAllOrders); // Get all orders
router.get('/revenue', OrderController.getRevenue); // Calculate revenue

export const OrderRoutes = router;
