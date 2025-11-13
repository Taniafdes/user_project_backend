import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../model/User.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_TOKEN);

            // Find user by ID and attach to request object
            // Exclude password in the selection
            const user = await User.findById(decoded.id).select('-password');

            if (!user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }
            
            req.user = user;
            req.userId = decoded.id; 
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed or expired');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

export default authMiddleware;