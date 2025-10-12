import { successResponse } from '../utils/responses/responseHandler.js';

export const pingTest = (req, res, next) => {
  try {
    // res.status(200).json({
    //     msg: `Your api is up and running on worker ${process.pid}`
    // });

    return successResponse(
      res,
      200,
      { apiTestResult: 'The API is ready for use.' },
      '<#Happy_Coding!/>'
    );
  } catch (err) {
    // res.status(500).json({
    //     msg: `something went wrong on WorkerId: ${process.pid}`,
    //     error: err.message
    // });
    return next({
      statusCode: 500,
      errorCode: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occurred.',
      originalMessage: err.message
    });
  }
};