# Stationary Shop Backend

This is a backend server for the Stationary Shop application, built using TypeScript, Express, and MongoDB. It provides APIs to manage stationary products and customer orders.

**Live Link** - https://stationary-shop-backend.vercel.app/

## Features

- **Product Management**: Add, update, and manage stationary products.
- **Order Management**: Place orders, update stock, and calculate total prices.
- **Modular Architecture**: Clean and organized folder structure for scalability.
- **Environment Configurations**: Centralized configuration for environment variables.
- **Data Validation**: Strongly typed models using Mongoose and TypeScript.

# Stationary Shop Backend API

This document provides an overview of all the API routes for the Stationary Shop backend application, along with the required request and response formats.

## API Routes

### 1. Create a Stationery Product

- **Endpoint**: `/api/products`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "Notebook",
    "brand": "Moleskine",
    "price": 15,
    "category": "Office Supplies",
    "description": "A high-quality notebook for professionals.",
    "quantity": 200,
    "inStock": true
  }
  ```
- **Response**:
  ```json
  {
    "message": "Product created successfully",
    "success": true,
    "data": {
      "_id": "648a45e5f0123c45678d9012",
      "name": "Notebook",
      "brand": "Moleskine",
      "price": 15,
      "category": "Office Supplies",
      "description": "A high-quality notebook for professionals.",
      "quantity": 200,
      "inStock": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
  }
  ```

### 2. Get All Stationery Products

- **Endpoint**: `/api/products`
- **Method**: `GET`
- **Query Parameters**:
  - `searchTerm`: Can be `name`, `brand`, or `category` to filter products.
- **Response**:
  ```json
  {
    "message": "Products retrieved successfully",
    "status": true,
    "data": [
      {
        "_id": "648a45e5f0123c45678d9012",
        "name": "Notebook",
        "brand": "Moleskine",
        "price": 15,
        "category": "Office Supplies",
        "description": "A high-quality notebook for professionals.",
        "quantity": 200,
        "inStock": true,
        "createdAt": "2024-11-19T10:23:45.123Z",
        "updatedAt": "2024-11-19T10:23:45.123Z"
      }
      // more products
    ]
  }
  ```

### 3. Get a Specific Stationery Product

- **Endpoint**: `/api/products/:productId`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "message": "Product retrieved successfully",
    "status": true,
    "data": {
      "_id": "648a45e5f0123c45678d9012",
      "name": "Notebook",
      "brand": "Moleskine",
      "price": 15,
      "category": "Office Supplies",
      "description": "A high-quality notebook for professionals.",
      "quantity": 200,
      "inStock": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
  }
  ```

### 4. Update a Stationery Product

- **Endpoint**: `/api/products/:productId`
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
    "price": 18,
    "quantity": 180
  }
  ```
- **Response**:
  ```json
  {
    "message": "Product updated successfully",
    "status": true,
    "data": {
      "_id": "648a45e5f0123c45678d9012",
      "name": "Notebook",
      "brand": "Moleskine",
      "price": 18,
      "category": "Office Supplies",
      "description": "A high-quality notebook for professionals.",
      "quantity": 180,
      "inStock": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T11:00:00.000Z"
    }
  }
  ```

### 5. Delete a Stationery Product

- **Endpoint**: `/api/products/:productId`
- **Method**: `DELETE`
- **Response**:
  ```json
  {
    "message": "Product deleted successfully",
    "status": true,
    "data": {}
  }
  ```

### 6. Order a Stationery Product

- **Endpoint**: `/api/orders`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 36
  }
  ```
- **Response**:
  ```json
  {
    "message": "Order created successfully",
    "status": true,
    "data": {
      "_id": "648b45f5e1234b56789a6789",
      "email": "customer@example.com",
      "product": "648a45e5f0123c45678d9012",
      "quantity": 2,
      "totalPrice": 36,
      "createdAt": "2024-11-19T12:00:00.000Z",
      "updatedAt": "2024-11-19T12:00:00.000Z"
    }
  }
  ```

### 7. Calculate Revenue from Orders

- **Endpoint**: `/api/orders/revenue`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "message": "Revenue calculated successfully",
    "status": true,
    "data": {
      "totalRevenue": 720
    }
  }
  ```

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/stationary-shop-backend.git
   cd stationary-shop-backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and configure the following:
   ```
   PORT=3000
   MONGO_URI=mongodb://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

---

## Scripts

- **Start Development Server**:

  ```bash
  npm run start:dev
  ```

  Runs the server using `ts-node-dev`.

- **Build for Production**:

  ```bash
  npm run build
  ```

  Compiles the TypeScript code to JavaScript.

- **Start Production Server**:

  ```bash
  npm run start:prod
  ```

  Runs the production build.

- **Lint Code**:

  ```bash
  npm run lint
  ```

- **Format Code**:
  ```bash
  npm run prettier
  ```

---

## Folder Structure

```plaintext
src/
├── app/                     # Core application logic
│   ├── app.ts               # Application configuration
│   ├── server.ts            # Entry point
│   ├── config/              # Configuration files
│   │   └── env.ts           # Environment variables
│   └── module/              # Application modules
│       ├── stationary/      # Stationary module
│       │   ├── stationary.controller.ts
│       │   ├── stationary.interface.ts
│       │   ├── stationary.module.ts
│       │   ├── stationary.route.ts
│       │   ├── stationary.service.ts
│       │   └── stationary.model.ts
│       └── orders/          # Orders module
│           ├── orders.controller.ts
│           ├── orders.interface.ts
│           ├── orders.module.ts
│           ├── orders.route.ts
│           ├── orders.service.ts
│           └── orders.model.ts
└── typings/                 # Shared TypeScript types
```

## Tech Stack

- **Backend Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Language**: TypeScript
- **Linting/Formatting**: ESLint, Prettier

---

## Author

[Nur Alam Chowdhury](https://github.com/Nur-Alam-Limon)
