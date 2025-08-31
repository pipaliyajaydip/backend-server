import { verifyAccessToken } from "../utils/Jwt/token.js";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const accessTokenFromCookie = req.cookies.accessToken;

    console.log("req.header: ", req.headers);

    if (!authHeader || !authHeader?.startsWith('Bearer ') || !accessTokenFromCookie) {
        return next({
            statusCode: 401,
            errorCode: "ACCESS_TOKEN_NOT_PRESENT",
            message: "Unauthorized access."
        });
    }

    try {
        const token = authHeader.split(' ')[1];

        if (!token || !accessTokenFromCookie) {
            return next({
                statusCode: 401,
                errorCode: "ACCESS_TOKEN_NOT_PRESENT",
                message: "Unauthorized access."
            });
        }

        const decodedData = verifyAccessToken(token);
        verifyAccessToken(accessTokenFromCookie);
        console.log("decodedData: ", decodedData);
        req.userInfo = decodedData;
        next();
    } catch (err) {
        return next({
            statusCode: 403,
            errorCode: "NOT_VALID_ACCESS_TOKEN",
            message: "Access token invalid or expired."
        });
    }
}