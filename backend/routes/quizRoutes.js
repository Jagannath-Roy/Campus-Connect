const express = require('express');
const router = express.Router();
const { 
  createQuiz, 
  getQuizzes, 
  getQuizById, 
  attemptQuiz, 
  getStudentAttempts, 
  getAllAttemptsForTeacher 
} = require('../controllers/quizController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('Teacher'), createQuiz);
router.get('/', protect, getQuizzes);
router.get('/attempts/student', protect, authorize('Student'), getStudentAttempts);
router.get('/attempts/teacher', protect, authorize('Teacher'), getAllAttemptsForTeacher);
router.get('/:id', protect, getQuizById);
router.post('/:id/attempt', protect, authorize('Student'), attemptQuiz);

module.exports = router;
