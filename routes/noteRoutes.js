import { Router } from 'express';
import { getNotesCtrl, createNoteCtrl, deleteNoteCtrl } from '../controllers/noteController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const noteRoutes = Router();

// POST /api/notes - Create a new note (auth required)
noteRoutes.post("/notes", authMiddleware, createNoteCtrl);

// GET /api/notes - Get all notes (auth required, supports ?tag= filter)
noteRoutes.get("/notes", authMiddleware, getNotesCtrl);

// DELETE /api/notes/:id - Delete a note (auth required)
noteRoutes.delete("/notes/:id", authMiddleware, deleteNoteCtrl);

export default noteRoutes;
