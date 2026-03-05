const { asyncHandler } = require('../../utils/asyncHandler');
const { successResponse } = require('../../utils/apiResponse');
const communicationService = require('./communication.service');

// Threads
const listThreads = asyncHandler(async (req, res) => {
  const threads = await communicationService.listThreads(req.user?.id);
  return successResponse(res, threads, 'Threads fetched successfully');
});

const createThread = asyncHandler(async (req, res) => {
  const thread = await communicationService.createThread(req.body);
  return successResponse(res, thread, 'Thread created successfully', 201);
});

// Messages
const listMessagesForThread = asyncHandler(async (req, res) => {
  const messages = await communicationService.listMessagesForThread(req.params.threadId);
  return successResponse(res, messages, 'Messages fetched successfully');
});

const createMessage = asyncHandler(async (req, res) => {
  const message = await communicationService.createMessage({
    ...req.body,
    thread: req.params.threadId,
    sender: req.user?.id,
  });
  return successResponse(res, message, 'Message created successfully', 201);
});

// Notifications
const listNotifications = asyncHandler(async (req, res) => {
  const notifications = await communicationService.listNotificationsForUser(req.user?.id);
  return successResponse(res, notifications, 'Notifications fetched successfully');
});

const markNotificationRead = asyncHandler(async (req, res) => {
  const notification = await communicationService.markNotificationRead(req.params.id);
  return successResponse(res, notification, 'Notification marked as read');
});

module.exports = {
  listThreads,
  createThread,
  listMessagesForThread,
  createMessage,
  listNotifications,
  markNotificationRead,
};
