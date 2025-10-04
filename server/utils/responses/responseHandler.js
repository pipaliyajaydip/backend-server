export const successResponse = (
  res,
  statusCode = 200,
  data = {},
  message = 'Success'
) => {

  const response = {
    success: true,
    message: message,
    data: data
  };

  return res.status(statusCode).json(response);
};

export const errorResponse = (
  res,
  statusCode = 500,
  errorCode = '',
  message = 'Something went wrong',
  details = null
) => {
  const response = {
    success: false,
    error: {
      code: errorCode,
      message: message
    }
  };

  if (details) {
    response.error.details = details;
  }

  return res.status(statusCode).json(response);
};
