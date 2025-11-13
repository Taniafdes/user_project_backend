import { Router } from 'express';
import { registerUserCtrl, loginUserCtrl } from '../controllers/authController.js';

const authRoutes = Router();

// POST /api/auth/register
authRoutes.post("/auth/register", registerUserCtrl);

// POST /api/auth/login
authRoutes.post("/auth/login", loginUserCtrl);

export default authRoutes;