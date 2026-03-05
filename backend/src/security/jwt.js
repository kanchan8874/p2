const jwt = require('jsonwebtoken');
const { getEnvConfig } = require('../config/env.config');

const getSecurityConfig = () => getEnvConfig().security;

const signAccessToken = (payload) => {
  const { jwtAccessSecret, jwtAccessExpiresIn } = getSecurityConfig();

  return jwt.sign(payload, jwtAccessSecret, {
    expiresIn: jwtAccessExpiresIn,
  });
};

const verifyAccessToken = (token) => {
  const { jwtAccessSecret } = getSecurityConfig();
  return jwt.verify(token, jwtAccessSecret);
};

module.exports = {
  signAccessToken,
  verifyAccessToken,
};
