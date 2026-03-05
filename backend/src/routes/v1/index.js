const express = require('express');

const authRoutes = require('../../modules/auth/auth.routes');
const userRoutes = require('../../modules/users/users.routes');
const studentRoutes = require('../../modules/students/students.routes');
const facultyRoutes = require('../../modules/faculty/faculty.routes');
const academicsRoutes = require('../../modules/academics/academics.routes');
const admissionsRoutes = require('../../modules/admissions/admissions.routes');
const eventsRoutes = require('../../modules/events/events.routes');
const noticesRoutes = require('../../modules/notice-board/notice-board.routes');
const galleryRoutes = require('../../modules/gallery/gallery.routes');
const paymentsRoutes = require('../../modules/payments/payments.routes');
const communicationRoutes = require('../../modules/communication/communication.routes');
const portalRoutes = require('../../modules/portal/portal.routes');

const router = express.Router();

// Health check
router.get('/health', (req, res) =>
  res.json({
    success: true,
    message: 'API v1 is up',
  }),
);

// Module routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/students', studentRoutes);
router.use('/faculty', facultyRoutes);
router.use('/academics', academicsRoutes);
router.use('/admissions', admissionsRoutes);
router.use('/events', eventsRoutes);
router.use('/notices', noticesRoutes);
router.use('/gallery', galleryRoutes);
router.use('/payments', paymentsRoutes);
router.use('/communication', communicationRoutes);
router.use('/portal', portalRoutes);

module.exports = router;
