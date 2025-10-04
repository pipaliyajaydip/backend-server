import { v4 as uuidv4 } from 'uuid';
import { errorResponse } from '../utils/responses/responseHandler.js';

export const errorHandler = (err, req, res, next) => {
  const errorId = uuidv4();
  console.log(`[ERROR] [${errorId}] ${req.method} ${req.originalUrl}`, err);

  const statusCode = err.statusCode || 500;
  const errorCode = err.errorCode || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected error occurred.';
  const details = err.details || null;

  return errorResponse(
    res,
    statusCode,
    errorCode,
    message,
    details
  );
};
