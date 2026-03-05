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
const { authMiddleware, requireRoles } = require('../../middlewares/auth.middleware');
const { Roles } = require('../../constants/roles');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management (admin only)
 */

// All user management routes restricted to ADMIN
router.use(authMiddleware, requireRoles(Roles.ADMIN));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ADMIN, TEACHER, STUDENT]
 *               profile:
 *                 type: object
 *                 properties:
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   phone:
 *                     type: string
 *             required:
 *               - email
 *               - password
 *               - role
 *     responses:
 *       201:
 *         description: User created successfully
 */
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

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User fetched successfully
 *   patch:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
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
