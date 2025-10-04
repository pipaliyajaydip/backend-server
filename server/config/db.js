import pg from 'pg';
const { Pool } = pg;
import {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} from './env.js';

const pool = new Pool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

export default pool;
