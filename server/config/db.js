import pg from "pg";
import dotenv from "dotenv";
const { Pool } = pg;

const envFilePath = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

dotenv.config({
    path: envFilePath
})

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.on('connect', () => {
    console.log('Connected to PostgreSQL');
});

export default pool;