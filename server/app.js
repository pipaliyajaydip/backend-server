import express from 'express';
import os from 'os';
import cluster from 'cluster';
import cookieParser from 'cookie-parser';
import router from './routes/route.js';
import { PORT } from './config/env.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.disable('x-powered-by');

const noOfCPU = os.availableParallelism
  ? os.availableParallelism()
  : os.cpus().length;

console.log('noOfCPU: ', noOfCPU);

if (cluster.isPrimary) {
  console.log(`CPU If Part: Worker ${process.pid}, PORT: ${PORT}`);
  for (let i = 0; i < noOfCPU; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exited. Code: ${code}, Signal: ${signal}`);
    cluster.fork();
  });
} else {
  console.log(`CPU: Worker ${process.pid}, PORT: ${PORT}`);
  app.use(express.json());
  app.use(cookieParser());
  //app.use('/api/auth', authRoutes);
  //app.use('/api/protected', protectedRoutes);
  app.use('/', router);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} running on port ${PORT}`);
  });

  process.on('uncaughtException', (err) => {
    console.error(`Worker ${process.pid} - Uncaught Exception: ${err.message}`);
    process.exit(1);
  });
}
