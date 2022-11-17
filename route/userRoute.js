const express = require('express');
const userRouter = express.Router();
const controller = require('../controller/userController');

userRouter.post("/register",controller.register);

userRouter.post("/otp-generate",controller.createOtp);

userRouter.post("/otp-verify",controller.validateSecret);




module.exports = userRouter;