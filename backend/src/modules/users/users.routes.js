const express = require('express');

const {
  listUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('./users.controller');
const {
  validateCreateUserPayload,
  validateUpdateUserPayload,
} = require('./users.validation');

const router = express.Router();

router
  .route('/')
  .get(listUsers)
  .post((req, res, next) => {
    try {
      validateCreateUserPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return createUser(req, res, next);
  });

router
  .route('/:id')
  .get(getUser)
  .patch((req, res, next) => {
    try {
      validateUpdateUserPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return updateUser(req, res, next);
  })
  .delete(deleteUser);

module.exports = router;
