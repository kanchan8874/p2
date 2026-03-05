const Notice = require('./notice-board.model');

const listNotices = async () => Notice.find({ isActive: true }).exec();

const createNotice = async (payload) => {
  const notice = await Notice.create(payload);
  return notice;
};

const getNoticeById = async (id) => {
  const notice = await Notice.findById(id).exec();
  if (!notice) {
    const error = new Error('Notice not found');
    error.statusCode = 404;
    throw error;
  }
  return notice;
};

const updateNotice = async (id, payload) => {
  const notice = await Notice.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).exec();
  if (!notice) {
    const error = new Error('Notice not found');
    error.statusCode = 404;
    throw error;
  }
  return notice;
};

const deleteNotice = async (id) => {
  const notice = await Notice.findByIdAndDelete(id).exec();
  if (!notice) {
    const error = new Error('Notice not found');
    error.statusCode = 404;
    throw error;
  }
  return notice;
};

module.exports = {
  listNotices,
  createNotice,
  getNoticeById,
  updateNotice,
  deleteNotice,
};
