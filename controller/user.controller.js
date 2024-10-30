const { hashPassword } = require("../middleware/bcrypt");
const { userService } = require("../services");

// Handle user creation
const handleCreateUser = async (req, res) => {
    try {
        let body = req.body;
        // Hash the password
        const hashedPassword = await hashPassword(body?.password);

        body = {
            ...body,
            password: hashedPassword,
        };
        
        // Create the user
        const result = await userService.createUser(body);

        if (!result) {
            return res.status(400).json({ message: "User creation failed" });
        }

        res.status(201).json({
            message: "User created successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Handle user login
const handleLoginUser = async (req, res) => {
    try {
        const body = req.body;
        const result = await userService.loginUser(body);
        if (!result) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({
            message: "Login successful",
            data: result.user,
            token: result.token,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Handle fetching all users
const handleGetAllUsers = async (req, res) => {
    try {
        const result = await userService.getAllUsers();

        if (!result || result.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json({
            message: "Users fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Handle fetching a user by ID
const handleGetUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const result = await userService.getUserById(userId);

        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Handle deleting a user by ID
const handleDeleteUserById = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const result = await userService.deleteUserById(userId);

        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Handle deleting all users
const handleDeleteAllUsers = async (req, res) => {
    try {
        const result = await userService.deleteAllUsers();

        res.status(200).json({
            message: "All users deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const handleUpdateUser = async (req, res) => {
    try {
        const id = req.params.userId
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        const body = req.body

        const result = await userService.updateUser(id, body)
        if (!result) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({
            message: "User updated successfully",
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: error.message });

    }
}
module.exports = {
    handleCreateUser,
    handleLoginUser,
    handleGetAllUsers,
    handleGetUserById,
    handleDeleteUserById,
    handleDeleteAllUsers,
    handleUpdateUser
};
