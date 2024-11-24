import { Schema, model, connect } from 'mongoose';
import { Tstationary } from './stationary.interface';

const StationarySchema = new Schema<Tstationary>(
  {
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: {
      type: String,
      enum: [
        'Writing',
        'Office Supplies',
        'Art Supplies',
        'Educational',
        'Technology',
      ],
      required: true,
    },
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

const StationaryModel = model<Tstationary>('Stationary', StationarySchema);

export default StationaryModel;
