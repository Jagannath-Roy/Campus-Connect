const express = require('express');
const router = express.Router();
const { getTeacherDashboardStats, getStudentDashboardStats } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/teacher', protect, authorize('Teacher'), getTeacherDashboardStats);
router.get('/student', protect, authorize('Student'), getStudentDashboardStats);

module.exports = router;
