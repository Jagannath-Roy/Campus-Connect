const Note = require('../models/Note');

exports.uploadNote = async (req, res) => {
  try {
    const { title, subject, description } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a PDF file' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    const note = await Note.create({
      title,
      subject,
      description,
      fileUrl,
      teacher: req.user._id
    });

    res.status(201).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    // If student, they can see all. If teacher, maybe all or just theirs. Let's return all.
    // Allow filtering by subject
    const { subject } = req.query;
    let query = {};
    if (subject) query.subject = subject;

    const notes = await Note.find(query).populate('teacher', 'name').sort('-createdAt');
    res.json({ success: true, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
