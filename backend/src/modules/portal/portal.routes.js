const express = require('express');

const {
  getStudentDashboard,
  getFacultyDashboard,
  getAdminDashboard,
} = require('./portal.controller');
const { authMiddleware, requireRoles } = require('../../middlewares/auth.middleware');
const { Roles } = require('../../constants/roles');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Portal
 *   description: Dashboards for different roles
 */

router.use(authMiddleware);

/**
 * @swagger
 * /portal/student/dashboard:
 *   get:
 *     summary: Student dashboard
 *     tags: [Portal]
 *     security:
 *       - bearerAuth: []
 */
router.get('/student/dashboard', requireRoles(Roles.STUDENT), getStudentDashboard);
/**
 * @swagger
 * /portal/faculty/dashboard:
 *   get:
 *     summary: Faculty dashboard
 *     tags: [Portal]
 *     security:
 *       - bearerAuth: []
 */
router.get('/faculty/dashboard', requireRoles(Roles.TEACHER), getFacultyDashboard);
/**
 * @swagger
 * /portal/admin/dashboard:
 *   get:
 *     summary: Admin dashboard
 *     tags: [Portal]
 *     security:
 *       - bearerAuth: []
 */
router.get('/admin/dashboard', requireRoles(Roles.ADMIN), getAdminDashboard);

module.exports = router;
