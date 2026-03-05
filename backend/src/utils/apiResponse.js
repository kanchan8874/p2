const { StatusCodes } = require('../constants/httpStatus');

const successResponse = (res, data = null, message = 'OK', statusCode = StatusCodes.OK) =>
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });

const errorResponse = (
  res,
  message = 'Something went wrong',
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR,
  details = null,
) =>
  res.status(statusCode).json({
    success: false,
    message,
    details,
  });

module.exports = {
  successResponse,
  errorResponse,
};
