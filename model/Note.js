import mongoose from "mongoose";
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    }
}, {
    timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);
export default Note;