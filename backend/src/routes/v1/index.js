const express = require('express');

const authRoutes = require('../../modules/auth/auth.routes');
const userRoutes = require('../../modules/users/users.routes');
const studentRoutes = require('../../modules/students/students.routes');

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

module.exports = router;
