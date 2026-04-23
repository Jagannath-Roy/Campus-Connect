const express = require('express');
const router = express.Router();
const { uploadNote, getNotes } = require('../controllers/noteController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, authorize('Teacher'), upload.single('file'), uploadNote);
router.get('/', protect, getNotes);

module.exports = router;
