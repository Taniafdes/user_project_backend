import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import dbConnect from '../config/dbConnect.js';
import authRoutes from '../routes/AuthRoutes.js';
import noteRoutes from '../routes/NoteRoutes.js';

const app = express();

// --- Connect to DB ---
dbConnect();

// --- Middleware ---
app.use(express.json());

// --- CORS Configuration ---
const allowedOrigins = [
  process.env.CLIENT_URL,                   // your Netlify frontend
  'http://localhost:3000',                 // local React dev
].filter(Boolean);

app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// --- Routes ---
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Mount routes with proper prefixes
app.use('/api/auth', authRoutes);   // /api/auth/register, /api/auth/login
app.use('/api/notes', noteRoutes);  // /api/notes

// --- Error Handling ---
const globalErrHandler = (err, req, res, next) => {
  const stack = process.env.NODE_ENV === 'development' ? err.stack : undefined;
  res.status(err.statusCode || 500).json({
    status: 'fail',
    message: err.message,
    stack,
  });
};

const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route - ${req.originalUrl} - not found` });
};

app.use(notFound);
app.use(globalErrHandler);

export default app;
