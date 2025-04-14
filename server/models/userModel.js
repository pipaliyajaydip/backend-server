import pool from "../config/db.js";

export const getUsers = async () => {
    console.log("form usermodel")
    const result = await pool.query(`SELECT * FROM users`)
    console.log("result.rows", result.rows)
    return result.rows;
}