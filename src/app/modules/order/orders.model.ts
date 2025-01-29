import { Schema, model } from 'mongoose';
import { Torders } from './orders.interface';

// Define Order Schema
const OrderSchema = new Schema<Torders>(
  {
    email: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true, min: 0 },
    status: { type: String, default: 'pending' }, // Add a default status of 'pending'
  },
  {
    timestamps: true,
  },
);

// Create Order Model
const OrderModel = model<Torders>('Orders', OrderSchema);

export default OrderModel;
