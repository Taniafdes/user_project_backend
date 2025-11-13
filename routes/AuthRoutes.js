import { Router } from 'express';
import { registerUserCtrl, loginUserCtrl } from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post('/register', registerUserCtrl);
authRoutes.post('/login', loginUserCtrl);

export default authRoutes;
