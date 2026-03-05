const validateCreateAcademicYearPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid academic year payload');
    error.statusCode = 400;
    throw error;
  }

  if (!payload.name) {
    const error = new Error('name is required');
    error.statusCode = 400;
    throw error;
  }
};

const validateCreateClassPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid class payload');
    error.statusCode = 400;
    throw error;
  }

  const required = ['name', 'code', 'academicYear'];
  for (const field of required) {
    if (!payload[field]) {
      const error = new Error(`${field} is required`);
      error.statusCode = 400;
      throw error;
    }
  }
};

const validateCreateSubjectPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid subject payload');
    error.statusCode = 400;
    throw error;
  }

  const required = ['name', 'code', 'classRef'];
  for (const field of required) {
    if (!payload[field]) {
      const error = new Error(`${field} is required`);
      error.statusCode = 400;
      throw error;
    }
  }
};

module.exports = {
  validateCreateAcademicYearPayload,
  validateCreateClassPayload,
  validateCreateSubjectPayload,
};
