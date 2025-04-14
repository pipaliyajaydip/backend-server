import express from "express";
import dotenv from "dotenv";
import router from "./routes/route.js";

const envFilePath = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
dotenv.config({
    path: envFilePath
})

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use('/', router);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});