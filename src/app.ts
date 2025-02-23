// Import required dependencies
import express, { Application, Request, Response } from 'express';
import { productRoutes } from './app/modules/stationary/stationary.route';
import cors from 'cors';
import { OrderRoutes } from './app/modules/order/orders.route';
import { authRoutes } from './app/modules/auth/auth.routes';

// Create app using express
const app: Application = express();

// Parse incoming JSON requests
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing) for all origins
app.use(cors({
  origin: '*', 
  methods: 'GET,POST,PUT', // Allow these methods
  allowedHeaders: 'Content-Type,Authorization', // Allow these headers
}));

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to the Stationary Shop API!',
    endpoints: {
      products: '/api/products',
      orders: '/api/orders',
    },
  });
});

// product routes with the path '/api/products'
app.use('/api/products', productRoutes);

app.use('/api/auth', authRoutes);

// order routes with the path '/api/orders'
app.use('/api/orders', OrderRoutes);

export default app;
