const bcrypt = require('bcryptjs');
const userModel = require('../../models/userModels');
const jwt = require('jsonwebtoken');

async function userSignInController(req, res) {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json({  // Return status code for missing email
                message: "لطفا ایمیل معتبر وارد کنید",
                error: true,
                success: false,
            });
        }
        if (!password) {
            return res.status(400).json({  // Return status code for missing password
                message: "گذرواژه خود را وارد کنید",
                error: true,
                success: false,
            });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({  // Return status code for user not found
                message: "کاربری با این ایمیل وجود ندارد",
                error: true,
                success: false,
            });
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            };
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            return res.cookie("token", token, { httpOnly: true,secure: true,sameSite: 'None' })  // Set cookie and send response
                .status(200)
                .json({
                    message: "ورود با موفقیت",
                    data: token,
                    success: true,
                    error: false,
                });
        } else {
            return res.status(401).json({  // Return status code for incorrect password
                message: "پسورد نادرست میباشد",
                error: true,
                success: false,
            });
        }
    } catch (err) {
        // Log the error message
        console.error(err);

        // Send error response
        return res.status(500).json({
            message: err.message || 'Internal server error',
            error: true,
            success: false,
        });
    }
}

module.exports = userSignInController;