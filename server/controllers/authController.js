import bcrypt from "bcryptjs";
import { userAuthDetails } from "../models/userModel.js"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/Jwt/token.js";
import { successResponse } from "../utils/responses/responseHandler.js";
import { JWT_EXPIRES_IN, JWT_EXPIRES_AT, REFRESH_EXPIRES_IN, REFRESH_EXPIRE_AT } from "../config/env.js";

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next({
                statusCode: 400,
                errorCode: "FIELDS_ARE_REQUIRED",
                message: "email and password are required."
            });
        }

        const user = await userAuthDetails(email);

        if (!user) {
            return next({
                statusCode: 401,
                errorCode: "INVALID_CREDENTIALS",
                message: "Invalid credentials."
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return next({
                statusCode: 401,
                errorCode: "INVALID_CREDENTIALS",
                message: "Invalid credentials."
            });
        }

        const accessToken = generateAccessToken(user.id);
        const refreshToke = generateRefreshToken(user.id);

        const result = {
            userEmail: user.email,
            tokenType: 'Bearer',
            accessToken: accessToken,
            expireIn: JWT_EXPIRES_IN,
            expireAt: JWT_EXPIRES_AT
        };

        res.cookie('refreshToken', refreshToke, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: REFRESH_EXPIRE_AT

        });

        return successResponse(
            res,
            200,
            result,
            "User signed in successfully."
        );

    } catch (err) {
        return next({
            statusCode: 500,
            errorCode: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred.",
            originalMessage: err.message
        });
    }
};

export const refreshToken = (req, res, next) => {
    console.log("req.cookie: ", req.cookies);
    const token = req.cookies.refreshToken;

    if (!token) {
        return next({
            statusCode: 401,
            errorCode: "REF_TOKEN_NOT_PRESENT",
            message: "Refresh token not provided."
        });
    }

    try {
        const { userId } = verifyRefreshToken(token);
        const newAccessToken = generateAccessToken(userId);
        const result = {
            tokenType: 'Bearer',
            accessToken: newAccessToken,
            expireIn: JWT_EXPIRES_IN,
            expireAt: JWT_EXPIRES_AT
        }
        return successResponse(
            res,
            200,
            result,
            "New access token generated successfully."
        );

    } catch (err) {
        return next({
            statusCode: 403,
            errorCode: "NOT_VALID_REFRESH_TOKEN",
            message: "Invalid refresh token.",
            originalMessage: err.message
        });
    }
}