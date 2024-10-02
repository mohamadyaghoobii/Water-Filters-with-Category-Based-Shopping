const userModel = require("../../models/userModels");

async function userDetailsController(req, res) {
    try {
        // Ensure req.userId is defined and valid
        if (!req.userId) {
            return res.status(400).json({  // Return bad request if userId is not provided
                message: "User ID is required",
                error: true,
                success: false,
            });
        }

        console.log("userId", req.userId);

        // Fetch user details from the database
        const user = await userModel.findById(req.userId);
        console.log("user",user)
        

        // Check if user was found
        if (!user) {
            return res.status(404).json({  // Return not found if user does not exist
                message: "User not found",
                error: true,
                success: false,
            });
        }

        // Respond with user details
        res.status(200).json({
            data: user,
            error: false,
            success: true,
            message: "User details retrieved successfully",
        });
    } catch (err) {
        // Log the error for debugging purposes
        console.error(err);

        // Respond with an error message
        res.status(500).json({
            message: err.message || 'Internal server error',
            error: true,
            success: false,
        });
    }
}

module.exports = userDetailsController;
