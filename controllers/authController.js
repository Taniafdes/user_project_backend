import asyncHandler from 'express-async-handler';
import User from '../model/User.js';
import generateToken from '../utils/generateToken.js';

// @desc  Register a new user
// @route POST /api/auth/register
// @access Public
export const registerUserCtrl = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    // Create user (password hashing happens in the model's pre-save hook)
    const user = await User.create({
        name,
        email,
        password,
    });

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
    });
});

// @desc  Login user
// @route POST /api/auth/login
// @access Public
export const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (user && (await user.isPasswordMatch(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});