const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const { getEnvConfig } = require('./config/env.config');
const { errorMiddleware } = require('./middlewares/error.middleware');
const v1Routes = require('./routes/v1');
const { swaggerSpec } = require('./docs/swagger');

const createApp = () => {
  const app = express();
  const {
    cors: { allowedOrigins, allowCredentials },
  } = getEnvConfig();

  app.use(helmet());

  const corsOptions = {
    origin: allowedOrigins.length ? allowedOrigins : true,
    credentials: allowCredentials,
  };
  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    morgan('dev', {
      skip: () => process.env.NODE_ENV === 'test',
    }),
  );

  // Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // API routes
  app.use('/api/v1', v1Routes);

  // 404 handler
  app.use((req, res) => {
    res.status(404).json({
      success: false,
      message: 'Route not found',
    });
  });

  // Global error handler
  app.use(errorMiddleware);

  return app;
};

module.exports = {
  createApp,
};
