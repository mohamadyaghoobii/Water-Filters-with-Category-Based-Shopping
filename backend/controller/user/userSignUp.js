const userModel = require("../../models/userModels");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body;

        // Validate required fields
        if (!email) {
            return res.status(400).json({
                message: "لطفا ایمیل معتبر وارد کنید",
                error: true,
                success: false,
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "گذرواژه خود را وارد کنید",
                error: true,
                success: false,
            });
        }
        if (!name) {
            return res.status(400).json({
                message: "نام خود را وارد کنید",
                error: true,
                success: false,
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "شما قبلا با این ایمیل ثبت نام کرده اید",
                error: true,
                success: false,
            });
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        // Create user object
        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword,
        };

        // Save the new user
        const userData = new userModel(payload);
        const savedUser = await userData.save();

        // Respond with success
        res.status(201).json({
            data: savedUser,
            success: true,
            error: false,
            message: "اکانت شما ساخته شد",
        });

    } catch (err) {
        // Log the error for debugging
        console.error(err);

        // Respond with an error
        res.status(500).json({
            message: err.message || 'Internal server error',
            error: true,
            success: false,
        });
    }
}

module.exports = userSignUpController;
