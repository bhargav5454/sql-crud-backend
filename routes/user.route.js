const express = require('express');
const { userController } = require('../controller');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { userValidation } = require('../validation');

const userRouter = express.Router();


userRouter
    .route('/create')
    .post(validate(userValidation.userCreate), userController.handleCreateUser);


userRouter
    .route('/login')
    .post(validate(userValidation.loginUser), userController.handleLoginUser);


userRouter
    .route('/getall')
    .get(auth, userController.handleGetAllUsers);


userRouter
    .route('/deleteall')
    .delete(auth, userController.handleDeleteAllUsers);


userRouter
    .route('/getbyId/:userId')
    .get(auth, validate(userValidation.getUserById), userController.handleGetUserById);


userRouter
    .route('/deletebyId/:userId')
    .delete(validate(userValidation.deleteUserById), userController.handleDeleteUserById);


userRouter
    .route('/update/:userId')
    .put(auth, validate(userValidation.updateUser), userController.handleUpdateUser);

module.exports = userRouter;
