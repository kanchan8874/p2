const express = require('express');

const {
  listFaculty,
  createFaculty,
  getFaculty,
  updateFaculty,
  deleteFaculty,
} = require('./faculty.controller');
const {
  validateCreateFacultyPayload,
  validateUpdateFacultyPayload,
} = require('./faculty.validation');
const { authMiddleware, requireRoles } = require('../../middlewares/auth.middleware');
const { Roles } = require('../../constants/roles');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Faculty
 *   description: Faculty management
 */

router.use(authMiddleware);

/**
 * @swagger
 * /faculty:
 *   get:
 *     summary: List all faculty
 *     tags: [Faculty]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Faculty fetched successfully
 *   post:
 *     summary: Create a new faculty member
 *     tags: [Faculty]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: string
 *               employeeCode:
 *                 type: string
 *               designation:
 *                 type: string
 *               department:
 *                 type: string
 *     responses:
 *       201:
 *         description: Faculty created successfully
 */
router
  .route('/')
  .get(requireRoles(Roles.ADMIN, Roles.TEACHER), listFaculty)
  .post((req, res, next) => {
    try {
      validateCreateFacultyPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return requireRoles(Roles.ADMIN)(req, res, () => createFaculty(req, res, next));
  });

/**
 * @swagger
 * /faculty/{id}:
 *   get:
 *     summary: Get a faculty member by ID
 *     tags: [Faculty]
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
 *         description: Faculty fetched successfully
 *   patch:
 *     summary: Update a faculty member by ID
 *     tags: [Faculty]
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
 *         description: Faculty updated successfully
 *   delete:
 *     summary: Delete a faculty member by ID
 *     tags: [Faculty]
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
 *         description: Faculty deleted successfully
 */
router
  .route('/:id')
  .get(requireRoles(Roles.ADMIN, Roles.TEACHER), getFaculty)
  .patch((req, res, next) => {
    try {
      validateUpdateFacultyPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return requireRoles(Roles.ADMIN)(req, res, () => updateFaculty(req, res, next));
  })
  .delete((req, res, next) => requireRoles(Roles.ADMIN)(req, res, () => deleteFaculty(req, res, next)));

module.exports = router;
