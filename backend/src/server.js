const http = require('http');

const { createApp } = require('./app');
const { connectMongo } = require('./database/mongoose.connection');
const { getEnvConfig } = require('./config/env.config');

const startServer = async () => {
  const env = getEnvConfig();

  await connectMongo();

  const app = createApp();
  const server = http.createServer(app);

  server.listen(env.app.port, () => {
    // eslint-disable-next-line no-console
    console.log(`[server] Listening on port ${env.app.port}`);
  });

  const shutdown = (signal) => {
    // eslint-disable-next-line no-console
    console.log(`[server] Received ${signal}, shutting down gracefully...`);
    server.close(() => {
      // eslint-disable-next-line no-console
      console.log('[server] HTTP server closed');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  process.on('unhandledRejection', (reason) => {
    // eslint-disable-next-line no-console
    console.error('[server] Unhandled Rejection', reason);
  });

  process.on('uncaughtException', (err) => {
    // eslint-disable-next-line no-console
    console.error('[server] Uncaught Exception', err);
  });
};

if (require.main === module) {
  startServer().catch((err) => {
    // eslint-disable-next-line no-console
    console.error('[server] Failed to start', err);
    process.exit(1);
  });
}

module.exports = {
  startServer,
};
