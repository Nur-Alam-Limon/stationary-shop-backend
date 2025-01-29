import express from 'express';
import { register, login, updateProfile, getAllUsers } from './auth.controller';
import { authorizeRoles, verifyToken } from './auth.middleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/updateProfile',verifyToken, updateProfile);
router.get('/users', verifyToken, authorizeRoles('admin'), getAllUsers);

export const authRoutes = router;
