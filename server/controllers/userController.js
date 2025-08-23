import bcryptjs from 'bcryptjs';
import { getUsers, isUserExists, insertUser, deleteUserData } from '../models/userModel.js';
import { successResponse } from '../utils/responses/responseHandler.js';

const SALT_ROUNDS = 10;

export const pingTest = (req, res, next) => {
    try {
        // res.status(200).json({
        //     msg: `Your api is up and running on worker ${process.pid}`
        // });

        return successResponse(
            res,
            200,
            { apiTestResult: "The API is ready for use." },
            "<#Happy_Coding!/>"
        );
    } catch (err) {
        // res.status(500).json({
        //     msg: `something went wrong on WorkerId: ${process.pid}`,
        //     error: err.message
        // });
        return next({
            statusCode: 500,
            errorCode: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred.",
            originalMessage: err.message
        });
    }
}

export const fetchUsers = async (req, res, next) => {
    console.log("req from fecth user: ", req);
    try {
        const result = await getUsers();
        // res.status(200).json({
        //     data: result
        // });

        return successResponse(
            res,
            200,
            result,
            "All user data fetched successfully."
        );
    } catch (err) {
        // res.status(500).json({
        //     error: 'something went wrong while fetching the user data'
        // });
        return next({
            statusCode: 500,
            errorCode: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred.",
            originalMessage: err.message
        });
    }
}

export const addUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next({
                statusCode: 400,
                errorCode: "FIELDS_ARE_REQUIRED",
                message: "name, email, and password are required."
            });
        }

        const userExists = await isUserExists(email);
        console.log("userExists", userExists);

        if (userExists) {
            return next({
                statusCode: 409,
                errorCode: "USER_ALREADY_EXISTS",
                message: "User already exists"
            });
        }

        const hashedPassword = await bcryptjs.hash(password, SALT_ROUNDS);
        const data = await insertUser(name, email, hashedPassword);
        const result = {
            name: data?.name,
            email: data?.email
        }
        // res.status(201).json({
        //     msg: "user inserted successfully",
        //     data: result
        // });

        return successResponse(
            res,
            201,
            result,
            "user inserted successfully"
        );
    } catch (err) {
        // res.status(500).json({
        //     msg: "something went wrong on addUser endpoint",
        //     error: err.message
        // });

        return next({
            statusCode: 500,
            errorCode: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred.",
            originalMessage: err.message
        });
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
             return next({
                statusCode: 400,
                errorCode: "FIELDS_ARE_REQUIRED",
                message: "User email is required."
            });
        }

        const result = await deleteUserData(email);

        console.log("result from delete", result);

        if (!result) {
             return next({
                statusCode: 404,
                errorCode: "DETAILS_NOT_FOUND",
                message: "User not found."
            });
        }

        return successResponse(
            res,
            200,
            result,
            "User deleted successfully."
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

