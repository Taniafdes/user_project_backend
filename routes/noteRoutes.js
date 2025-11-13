import { Router } from 'express';
import { getNotesCtrl, createNoteCtrl, deleteNoteCtrl } from '../controllers/noteController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const noteRoutes = Router();

// POST /api/notes - Create a new note (auth required)
noteRoutes.post("/", authMiddleware, createNoteCtrl);

// GET /api/notes - Get all notes (auth required, supports ?tag= filter)
noteRoutes.get("/", authMiddleware, getNotesCtrl);

// DELETE /api/notes/:id - Delete a note (auth required)
noteRoutes.delete("/:id", authMiddleware, deleteNoteCtrl);

export default noteRoutes;
