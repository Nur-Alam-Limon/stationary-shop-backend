import { Request, Response } from 'express';
import * as OrderService from './orders.service';
import SSLCommerzPayment from "sslcommerz-lts";
import OrderModel from './orders.model';

export const initiatePayment = async (req: Request, res: Response) => {
  const { total_amount, currency, tran_id, success_url, fail_url, cancel_url, customer, cartItems } = req.body;
  // console.log("Request Body", req.body)

  // SSLCommerz credentials
  const store_id = process.env.SSL_STORE_ID || "nuralam098";
  const store_passwd = process.env.SSL_STORE_PASSWORD || "nlimon";
  const is_live = false; // Set to true for live mode
;

  const paymentData = {
    total_amount: parseInt(total_amount),
    currency: currency || "BDT",
    tran_id: tran_id || `REF${Date.now()}`, // Unique transaction ID
    success_url,
    fail_url,
    cancel_url,
    ipn_url: "http://localhost:3000/ipn", // IPN URL for handling server-side updates (optional)
    shipping_method: "Courier",
    product_name: "Stationery Items",
    product_category: "Stationery",
    product_profile: "general",
    cus_name: customer.name || "Nur Alam",
    cus_email: customer.email || "nur@gmail.com",
    cus_phone: customer.phone || "01764569758",
    cus_add1: customer.address || "Dhaka",
    cus_city: "Dhaka",
    cus_postcode: "1762",
    cus_country: "Bangladesh",
    ship_name: customer.name || "Nur Alam",
    ship_add1: customer.address || "Dhaka",
    ship_city: "Dhaka",
    ship_postcode: "1762",
    ship_country: "Bangladesh",
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  try {
    // Initialize the payment
    const apiResponse = await sslcz.init(paymentData);

    // console.log("SSLCommerz Response:", apiResponse);

    // Check for successful initialization and redirect the user
    if (apiResponse.status === "SUCCESS" && apiResponse.GatewayPageURL) {
      for (const item of cartItems) {
          const totalPrice = item.price * item.cartQuantity;

          console.log("sdadsa", item)

          await OrderModel.create({
            email: customer.email,
            product: item._id,
            quantity: item.cartQuantity,
            totalPrice,
            status: "pending",
          });
        }
      res.status(200).json({ success: true, message: "Success payment", GatewayPageURL: apiResponse.GatewayPageURL });
    } else {
      res.status(400).json({ success: false, message: "Failed to initiate payment", error: apiResponse });
    }
  } catch (error) {
    console.error("Error in payment initiation:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};

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

export const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query; // Get email from request body
    console.log("Email", email)

    if (!email) {
      throw new Error('Email is required');
    }

    const orders = await OrderService.getOrdersByEmail(email as string); // Fetch orders from service
    res.status(200).json({
      message: 'User orders retrieved successfully',
      success: true,
      data: orders,
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Error retrieving user orders',
      success: false,
      error: error.message || error,
    });
  }
};

// Change order status
export const changeOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId, status } = req.body; // Get order ID and new status from body

    if (!orderId || !status) {
      throw new Error('Order ID and status are required');
    }

    const updatedOrder = await OrderService.updateOrderStatus(orderId, status); // Update order status
    res.status(200).json({
      message: 'Order status updated successfully',
      success: true,
      data: updatedOrder,
    });
  } catch (error: any) {
    res.status(400).json({
      message: 'Error updating order status',
      success: false,
      error: error.message || error,
    });
  }
};

