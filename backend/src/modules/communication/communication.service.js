const { MessageThread, Message, Notification } = require('./communication.model');

// Threads
const listThreads = async (userId) =>
  MessageThread.find({ participants: userId }).exec();

const createThread = async (payload) => {
  const thread = await MessageThread.create(payload);
  return thread;
};

// Messages
const listMessagesForThread = async (threadId) =>
  Message.find({ thread: threadId }).exec();

const createMessage = async (payload) => {
  const message = await Message.create(payload);
  return message;
};

// Notifications
const listNotificationsForUser = async (userId) =>
  Notification.find({ user: userId }).exec();

const markNotificationRead = async (id) => {
  const notification = await Notification.findByIdAndUpdate(
    id,
    { isRead: true },
    { new: true },
  ).exec();
  if (!notification) {
    const error = new Error('Notification not found');
    error.statusCode = 404;
    throw error;
  }
  return notification;
};

module.exports = {
  listThreads,
  createThread,
  listMessagesForThread,
  createMessage,
  listNotificationsForUser,
  markNotificationRead,
};
