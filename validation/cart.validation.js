// validation/cart.validation.js
const Joi = require('joi');

// Validation for adding a product to the cart
const addToCart = {
    body: Joi.object({
        productId: Joi.number()
            .integer()
            .required()
            .messages({
                'number.base': 'Product ID must be a valid number.',
                'any.required': 'Product ID is required.'
            }),
        quantity: Joi.number()
            .integer()
            .min(1)
            .required()
            .messages({
                'number.min': 'Quantity must be at least 1.',
                'any.required': 'Quantity is required.'
            })
    })
};


// Validation for updating a cart item (e.g., quantity)
const updateCartItem = {
    params: Joi.object({
        cartId: Joi.number()
            .integer()
            .required()
            .messages({
                'number.base': 'Cart ID must be a valid number.',
                'any.required': 'Cart ID is required.'
            })
    }),
    body: Joi.object({
        quantity: Joi.number()
            .integer()
            .min(1)
            .required()
            .messages({
                'number.min': 'Quantity must be at least 1.',
                'any.required': 'Quantity is required.'
            })
    })
};

// Validation for removing a cart item
const removeCartItem = {
    params: Joi.object({
        cartItemId: Joi.number()
            .integer()
            .required()
            .messages({
                'number.base': 'Cart ID must be a valid number.',
                'any.required': 'Cart ID is required.'
            })
    })
};

module.exports = {
    addToCart,
    updateCartItem,
    removeCartItem
};
