import OrderModel from './orders.model';
import StationaryModel from '../stationary/stationary.model';

// Create a new order
export const createOrder = async (data: {
  email: string;
  product: string;
  quantity: number;
}) => {
  // Fetch the product details from the database
  const product = await StationaryModel.findById(data.product);
  if (!product) {
    throw { message: 'Product not found', status: 404 }; // Product not found
  }

  // Check if there is sufficient stock for the order
  if (product.quantity < data.quantity) {
    throw { message: 'Insufficient stock', status: 400 }; // Insufficient stock
  }

  // Calculate the total price of the order
  const totalPrice = product.price * data.quantity;

  // Update the product's inventory and stock status
  product.quantity -= data.quantity;
  product.inStock = product.quantity > 0;
  await product.save();

  // Create and save the order in the database
  return await OrderModel.create({
    email: data.email,
    product: data.product,
    quantity: data.quantity,
    totalPrice,
    status: 'pending', // Default status is "pending"
  });
};

// Get all orders, including product details
export const getAllOrders = async () => {
  return await OrderModel.find().populate('product'); // Populate the product data
};

// Get orders by user email
export const getOrdersByEmail = async (email: string) => {
  return await OrderModel.find({ email }).populate('product'); // Find orders by email
};

// Update order status
export const updateOrderStatus = async (orderId: string, status: string) => {
  const order = await OrderModel.findById(orderId); // Find the order by ID
  if (!order) {
    throw { message: 'Order not found', status: 404 }; // If order not found
  }

  order.status = status; // Update status
  await order.save(); // Save the updated order

  return order; // Return the updated order
};

// Calculate total revenue from all orders
export const getRevenue = async () => {
  const revenue = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' }, // Sum of all totalPrices
      },
    },
  ]);

  return revenue[0]?.totalRevenue || 0; // Return total revenue, default to 0 if no revenue
};
