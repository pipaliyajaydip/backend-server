import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { pingTest, fetchUsers, addUser } from '../controllers/userController.js'
import { login, refreshToken } from '../controllers/authController.js';

const router = express.Router()

router.get('/ping', pingTest);
router.get('/getusers', authMiddleware, fetchUsers);
router.post('/adduser', addUser)
router.post('/login', login);
router.post('/refreshToken', refreshToken);

export default router;