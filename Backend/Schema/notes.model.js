const mongoose = require("mongoose");
const notesSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        minlength: [4, "Title must be at least 4 characters long"],
        maxlength: [50, "Title must be at most 50 characters long"]
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        minlength: [10, "Content must be at least 10 characters long"],
        maxlength: [1000, "Content must be at most 1000 characters long"]
    }
}, { timestamps: true, strict: true })
const notesModel = mongoose.model("note", notesSchema);
module.exports = notesModel;