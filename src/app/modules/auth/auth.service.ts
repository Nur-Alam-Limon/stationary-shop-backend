import { UserModel } from './auth.model';
import { RegisterPayload, LoginPayload, User, UpdateProfilePayload } from './auth.interface';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = '72h';

// Helper function to map a Mongoose document to the User interface
const transformUser = (user: any): User => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  password: user.password,
  phone: user.phone,
  address: user.address, // Optional field
  role: user.role,
  profilePic: user.profilePic,
  status: user.status
  
});

export const registerUser = async (payload: RegisterPayload): Promise<{ user: User; token: string }> => {
  const existingUser = await UserModel.findOne({ email: payload.email });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const user = new UserModel(payload);
  await user.save();

  const token = jwt.sign({ id: user.id.toString(), role: user.role?.toString() }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { user: transformUser(user), token };
};

export const loginUser = async (payload: LoginPayload): Promise<{ user: User; token: string }> => {
  const user = await UserModel.findOne({ email: payload.email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await user.comparePassword(payload.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user.id.toString(),role: user.role?.toString() }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return { user: transformUser(user), token };
};

export const updateUserProfile = async (email: string, payload: UpdateProfilePayload): Promise<any> => {
  const user = await UserModel.findOne({ email });  // Find the user by email
  if (!user) {
    throw new Error('User not found');
  }

  // Update user fields if provided
  if(payload.name) user.name = payload.name;
  if(payload.status) user.status = payload.status;
  if (payload.phone) user.phone = payload.phone;
  if (payload.address) user.address = payload.address;
  if (payload.profilePic) user.profilePic = payload.profilePic;

  // Save the updated user
  await user.save();

  return user;  // Return the updated user object
};

// Get All Users (new method)
export const getAllUsersService = async () => {
  try {
    // Fetch all users from the database (excluding password)
    
    const users = await UserModel.find({}, '-password');
    console.log("users", users)
    return users;
  } catch (error) {
    throw new Error('Failed to retrieve users');
  }
};
  
