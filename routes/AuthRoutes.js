import express from 'express';
import { registerUserCtrl, loginUserCtrl } from '../controllers/AuthController.js';

const router = express.Router();

// Include /auth in the router
router.post('/auth/register', registerUserCtrl);
router.post('/auth/login', loginUserCtrl);

export default router;
