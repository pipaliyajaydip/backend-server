import express from 'express';
import healthRouter from './health.route.js';
import authRouter from './auth.route.js';
import userRouter from './user.route.js';
import docs from './docs.route.js';
const router = express.Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/docs', docs)

export default router;
