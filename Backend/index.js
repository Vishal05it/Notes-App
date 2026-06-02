const connectToDB = require("./connectToDB");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();
const cors = require("cors");
const notesRouter = require("./Router/notes.router");
const userRouter = require("./Router/user.router");
app.use(express.json());
connectToDB();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use("/note/api", notesRouter);
app.use("/user/api", userRouter);
app.listen(PORT, () => {
    console.log(`Server is running on : http://localhost:${PORT}`);
})