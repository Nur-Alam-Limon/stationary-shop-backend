import { Schema, model } from 'mongoose';
import { TStationary } from './stationary.interface';

//Define Schema
const StationarySchema = new Schema<TStationary>(
  {
    name: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, required: true },
    productImg: { type: String, required: true}
  },
  {
    timestamps: true,
  },
);

//Create Model
const StationaryModel = model<TStationary>('Stationary', StationarySchema);

export default StationaryModel;
