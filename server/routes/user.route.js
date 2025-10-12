import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authorizeRole } from '../middlewares/authorize.js';
import { validate } from '../middlewares/validate.js';
import { registerUserSchema, deleteUserSchema } from '../validations/auth.schema.js';
import { pingTest, fetchUsers, addUser, deleteUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/ping', pingTest);
userRouter.get('/getusers', authMiddleware, authorizeRole('admin'), fetchUsers);
userRouter.post('/adduser', validate(registerUserSchema, 'body'), addUser);
userRouter.delete('/delete', validate(deleteUserSchema, 'body'), authMiddleware, authorizeRole('admin'), deleteUser);

export default userRouter;
