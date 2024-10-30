const { comparePasswords } = require("../middleware/bcrypt");
const { createToken } = require("../middleware/JWT.JS");
const { userSchema } = require("../model");

// Create a new user
const createUser = async (body) => {
    try {
        const email = body.email;

        // Check if user already exists
        const existingUser = await userSchema.findOne({ where: { email } });
        if (existingUser) {
            throw new Error("User already exists");
        }
        // Create the new user
        const newUser = await userSchema.create(body);
        return newUser; // Return the created user
    } catch (error) {
        console.error("Error in createUserService:", error.message);
        throw new Error("Failed to create user: " + error.message);
    }
};

// Login the user
const loginUser = async (body) => {
    try {
        const { email, password } = body
        const user = await userSchema.findOne({ where: { email } });
        if (!user) {
            throw new Error("email not found");
        }
        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid password");
        }
        const token = createToken(user.id);
        return { token: token, user: user };
    } catch (error) {
        console.error("Error in loginUserService:", error.message);
        throw new Error("Failed to login user: " + error.message);
    }
};
// Get all users
const getAllUsers = async () => {
    try {
        const users = await userSchema.findAll();
        return users;
    } catch (error) {
        console.error("Error in getAllUsers:", error.message);
        throw new Error("Failed to retrieve users");
    }
};

// Get user by ID
const getUserById = async (id) => {
    try {
        const user = await userSchema.findByPk(id);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } catch (error) {
        console.error("Error in getUserById:", error.message);
        throw new Error("Failed to retrieve user: " + error.message);
    }
};

// Delete user by ID
const deleteUserById = async (id) => {
    try {
        const user = await userSchema.findByPk(id);
        if (!user) {
            throw new Error("User not found");
        }
        await user.destroy();
        return { message: "User deleted successfully" }; // Return success message
    } catch (error) {
        console.error("Error in deleteUserById:", error.message);
        throw new Error("Failed to delete user: " + error.message);
    }
};

// Delete all users
const deleteAllUsers = async () => {
    try {
        await userSchema.destroy({ where: {} });
        return { message: "All users deleted successfully" };
    } catch (error) {
        console.error("Error in deleteAllUsers:", error.message);
        throw new Error("Failed to delete users: " + error.message);
    }
};

// Update user
const updateUser = async (id,body)=>{
    try {
        const user = await userSchema.findByPk(id);
        if (!user) {
            throw new Error("User not found");
        }
        await user.update(body);
        return { message: "User updated successfully" };
    } catch (error) {
        console.error("Error in updateUser:", error.message);
        throw new Error("Failed to update user: " + error.message);
    }
};



module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUserById,
    deleteUserById,
    deleteAllUsers,
    updateUser
};
