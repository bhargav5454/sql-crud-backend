// routes/product.js
const express = require('express');
const { productController, filterProductController } = require('../controller');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { productValidation } = require('../validation');
const productRouter = express.Router();

// Route to create a new product
productRouter
    .route('/create')
    .post(auth, validate(productValidation.createProduct), productController.handleCreateProduct);

// Route to get all products
productRouter
    .route('/getall')
    .get(auth, productController.handleGetAllProducts);

// Route to get a product by ID
productRouter
    .route('/getbyId/:productId')
    .get(auth, validate(productValidation.getProductById), productController.handleGetProductById);

// Route to update a product by ID
productRouter
    .route('/update/:productId')
    .put(auth, validate(productValidation.updateProduct), productController.handleUpdateProduct);

// Route to delete a product by ID
productRouter
    .route('/delete/:productId')
    .delete(auth, validate(productValidation.deleteProductById), productController.handleDeleteProductById);

// Route to delete all products
productRouter
    .route('/deleteall')
    .delete(auth, productController.handleDeleteAllProducts);


productRouter
    .route('/totalproducts')
    .get(auth, filterProductController.getTotalProducts)

productRouter
    .route('/avgprice')
    .get(auth, filterProductController.avgprice)

productRouter
    .route('/asignbycategory')
    .get(auth, filterProductController.countProductsByCategory)

module.exports = productRouter;
