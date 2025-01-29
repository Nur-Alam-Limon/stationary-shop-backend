// Define Interface
export type Torders = {
  email: string;
  product: string; // ObjectId as string
  quantity: number;
  totalPrice: number;
  status: string;  // Add the status field
};
