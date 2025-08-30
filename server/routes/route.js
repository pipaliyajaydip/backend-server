import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authorizeRole } from '../middlewares/authorize.js';
import { validate } from '../middlewares/validate.js';
import { registerUserSchema, loginUserSchema, deleteUserSchema } from '../validations/auth.schema.js';
import { pingTest, fetchUsers, addUser, deleteUser } from '../controllers/userController.js';
import { login, logout, refreshToken } from '../controllers/authController.js';

const router = express.Router()

router.get('/ping', pingTest);
router.get('/getusers', authMiddleware, authorizeRole('admin'), fetchUsers);
router.post('/adduser', validate(registerUserSchema, 'body'), addUser);
router.post('/login', validate(loginUserSchema, 'body'), login);
router.delete('/delete', validate(deleteUserSchema, 'body'), authMiddleware, authorizeRole('admin'), deleteUser);
router.post('/refreshToken', refreshToken);
router.post('/logout', logout);

export default router;