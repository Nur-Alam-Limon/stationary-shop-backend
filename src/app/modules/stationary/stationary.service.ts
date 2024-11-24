import StationaryModel from './stationary.model';
import { TStationary } from './stationary.interface';

// Create a new stationary product
const createStationaryProductDB = async (product: TStationary) => {
  const result = await StationaryModel.create(product);
  return result;
};

// Get all stationary products without any search filter
const getAllStationaryProducts = async () => {
  const products = await StationaryModel.find(); // Fetch all products without filtering
  return products;
};

// Get a product by its ID
const getStationaryProductById = async (id: string) => {
  const product = await StationaryModel.findById(id);
  return product;
};

// Update a product by its ID
const updateStationaryProductDB = async (
  id: string,
  updates: Partial<TStationary>,
) => {
  const updatedProduct = await StationaryModel.findByIdAndUpdate(id, updates, {
    new: true,
  });
  return updatedProduct;
};

// Delete a product by its ID
const deleteStationaryProductDB = async (id: string) => {
  await StationaryModel.findByIdAndDelete(id);
  return { message: 'Product deleted successfully' };
};

export const StationaryServices = {
  createStationaryProductDB,
  getAllStationaryProducts,
  getStationaryProductById,
  updateStationaryProductDB,
  deleteStationaryProductDB,
};
