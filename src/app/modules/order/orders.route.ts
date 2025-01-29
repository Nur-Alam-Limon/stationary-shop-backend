import express from 'express';
import * as OrderController from './orders.controller';
import { authorizeRoles, verifyToken } from '../auth/auth.middleware';

const router = express.Router();

// All Order Routes
router.post('/',verifyToken, OrderController.createOrder); // Place an order
router.get('/',verifyToken,authorizeRoles('admin'), OrderController.getAllOrders); // Get all orders
router.get('/revenue',verifyToken,authorizeRoles('admin'), OrderController.getRevenue); // Calculate revenue
router.get('/user-orders',verifyToken, OrderController.getUserOrders); // Get orders by email
router.put('/order-status',verifyToken,authorizeRoles('admin'), OrderController.changeOrderStatus);
router.post("/initiate-payment", verifyToken, OrderController.initiatePayment); // Change order status

export const OrderRoutes = router;
