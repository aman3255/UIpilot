const express =  require('express');
const { SignupController, SigninController} = require('../../controllers/auth.controller');
const { AuthMiddleware } = require('../../middlewares/auth.middleware');

const authRouter = express.Router();

authRouter.post('/signup', SignupController);
authRouter.post('/signin', SigninController);


module.exports = authRouter;