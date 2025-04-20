import express from 'express';
import { pingTest, fetchUsers, addUser } from '../controllers/userController.js'

const router = express.Router()

router.get('/ping', pingTest);
router.get('/getusers', fetchUsers);
router.post('/adduser', addUser)

export default router;