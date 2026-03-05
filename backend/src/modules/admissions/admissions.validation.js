const validateCreateApplicationPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid application payload');
    error.statusCode = 400;
    throw error;
  }

  const required = ['applicationNo', 'studentName', 'appliedClass'];
  for (const field of required) {
    if (!payload[field]) {
      const error = new Error(`${field} is required`);
      error.statusCode = 400;
      throw error;
    }
  }
};

const validateUpdateApplicationPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid update payload');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  validateCreateApplicationPayload,
  validateUpdateApplicationPayload,
};
