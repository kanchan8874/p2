const validateCreateEventPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid event payload');
    error.statusCode = 400;
    throw error;
  }

  const required = ['title', 'startDateTime'];
  for (const field of required) {
    if (!payload[field]) {
      const error = new Error(`${field} is required`);
      error.statusCode = 400;
      throw error;
    }
  }
};

const validateUpdateEventPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid update payload');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  validateCreateEventPayload,
  validateUpdateEventPayload,
};
