import { Tstationary } from './stationary.interface';
import StationaryModel from './stationary.model';

const createStationaryProductDB = async (product: Tstationary) => {
  const result = await StationaryModel.create(product);
  return result;
};

export const StationaryServices = {
  createStationaryProductDB,
};
