import express from "express";
import os from "os";
import cluster from "cluster";
import router from "./routes/route.js";
import { PORT } from "./config/env.js"

const app = express();

const noOfCPU = os.availableParallelism
    ? os.availableParallelism()
    : os.cpus().length;

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