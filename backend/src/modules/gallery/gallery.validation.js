const validateCreateAlbumPayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid album payload');
    error.statusCode = 400;
    throw error;
  }

  if (!payload.title) {
    const error = new Error('title is required');
    error.statusCode = 400;
    throw error;
  }
};

const validateCreateImagePayload = (payload) => {
  if (!payload || typeof payload !== 'object') {
    const error = new Error('Invalid image payload');
    error.statusCode = 400;
    throw error;
  }

  if (!payload.imageUrl) {
    const error = new Error('imageUrl is required');
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  validateCreateAlbumPayload,
  validateCreateImagePayload,
};
