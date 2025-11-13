import asyncHandler from 'express-async-handler';
import Note from '../model/Note.js';

// @desc  Create new note
// @route POST /api/notes
// @access Private
export const createNoteCtrl = asyncHandler(async (req, res) => {
    const { title, content, tags } = req.body;

    if (!title || !content) {
        res.status(400);
        throw new Error("Title and content are required fields.");
    }

    const note = await Note.create({
        userId: req.userId, // Set by authMiddleware
        title,
        content,
        tags: tags || [],
    });

    res.status(201).json({
        status: "success",
        note,
    });
});

// @desc  Get all notes for the logged-in user with optional tag filter
// @route GET /api/notes
// @access Private
export const getNotesCtrl = asyncHandler(async (req, res) => {
    const { tag } = req.query;
    
    // Base query: only notes belonging to the logged-in user
    let query = { userId: req.userId };

    // Apply tag filter if provided
    if (tag) {
        // Find notes where the 'tags' array contains the specified tag (case-insensitive)
        query.tags = { $in: [new RegExp(tag, 'i')] };
    }

    const notes = await Note.find(query).sort({ createdAt: -1 });

    res.json({
        status: "success",
        count: notes.length,
        notes,
    });
});

// @desc  Delete a note
// @route DELETE /api/notes/:id
// @access Private
export const deleteNoteCtrl = asyncHandler(async (req, res) => {
    const note = await Note.findOneAndDelete({ 
        _id: req.params.id, 
        userId: req.userId // Ensure only the owner can delete
    });

    if (!note) {
        res.status(404);
        throw new Error("Note not found or you do not have permission to delete it.");
    }

    res.json({
        status: "success",
        message: "Note deleted successfully.",
    });
});