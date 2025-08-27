export const validate = (schema, property = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property], { abortEarly: false });

        if (error) {
            const messages = error.details.map((details) => {
                return details.message;
            })
            return next({
                statusCode: 400,
                errorCode: "SCHEMA_VALIDATION_FAILED",
                message: messages,
            });
        }
        next();
    }
}