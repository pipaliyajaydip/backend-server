import express from 'express';
import { validate } from '../middlewares/validate.js';
import { loginUserSchema } from '../validations/auth.schema.js';
import { login, logout, refreshToken } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/login', validate(loginUserSchema, 'body'), login);
authRouter.post('/logout', logout);
authRouter.post('/refreshToken', refreshToken);

export default authRouter;
