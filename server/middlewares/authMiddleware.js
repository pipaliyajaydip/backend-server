import { verifyAccessToken } from "../utils/Jwt/token.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log("req.header: ", req.headers);

    if (!authHeader?.startsWith('Bearer ')) {
        return next({
            statusCode: 401,
            errorCode: "ACCESS_TOKEN_NOT_PRESENT",
            message: "Unauthorized access."
        })
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedData = verifyAccessToken(token);
        req.userInfo = decodedData;
        next();
    } catch (err) {
        return next({
            statusCode: 403,
            errorCode: "NOT_VALID_ACCESS_TOKEN",
            message: "Access token invalid or expired."
        })
    }
}