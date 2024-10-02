const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token;

        console.log("Token:", token);

        if (!token) {
            // Token is missing, respond with 401 Unauthorized
            return res.status(401).json({
                message: "لطفا وارد شوید",
                error: true,
                success: false,
            });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
            if (err) {
                // Token verification failed, respond with 401 Unauthorized
                console.log("Error during token verification:", err);
                return res.status(401).json({
                    message: "توکن نامعتبر است",
                    error: true,
                    success: false,
                });
            }

            console.log("Decoded:", decoded);

            // Assign userId from decoded token to req object
            req.userId = decoded?._id;

            // Proceed to the next middleware
            next();
        });

    } catch (err) {
        // Handle unexpected errors
        console.error("Unexpected error:", err);
        res.status(400).json({
            message: err.message || 'Internal server error',
            error: true,
            success: false,
        });
    }
}

module.exports = authToken;
