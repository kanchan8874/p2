const dotenv = require('dotenv');

let isLoaded = false;

const loadEnv = () => {
  if (isLoaded) {
    return;
  }

  const env = process.env.NODE_ENV || 'development';

  const result = dotenv.config();
  if (result.error && env !== 'production') {
    // In production we usually rely on the process manager to inject env vars.
    // In non‑production this helps catch missing .env early.
    // eslint-disable-next-line no-console
    console.warn('[env] .env file not found, proceeding with process.env only');
  }

  isLoaded = true;
};

const getRequired = (key) => {
  const value = process.env[key];
  if (typeof value === 'undefined' || value === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const getNumber = (key, defaultValue) => {
  const raw = process.env[key];
  if (typeof raw === 'undefined' || raw === '') {
    return defaultValue;
  }
  const parsed = Number(raw);
  if (Number.isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a number`);
  }
  return parsed;
};

const getBoolean = (key, defaultValue) => {
  const raw = process.env[key];
  if (typeof raw === 'undefined' || raw === '') {
    return defaultValue;
  }
  return ['1', 'true', 'yes', 'on'].includes(String(raw).toLowerCase());
};

const getEnvConfig = () => {
  loadEnv();

  const nodeEnv = process.env.NODE_ENV || 'development';

  return {
    nodeEnv,
    isProduction: nodeEnv === 'production',
    isDevelopment: nodeEnv === 'development',
    isTest: nodeEnv === 'test',

    app: {
      name: process.env.APP_NAME || 'school-management-backend',
      port: getNumber('PORT', 5000),
      baseUrl: process.env.APP_BASE_URL || 'http://localhost:5000',
    },

    mongo: {
      uri: getRequired('MONGODB_URI'),
    },

    security: {
      jwtAccessSecret: getRequired('JWT_ACCESS_SECRET'),
      jwtAccessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
      jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || getRequired('JWT_ACCESS_SECRET'),
      jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
      bcryptSaltRounds: getNumber('BCRYPT_SALT_ROUNDS', 10),
    },

    cors: {
      allowedOrigins: (process.env.CORS_ALLOWED_ORIGINS || '').split(',').filter(Boolean),
      allowCredentials: getBoolean('CORS_ALLOW_CREDENTIALS', true),
    },
  };
};

module.exports = {
  getEnvConfig,
};
