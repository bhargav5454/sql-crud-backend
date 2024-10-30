const express = require('express');
const auth = require('../middleware/auth');
const { cartController } = require('../controller');
const validate = require('../middleware/validate');
const { cartValidation } = require('../validation');
const cartRoute = express.Router()

cartRoute.route('/get')
    .get(auth, cartController.handleGetCartItemById);

cartRoute.route('/add')
    .post(auth, validate(cartValidation.addToCart), cartController.handleAddProductToCart)

cartRoute.route('/remove/:cartItemId')
    .delete(auth, validate(cartValidation.removeCartItem), cartController.handleRemoveProductFromCart)

cartRoute.route('/update/:productId')
    .put(auth, validate(cartValidation.updateCartItem), cartController.handleUpdateProductQuantityInCart)

cartRoute.route('/total')
    .get(auth, cartController.handleGetCartTotal)
// cartRoute.route('/get')
//     .get(auth, cartController.handleGetCartItems)


cartRoute.route('/empty')
    .delete(auth, cartController.handleEmptyCart)





module.exports = cartRoute