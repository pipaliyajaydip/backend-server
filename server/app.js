import express from "express";
import os from "os";
import cluster from "cluster";
import dotenv from "dotenv";
import router from "./routes/route.js";
dotenv.config();

const app = express();

const envFilePath = process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';

dotenv.config({
    path: envFilePath
});

const noOfCPU = os.availableParallelism
    ? os.availableParallelism()
    : os.cpus().length;

const PORT = process.env.PORT;

console.log("noOfCPU: ", noOfCPU);

if (cluster.isPrimary) {
    console.log(`CPU If Part: Worker ${process.pid}, PORT: ${PORT}`);
    for (let i = 0; i < noOfCPU; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} exited. Code: ${code}, Signal: ${signal}`);
        cluster.fork();
    });
} else {
    console.log(`CPU: Worker ${process.pid}, PORT: ${PORT}`);
    app.use(express.json());
    app.use("/", router);

    app.listen(PORT, () => {
        console.log(`Worker ${process.pid} running on port ${PORT}`);
    });

    process.on("uncaughtException", (err) => {
        console.error(`Worker ${process.pid} - Uncaught Exception: ${err.message}`);
        process.exit(1);
    });
}