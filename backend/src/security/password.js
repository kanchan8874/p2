const bcrypt = require('bcrypt');
const { getEnvConfig } = require('../config/env.config');

const getSaltRounds = () => getEnvConfig().security.bcryptSaltRounds;

const hashPassword = async (plainPassword) => {
  const saltRounds = getSaltRounds();
  return bcrypt.hash(plainPassword, saltRounds);
};

const comparePassword = async (plainPassword, hash) => bcrypt.compare(plainPassword, hash);

module.exports = {
  hashPassword,
  comparePassword,
};
