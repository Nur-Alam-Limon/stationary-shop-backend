import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';


export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    // Attach the decoded user information to the request object
    req.user = {
      id: decoded.id,
      role: decoded.role, // Make sure the token contains the role
    };

    next(); // Pass control to the next middleware/route handler
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

// Middleware to restrict access based on roles
export const authorizeRoles = (...roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      // Ensure `req.user` exists and contains a valid role
      if (!req.user || !req.user.role) {
        res.status(403).json({ message: 'Access forbidden: User role not found.' });
        return;
      }
  
      // Check if the user's role is in the allowed roles
      if (!roles.includes(req.user.role)) {
        res.status(403).json({ message: 'Access forbidden: Insufficient permissions.' });
        return;
      }
  
      next(); // Pass control to the next middleware/handler
    };
  };
  
