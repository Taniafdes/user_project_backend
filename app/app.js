import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import dbConnect from '../config/dbConnect.js';

import noteRoutes from '../routes/temp2.js';
import authRoutes from '../routes/temp.js';
const app = express();

// --- Connect to MongoDB ---
dbConnect();

// --- Middleware ---
app.use(express.json());

// --- CORS Setup ---
const allowedOrigins = [
  process.env.CLIENT_URL,   // Netlify frontend
  'http://localhost:3000',
  'http://localhost:5173',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow Postman, curl
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.log('CORS blocked for origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  optionsSuccessStatus: 200
}));

// --- Handle preflight requests safely ---
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', allowedOrigins.join(','));
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    return res.sendStatus(200);
  }
  next();
});

// --- Routes testing---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});


app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).json({ message: `Route - ${req.originalUrl} - not found` });
});

// --- Global error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    status: 'fail',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});


export default app;
