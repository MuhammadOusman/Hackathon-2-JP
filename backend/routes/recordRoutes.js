const express = require('express');
const {
  getRecords,
  uploadRecord,
  getRecordById,
  deleteRecord,
} = require('../controllers/recordController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const router = express.Router();

router.route('/').get(protect, getRecords);
router.post('/upload', protect, upload.single('file'), uploadRecord);
router.route('/:id').get(protect, getRecordById).delete(protect, deleteRecord);

module.exports = router;
