const userModel = require("../Schema/user.model");
const verifyUser = async (req, res, next) => {
    try {
        let userExist = await userModel.findById(req.params.userId);
        if (!userExist) {
            return res.status(401).json({
                message: "User not registered",
                success: false,
                redirect: true,
            })
        }
        return next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
        })
    }
}
module.exports = verifyUser;