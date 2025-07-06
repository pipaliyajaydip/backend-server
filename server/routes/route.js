import express from 'express';
import { pingTest, fetchUsers, addUser } from '../controllers/userController.js'
import { login } from '../controllers/authController.js';

const router = express.Router()

router.get('/ping', pingTest);
router.get('/getusers', fetchUsers);
router.post('/adduser', addUser)
router.post('/login', login);
export default router;