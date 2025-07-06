import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../../config/env.js';


export const generateAccessToken = (userId) => {
    return jwt.sign(
        { userId },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}