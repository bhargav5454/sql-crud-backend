// validation/product.validation.js
const Joi = require("joi");

// Validation for creating a product
const createProduct = {
  body: Joi.object({
    name: Joi.string()
      .min(2)
      .max(50) // Max length limit
      .required()
      .messages({
        "string.min": "Product name must be at least 2 characters long.",
        "string.max": "Product name cannot be longer than 50 characters.",
        "any.required": "Product name is required.",
      }),
    description: Joi.string().min(10).required().messages({
      "string.min": "Product description must be at least 10 characters long.",
      "any.required": "Product description is required.",
    }),
    price: Joi.number()
      .greater(0)
      .precision(2)
      .max(600000) // Allow only two decimal places for price
      .required()
      .messages({
        "number.greater": "Price must be greater than 0.",
        "number.base": "Price must be a valid number.",
        "any.required": "Price is required.",
      }),
    quantity: Joi.number()
      .integer()
      .min(1) // Ensure quantity is at least 1
      .required()
      .messages({
        "number.integer": "Quantity must be an integer.",
        "number.min": "Quantity cannot be less than 1.",
        "any.required": "Quantity is required.",
      }),
    category: Joi.string().required().messages({
      "any.required": "Category is required.",
    }),
  }),
};

// Validation for getting a product by ID
const getProductById = {
  params: Joi.object({
    productId: Joi.string().required().messages({
      "any.required": "Product ID is required.",
    }),
  }),
};

// Validation for updating a product
const updateProduct = {
  params: Joi.object({
    productId: Joi.string().required().messages({
      "any.required": "Product ID is required.",
    }),
  }),
  body: Joi.object({
    id: Joi.number().optional(),
    name: Joi.string()
      .min(2)
      .max(50) // Max length limit
      .required()
      .messages({
        "string.min": "Product name must be at least 2 characters long.",
        "string.max": "Product name cannot be longer than 50 characters.",
        "any.required": "Product name is required.",
      }),
    description: Joi.string().min(10).required().messages({
      "string.min": "Product description must be at least 10 characters long.",
      "any.required": "Product description is required.",
    }),
    price: Joi.number()
      .greater(0)
      .precision(2)
      .max(600000) // Allow only two decimal places for price
      .required()
      .messages({
        "number.greater": "Price must be greater than 0.",
        "number.base": "Price must be a valid number.",
        "any.required": "Price is required.",
      }),
    quantity: Joi.number()
      .integer()
      .min(1) // Ensure quantity is at least 1
      .required()
      .messages({
        "number.integer": "Quantity must be an integer.",
        "number.min": "Quantity cannot be less than 1.",
        "any.required": "Quantity is required.",
      }),
    category: Joi.string().required().messages({
      "any.required": "Category is required.",
    }),
    updatedAt: Joi.date().iso().optional(),
    createdAt: Joi.date().iso().optional(),
    creator: Joi.object().optional(),
    createdBy: Joi.string().uuid().optional(),
  }),
};

// Validation for deleting a product by ID
const deleteProductById = {
  params: Joi.object({
    productId: Joi.string().required().messages({
      "any.required": "Product ID is required.",
    }),
  }),
};

module.exports = {
  createProduct,
  getProductById,
  updateProduct,
  deleteProductById,
};
