import express from 'express';
import { loginUserCtrl, registerUserCtrl } from '../controllers/authController.js';


const router = express.Router();

router.post('/register', registerUserCtrl)
router.post('/login', loginUserCtrl);

export default router;
