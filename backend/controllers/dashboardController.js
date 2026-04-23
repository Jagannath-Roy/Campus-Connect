const User = require('../models/User');
const Note = require('../models/Note');
const Quiz = require('../models/Quiz');
const Announcement = require('../models/Announcement');
const QuizAttempt = require('../models/QuizAttempt');

exports.getTeacherDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'Student' });
    const totalNotes = await Note.countDocuments({ teacher: req.user._id });
    const totalQuizzes = await Quiz.countDocuments({ teacher: req.user._id });
    const totalAnnouncements = await Announcement.countDocuments({ teacher: req.user._id });

    res.json({
      success: true,
      data: {
        totalStudents,
        totalNotes,
        totalQuizzes,
        totalAnnouncements
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentDashboardStats = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ student: req.user._id });
    const quizzesAttempted = attempts.length;
    
    const totalScore = attempts.reduce((acc, curr) => acc + (curr.score / curr.totalMarks) * 100, 0);
    const averageScore = quizzesAttempted > 0 ? (totalScore / quizzesAttempted).toFixed(2) : 0;

    const attemptedQuizIds = attempts.map(a => a.quiz.toString());
    const totalAvailableQuizzes = await Quiz.countDocuments();
    // Assuming available quizzes are all quizzes. 
    // Pending quizzes = total quizzes - attempted quizzes
    const pendingQuizzes = totalAvailableQuizzes - quizzesAttempted;

    const availableNotes = await Note.countDocuments();

    res.json({
      success: true,
      data: {
        quizzesAttempted,
        averageScore,
        pendingQuizzes,
        availableNotes
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
