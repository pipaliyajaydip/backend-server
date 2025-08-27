import jwt from 'jsonwebtoken';
import {
    JWT_SECRET,
    JWT_EXPIRES_IN,
    REFRESH_SECRET,
    REFRESH_EXPIRES_IN
} from '../../config/env.js';

export const generateAccessToken = (userDetails) => {
    return jwt.sign(
        {
            id: userDetails?.id,
            email: userDetails?.email,
            role: userDetails?.role,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
}

export const generateRefreshToken = (userDetails) => {
    return jwt.sign(
        {
            id: userDetails?.id,
            email: userDetails?.email,
            role: userDetails?.role,
        },
        REFRESH_SECRET,
        { expiresIn: REFRESH_EXPIRES_IN }
    );
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
}

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_SECRET);
}