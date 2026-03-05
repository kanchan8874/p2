const validateCreateStudentPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid student payload');
    error.statusCode = 400;
    throw error;
  }

  const requiredFields = ['user', 'studentCode', 'className', 'academicYear'];
  for (const field of requiredFields) {
    if (!payload[field]) {
      const error = new Error(`${field} is required`);
      error.statusCode = 400;
      throw error;
    }
  }
};

const validateUpdateStudentPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid update payload');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  validateCreateStudentPayload,
  validateUpdateStudentPayload,
};
