import bcrypt from "bcryptjs";
import { loginCredntial } from "../models/userModel.js"
import { generateAccessToken } from "../utils/Jwt/token.js";
import { successResponse } from "../utils/responses/responseHandler.js";

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

        const user = await loginCredntial(email);
        
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
        const result = {
            userEmail: user.email,
            accessToken: accessToken
        };

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
}