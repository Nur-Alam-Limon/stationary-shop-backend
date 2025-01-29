import { Request, Response } from 'express';
import { registerUser, loginUser, updateUserProfile, getAllUsersService } from './auth.service';

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;  // Using email from request body to find the user
    
    // Update the user profile by email
    const updatedUser = await updateUserProfile(email, req.body);

    // Respond with the updated user details
    res.status(200).json({ user: updatedUser });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(400).json({ error: message });
  }
};

  

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, token } = await registerUser(req.body);
    res.status(201).json({ user, token });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(400).json({ error: message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user, token } = await loginUser(req.body);
    res.status(200).json({ user, token });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred';
    res.status(400).json({ error: message });
  }
};

// Get All Users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsersService(); // Call the service to fetch all users
    res.status(200).json({ users });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
