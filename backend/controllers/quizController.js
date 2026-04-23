const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');

exports.createQuiz = async (req, res) => {
  try {
    const { title, subject, deadline, questions } = req.body;
    
    const totalMarks = questions.length; // Assuming 1 mark per question for simplicity

    const quiz = await Quiz.create({
      title,
      subject,
      deadline,
      questions,
      totalMarks,
      teacher: req.user._id
    });

    res.status(201).json({ success: true, data: quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('teacher', 'name').select('-questions.correctAnswer').sort('-createdAt');
    res.json({ success: true, data: quizzes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }
    // Remove correct answers if student is requesting, unless it's for attempt
    // Actually we will evaluate on backend
    res.json({ success: true, data: quiz });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.attemptQuiz = async (req, res) => {
  try {
    const { answers } = req.body; // array of { questionId, selectedOption }
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({ success: false, message: 'Quiz not found' });
    }

    let score = 0;
    
    answers.forEach(ans => {
      const q = quiz.questions.id(ans.questionId);
      if (q && q.correctAnswer === ans.selectedOption) {
        score += 1;
      }
    });

    const attempt = await QuizAttempt.create({
      student: req.user._id,
      quiz: quiz._id,
      score,
      totalMarks: quiz.totalMarks
    });

    res.status(201).json({ success: true, data: attempt });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getStudentAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ student: req.user._id })
      .populate('quiz', 'title subject')
      .sort('-createdAt');
    res.json({ success: true, data: attempts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllAttemptsForTeacher = async (req, res) => {
  try {
    // A teacher can view attempts for quizzes they created
    const quizzes = await Quiz.find({ teacher: req.user._id }).select('_id');
    const quizIds = quizzes.map(q => q._id);

    const attempts = await QuizAttempt.find({ quiz: { $in: quizIds } })
      .populate('student', 'name email')
      .populate('quiz', 'title')
      .sort('-createdAt');

    res.json({ success: true, data: attempts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
