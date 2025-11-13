import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import dbConnect from '../config/dbConnect.js';
import AuthRoutes from '../routes/AuthRoutes.js';
import NoteRoutes from '../routes/NoteRoutes.js';
import noteRoutes from '../routes/NoteRoutes.js';


// Connect to the database
dbConnect();

const app = express();

// --- Middleware ---
app.use(express.json()); // Body parser for JSON data
const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:5173',
    'http://localhost:3000',
].filter(Boolean);
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true);
            return allowedOrigins.includes(origin)
                ? callback(null, true)
                : callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
    })
);

// --- Routes ---
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.use('/api', AuthRoutes); // Auth routes: /api/auth/register, /api/auth/login
app.use('/api', noteRoutes); // Note routes: /api/notes

// --- Custom Error Handler Middleware ---
// Basic error handler to display error messages as JSON
const globalErrHandler = (err, req, res, next) => {
    const stack = process.env.NODE_ENV === 'development' ? err.stack : undefined;
    const message = err.message;
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        status: 'fail',
        message,
        stack,
    });
};

// Error handler for requests hitting non-existent routes
const notFound = (req, res, next) => {
    res.status(404).json({ message: `Route - ${req.originalUrl} - not found` });
};

app.use(notFound);
app.use(globalErrHandler);


export default app;