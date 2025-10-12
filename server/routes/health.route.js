import express from 'express';
import { pingTest } from '../controllers/health.controller.js';

const healthRouter = express.Router();

healthRouter.get('/ping', pingTest);

export default healthRouter;