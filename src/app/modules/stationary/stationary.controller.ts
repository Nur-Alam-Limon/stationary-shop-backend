import { Request, Response } from 'express';
import { StationaryServices } from './stationary.service';

// Controller to create a new stationary product
const createStationaryProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body; // Extract product data from request body
    const result = await StationaryServices.createStationaryProductDB(product);

    // Respond with success message and product data
    res.status(200).json({
      success: true,
      message: 'Product created successfully',
      data: result,
    });
  } catch (err) {
    // Handle errors and respond with error message
    res.status(500).json({
      success: false,
      message: 'Error creating product',
      error: err,
    });
  }
};

// Controller to fetch all stationary products
const getAllStationaryProducts = async (req: Request, res: Response) => {
  try {
    // Call service to get all products without any search term
    const products = await StationaryServices.getAllStationaryProducts();

    // Respond with success message and products data
    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: products,
    });
  } catch (err) {
    // Handle errors and respond with error message
    res.status(500).json({
      success: false,
      message: 'Error retrieving products',
      error: err,
    });
  }
};

// Controller to fetch a stationary product by its ID
const getStationaryProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params; // Extract product ID from URL params
    const product =
      await StationaryServices.getStationaryProductById(productId);

    if (!product) {
      // If product is not found, return 404 error
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Respond with success message and product data
    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (err) {
    // Handle errors and respond with error message
    res.status(500).json({
      success: false,
      message: 'Error retrieving product',
      error: err,
    });
  }
};

// Controller to update an existing stationary product
const updateStationaryProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params; // Extract product ID from URL params
    const updates = req.body; // Extract update data from request body
    const updatedProduct = await StationaryServices.updateStationaryProductDB(
      productId,
      updates,
    );

    // Respond with success message and updated product data
    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (err) {
    // Handle errors and respond with error message
    res.status(500).json({
      success: false,
      message: 'Error updating product',
      error: err,
    });
  }
};

// Controller to delete a stationary product by its ID
const deleteStationaryProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params; // Extract product ID from URL params
    const result =
      await StationaryServices.deleteStationaryProductDB(productId);

    // Respond with success message and result data
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (err) {
    // Handle errors and respond with error message
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
      error: err,
    });
  }
};

export const productController = {
  createStationaryProduct,
  getAllStationaryProducts,
  getStationaryProductById,
  updateStationaryProduct,
  deleteStationaryProduct,
};
