// Import required dependencies
import express, { Application } from 'express';
import { productRoutes } from './app/modules/stationary/stationary.route';
import cors from 'cors';
import { OrderRoutes } from './app/modules/order/orders.route';

// Create app using express
const app: Application = express();

// Parse incoming JSON requests
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing) for all origins
app.use(cors());

// product routes with the path '/api/products'
app.use('/api/products', productRoutes);

// order routes with the path '/api/orders'
app.use('/api/orders', OrderRoutes);

export default app;
