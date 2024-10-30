const express = require('express')
const router = express.Router()
const userRouter = require('./user.route')
const productRouter = require('./product.route')
const cartRoute = require('./cart.route')

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/cart', cartRoute)

module.exports = router
