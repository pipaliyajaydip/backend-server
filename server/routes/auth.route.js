import express from 'express';
import { validate } from '../middlewares/validate.js';
import { loginUserSchema } from '../validations/auth.schema.js';
import { login, logout, refreshToken } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/login', validate(loginUserSchema, 'body'), login);
authRouter.post('/refreshToken', refreshToken);
authRouter.post('/logout', logout);

export default authRouter;
