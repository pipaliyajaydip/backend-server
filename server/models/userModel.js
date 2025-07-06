import pool from "../config/db.js";

export const getUsers = async () => {
    const result = await pool.query(
        `SELECT id, name, email FROM users`
    );
    return result.rows;
}

export const isUserExists = async (email) => {
    const result = await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );
    return result.rows.length > 0;
}

export const insertUser = async (name, email, password) => {
    const result = await pool.query(
        `
            INSERT INTO
                users (name, email, password)
            VALUES
                ($1, $2, $3)
            RETURNING *
        `,
        [name, email, password]
    );
    return result.rows[0];
}

export const loginCredntial = async (email) => {
    const result = await pool.query(
        `
            SELECT
                id, email, password
            FROM
                users
            WHERE
                email = $1
        `,
        [email]
    );
    return result.rows[0];
}