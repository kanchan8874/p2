const validateCreateThreadPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid thread payload');
    error.statusCode = 400;
    throw error;
  }

  if (!payload.subject) {
    const error = new Error('subject is required');
    error.statusCode = 400;
    throw error;
  }
};

const validateCreateMessagePayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid message payload');
    error.statusCode = 400;
    throw error;
  }

  if (!payload.body) {
    const error = new Error('body is required');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  validateCreateThreadPayload,
  validateCreateMessagePayload,
};
