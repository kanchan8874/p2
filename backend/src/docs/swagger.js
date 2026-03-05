const swaggerJsdoc = require('swagger-jsdoc');

const { getEnvConfig } = require('../config/env.config');

const env = getEnvConfig();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'School Management System API',
    version: '1.0.0',
    description: 'REST API documentation for the School Management System backend.',
  },
  servers: [
    {
      url: `${env.app.baseUrl}/api/v1`,
      description: `${env.nodeEnv} server`,
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['src/modules/**/*.routes.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerSpec,
};

