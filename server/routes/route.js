import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { validate } from '../middlewares/validate.js';
import { registerUserSchema, loginUserSchema } from '../validations/auth.schema.js';
import { pingTest, fetchUsers, addUser } from '../controllers/userController.js'
import { login, refreshToken } from '../controllers/authController.js';

const router = express.Router()

router.get('/ping', pingTest);
router.get('/getusers', authMiddleware, fetchUsers);
router.post('/adduser', validate(registerUserSchema, 'body'), addUser);
router.post('/login', validate(loginUserSchema, 'body'), login);
router.post('/refreshToken', refreshToken);

export default router;