const express = require("express");
const { default: mongoose } = require("mongoose");
const userRouter = express.Router();
const userModel = require("../Schema/user.model");
userRouter.post("/signup", async (req, res) => {
    try {
        const { email, name } = req.body;
        let userExist = await userModel.findOne({ email });
        if (userExist) {
            return res.status(402).json({
                message: "User already exist",
                success: false,
            });
        }
        let newUser = await userModel.create({
            email, name
        });
        return res.status(200).json({
            message: "Account created successfully",
            success: true,
            user: newUser,
        });
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
        })
    }
});
userRouter.post("/login", async (req, res) => {
    try {
        const { email } = req.body;
        let userExist = await userModel.findOne({ email });
        if (!userExist) {
            return res.status(401).json({
                message: "User not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "User found successfully",
            success: true,
            user: userExist,
        });
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
module.exports = userRouter;