const validateCreateFacultyPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid faculty payload');
    error.statusCode = 400;
    throw error;
  }

  const requiredFields = ['user', 'employeeCode'];
  for (const field of requiredFields) {
    if (!payload[field]) {
      const error = new Error(`${field} is required`);
      error.statusCode = 400;
      throw error;
    }
  }
};

const validateUpdateFacultyPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid update payload');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  validateCreateFacultyPayload,
  validateUpdateFacultyPayload,
};
