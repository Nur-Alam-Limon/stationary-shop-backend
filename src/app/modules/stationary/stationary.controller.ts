import { Request, Response } from 'express';
import { StationaryServices } from './stationary.service';

const createStationaryProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const result = await StationaryServices.createStationaryProductDB(product);

    res.status(200).json({
      success: true,
      message: 'Product is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: 'Error in product create',
      error: err,
    });
  }
};

export const productController = {
  createStationaryProduct,
};
