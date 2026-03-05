const { StatusCodes } = require('../constants/httpStatus');

// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || 'Internal server error';

  // eslint-disable-next-line no-console
  console.error('[error]', {
    message: err.message,
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    message,
    details: err.details || null,
  });
};

module.exports = {
  errorMiddleware,
};
