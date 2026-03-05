const express = require('express');

const {
  listStudents,
  createStudent,
  getStudent,
  updateStudent,
  deleteStudent,
} = require('./students.controller');
const {
  validateCreateStudentPayload,
  validateUpdateStudentPayload,
} = require('./students.validation');
const { authMiddleware, requireRoles } = require('../../middlewares/auth.middleware');
const { Roles } = require('../../constants/roles');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: Student management
 */

// Students management restricted to ADMIN (and TEACHER for reads)
router.use(authMiddleware);

/**
 * @swagger
 * /students:
 *   get:
 *     summary: List all students
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Students fetched successfully
 *   post:
 *     summary: Create a new student
 *     tags: [Students]
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
 *               studentCode:
 *                 type: string
 *               className:
 *                 type: string
 *               section:
 *                 type: string
 *               academicYear:
 *                 type: string
 *             required:
 *               - user
 *               - studentCode
 *               - className
 *               - academicYear
 *     responses:
 *       201:
 *         description: Student created successfully
 */
router
  .route('/')
  .get(requireRoles(Roles.ADMIN, Roles.TEACHER), listStudents)
  .post((req, res, next) => {
    try {
      validateCreateStudentPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return requireRoles(Roles.ADMIN)(req, res, () => createStudent(req, res, next));
  });

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     tags: [Students]
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
 *         description: Student fetched successfully
 *   patch:
 *     summary: Update a student by ID
 *     tags: [Students]
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
 *         description: Student updated successfully
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [Students]
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
 *         description: Student deleted successfully
 */
router
  .route('/:id')
  .get(requireRoles(Roles.ADMIN, Roles.TEACHER), getStudent)
  .patch((req, res, next) => {
    try {
      validateUpdateStudentPayload(req.body);
    } catch (err) {
      return next(err);
    }
    return requireRoles(Roles.ADMIN)(req, res, () => updateStudent(req, res, next));
  })
  .delete((req, res, next) => requireRoles(Roles.ADMIN)(req, res, () => deleteStudent(req, res, next)));

module.exports = router;
