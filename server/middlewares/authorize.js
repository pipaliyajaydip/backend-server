export const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        console.log("req from authorize: ", req);
        if (!req.userInfo) {
            return next({
                statusCode: 401,
                errorCode: "UNAUTHORIZED_ACCESS",
                message: "Forbidden. You are not allowed to perform this action."
            });
        }
        if (!allowedRoles.includes(req.userInfo?.role)) {
            return next({
                statusCode: 403,
                errorCode: "UNAUTHORIZED_ACCESS",
                message: "Forbidden. You are not allowed to perform this action."
            });
        }
        next();
    }
}