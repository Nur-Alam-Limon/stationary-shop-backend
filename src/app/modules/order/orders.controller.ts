import { Request, Response } from 'express';
import * as OrderService from './orders.service';

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const order = await OrderService.createOrder(req.body);
    res.status(201).json({
      message: 'Order created successfully',
      success: true,
      data: order,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating order', success: false, error });
  }
};

// Get all orders
export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await OrderService.getAllOrders();
    res.status(200).json({
      message: 'Orders retrieved successfully',
      success: true,
      data: orders,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error retrieving orders', success: false, error });
  }
};

// Get total revenue
export const getRevenue = async (_req: Request, res: Response) => {
  try {
    const revenue = await OrderService.getRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: { totalRevenue: revenue },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error calculating revenue', success: false, error });
  }
};
