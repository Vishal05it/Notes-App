const express = require("express");
const { default: mongoose } = require("mongoose");
const notesRouter = express.Router();
const userModel = require("../Schema/user.model");
const notesModel = require("../Schema/notes.model");
const verifyUser = require("../Middlewares/user.middleware");
notesRouter.get("/getallnotes/:userId", verifyUser, async (req, res) => {
    try {
        const allNotes = await notesModel.find({ createdBy: req.params.userId }).populate("createdBy");
        if (allNotes.length == 0) {
            return res.status(200).json({
                message: "No notes found",
                allNotes,
                success: true,
            })
        }
        return res.status(200).json({
            message: "All your notes found",
            allNotes,
            success: true,
        })
    } catch (error) {
        console.log(error);
        if (error instanceof mongoose.Error.ValidationError) {
            let messages = Object.values(error.errors).map((err) => err.message);
            return res.status(500).json({
                message: messages[0],
                success: false,
            })
        }
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
});
notesRouter.post("/createnote/:userId", verifyUser, async (req, res) => {
    try {
        const { title, content } = req.body;
        const { userId } = req.params;
        const newNote = await notesModel.create({
            title, content, createdBy: userId
        });
        const sendNote = await notesModel.findById(newNote._id);
        return res.status(200).json({
            message: "New note created",
            success: true,
            note: sendNote,
        })
    } catch (error) {
        console.log(error);
        if (error instanceof mongoose.Error.ValidationError) {
            let messages = Object.values(error.errors).map((err) => err.message);
            return res.status(500).json({
                message: messages[0],
                success: false,
            })
        }
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
})
notesRouter.put("/updatenote/:noteId/:userId", verifyUser, async (req, res) => {
    try {
        const { title, content } = req.body;
        const { noteId } = req.params;
        const note = await notesModel.findById(noteId);
        if (note.createdBy != req.params.userId) {
            return res.status(401).json({
                message: "Cannot get other's note",
                success: false,
            });
        }
        const refNote = {};

        if (title) refNote.title = title;
        if (content) refNote.content = content;
        const updatedNote = await notesModel.findByIdAndUpdate(noteId, refNote, { new: true });
        if (!updatedNote) {
            return res.status(402).json({
                message: "Note updation failed",
                success: false,
            })
        }
        return res.status(200).json({
            message: "Note updated",
            success: true,
            note: updatedNote,
        })
    } catch (error) {
        console.log(error);
        if (error instanceof mongoose.Error.ValidationError) {
            let messages = Object.values(error.errors).map((err) => err.message);
            return res.status(500).json({
                message: messages[0],
                success: false,
            })
        }
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
})
notesRouter.delete("/deletenote/:noteId/:userId", verifyUser, async (req, res) => {
    try {
        const { noteId } = req.params;
        const note = await notesModel.findById(noteId);
        if (note.createdBy != req.params.userId) {
            return res.status(401).json({
                message: "Cannot get other's note",
                success: false,
            })
        }
        const deletedNote = await notesModel.findByIdAndDelete(noteId);
        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found or already deleted",
                success: false,
            })
        }
        return res.status(200).json({
            message: "Note deleted",
            success: true,
            note: deletedNote,
        })
    } catch (error) {
        console.log(error);
        if (error instanceof mongoose.Error.ValidationError) {
            let messages = Object.values(error.errors).map((err) => err.message);
            return res.status(500).json({
                message: messages[0],
                success: false,
            })
        }
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
})
notesRouter.get("/getnote/:noteId/:userId", verifyUser, async (req, res) => {
    try {
        const { noteId } = req.params;
        const note = await notesModel.findById(noteId).populate("createdBy");
        if (!note) {
            return res.status(404).json({
                message: "Note not found",
                success: false,
            });
        }
        if (note.createdBy._id != req.params.userId) {
            return res.status(401).json({
                message: "Cannot get other's note",
                success: false,
            })
        }
        return res.status(200).json({
            message: "Note found",
            success: true,
            note,
        })
    } catch (error) {
        console.log(error);
        if (error instanceof mongoose.Error.ValidationError) {
            let messages = Object.values(error.errors).map((err) => err.message);
            return res.status(500).json({
                message: messages[0],
                success: false,
            })
        }
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
})
module.exports = notesRouter;