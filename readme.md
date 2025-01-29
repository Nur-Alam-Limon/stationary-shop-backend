# Stationary Shop Backend

This is a backend server for the Stationary Shop application, built using TypeScript, Express, and MongoDB. It provides APIs to manage stationary products, user login, registration and customer orders.

**Live Link** - https://stationary-shop-backend.vercel.app/

## Features

- **Product Management**: Add, update, and manage stationary products.
- **Order Management**: Place orders, update stock, and calculate total prices.
- **User Management**: User Registration, login and get, update user.
- **Authorization**: Authorize all routes, make route role based.
- **Modular Architecture**: Clean and organized folder structure for scalability.
- **Data Validation**: Strongly typed models using Mongoose and TypeScript.


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

### 2. Get All Stationery Products

- **Endpoint**: `/api/products`
- **Method**: `GET`

### 3. Get a Specific Stationery Product

- **Endpoint**: `/api/products/:productId`
- **Method**: `GET`

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

### 5. Delete a Stationery Product

- **Endpoint**: `/api/products/:productId`
- **Method**: `DELETE`

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

### 7. Get All Orders (Admin Only)

- **Endpoint**: `/api/orders`
- **Method**: `GET`
- **Authorization**: Admin

### 8. Get Orders by User Email

- **Endpoint**: `/api/orders/user-orders`
- **Method**: `GET`
- **Authorization**: User

### 9. Update Order Status (Admin Only)

- **Endpoint**: `/api/orders/order-status`
- **Method**: `PUT`
- **Authorization**: Admin
- **Request Body**:
  ```json
  {
    "orderId": "648a45e5f0123c45678d9012",
    "status": "shipped"
  }
  ```

### 10. Calculate Revenue from Orders (Admin Only)

- **Endpoint**: `/api/orders/revenue`
- **Method**: `GET`
- **Authorization**: Admin

## Authentication Routes

### 1. User Registration

- **Endpoint**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```

### 2. User Login

- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```

### 3. Update User Profile

- **Endpoint**: `/api/auth/updateProfile`
- **Method**: `POST`
- **Authorization**: User
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "phone": "+1234567890",
    "address": "123 Street, City",
    "profilePic": "https://example.com/profile.jpg",
    "status": "active"
  }
  ```

### 4. Get All Users (Admin Only)

- **Endpoint**: `/api/auth/users`
- **Method**: `GET`
- **Authorization**: Admin

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
   NODE_ENV=development
  JWT_SECRET=
  SSL_STORE_ID=
  SSL_STORE_PASSWORD=
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

## Tech Stack

- **Backend Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Language**: TypeScript
- **Linting/Formatting**: ESLint, Prettier

---

## Author

[Nur Alam Chowdhury](https://github.com/Nur-Alam-Limon)
