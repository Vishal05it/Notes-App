const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: [true, "Email already registered"],
        lowercasue: true,
        required: [true, "Email is required"],
        match: [/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim, "Invalid Email Format"]
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [2, "Name must be at least 2 characters long"],
        maxlength: [30, "Name must be at most 30 characters long"],
    }
}, { timestamps: true, strict: true });
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;