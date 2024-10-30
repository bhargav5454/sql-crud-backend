const Joi = require('joi');

// Define regex patterns
const nameRegex = /^[a-zA-Z\s]+$/; // Only letters and spaces
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/; // Minimum 6 characters, at least one letter, one number, and one special character

// Validation for creating a user
const userCreate = {
    body: Joi.object({
        name: Joi.string()
            .pattern(nameRegex)
            .min(2)
            .required()
            .messages({
                'string.pattern.base': 'Name must contain only letters and spaces.',
                'string.min': 'Name must be at least 2 characters long.',
                'any.required': 'Name is required.'
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Email must be a valid email address.',
                'any.required': 'Email is required.'
            }),
        password: Joi.string()
            .pattern(passwordRegex)
            .min(6)
            .required()
            .messages({
                'string.pattern.base': 'Password must be at least 6 characters long and contain at least one letter, one number, and one special character.',
                'string.min': 'Password must be at least 6 characters long.',
                'any.required': 'Password is required.'
            })
    })
};

// Validation for logging in a user
const loginUser = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.email': 'Email must be a valid email address.',
                'any.required': 'Email is required.'
            }),
        password: Joi.string()
            .required()
            .messages({
                'any.required': 'Password is required.'
            })
    })
};

// Validation for getting a user by ID
const getUserById = {
    params: Joi.object({
        userId: Joi.string()
            .required()
            .messages({
                'any.required': 'User ID is required.'
            })
    })
};

// Validation for deleting a user by ID
const deleteUserById = {
    params: Joi.object({
        userId: Joi.string()
            .required()
            .messages({
                'any.required': 'User ID is required.'
            })
    })
};

// Validation for updating a user by ID
const updateUser = {
    params: Joi.object({
        userId: Joi.string()
            .required()
            .messages({
                'any.required': 'User ID is required.'
            })
    })
};

module.exports = {
    userCreate,
    loginUser,
    getUserById,
    deleteUserById,
    updateUser
};
