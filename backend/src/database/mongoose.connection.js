const mongoose = require('mongoose');
const { getEnvConfig } = require('../config/env.config');

let connectionPromise;

const connectMongo = () => {
  if (connectionPromise) {
    return connectionPromise;
  }

  const {
    mongo: { uri },
  } = getEnvConfig();

  mongoose.set('strictQuery', true);

  connectionPromise = mongoose
    .connect(uri, {
      autoIndex: false,
      maxPoolSize: 10,
    })
    .then((conn) => {
      // eslint-disable-next-line no-console
      console.log('[mongo] Connected to database');
      return conn;
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error('[mongo] Connection error', err);
      process.exitCode = 1;
      throw err;
    });

  return connectionPromise;
};

const disconnectMongo = () =>
  mongoose
    .disconnect()
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('[mongo] Disconnected from database');
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error('[mongo] Disconnection error', err);
    });

module.exports = {
  connectMongo,
  disconnectMongo,
};
