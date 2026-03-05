const validateCreateNoticePayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid notice payload');
    error.statusCode = 400;
    throw error;
  }

  const required = ['title', 'content'];
  for (const field of required) {
    if (!payload[field]) {
      const error = new Error(`${field} is required`);
      error.statusCode = 400;
      throw error;
    }
  }
};

const validateUpdateNoticePayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid update payload');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  validateCreateNoticePayload,
  validateUpdateNoticePayload,
};
