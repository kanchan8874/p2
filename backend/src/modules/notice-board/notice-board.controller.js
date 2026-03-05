const { asyncHandler } = require('../../utils/asyncHandler');
const { successResponse } = require('../../utils/apiResponse');
const noticeService = require('./notice-board.service');

const listNotices = asyncHandler(async (req, res) => {
  const notices = await noticeService.listNotices();
  return successResponse(res, notices, 'Notices fetched successfully');
});

const createNotice = asyncHandler(async (req, res) => {
  const notice = await noticeService.createNotice(req.body);
  return successResponse(res, notice, 'Notice created successfully', 201);
});

const getNotice = asyncHandler(async (req, res) => {
  const notice = await noticeService.getNoticeById(req.params.id);
  return successResponse(res, notice, 'Notice fetched successfully');
});

const updateNotice = asyncHandler(async (req, res) => {
  const notice = await noticeService.updateNotice(req.params.id, req.body);
  return successResponse(res, notice, 'Notice updated successfully');
});

const deleteNotice = asyncHandler(async (req, res) => {
  const notice = await noticeService.deleteNotice(req.params.id);
  return successResponse(res, notice, 'Notice deleted successfully');
});

module.exports = {
  listNotices,
  createNotice,
  getNotice,
  updateNotice,
  deleteNotice,
};
