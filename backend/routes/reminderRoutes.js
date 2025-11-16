const express = require('express');
const {
  getReminders,
  createReminder,
  updateReminder,
  markReminderDone,
  deleteReminder,
} = require('../controllers/reminderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getReminders).post(protect, createReminder);
router.route('/:id').put(protect, updateReminder).delete(protect, deleteReminder);
router.patch('/:id/done', protect, markReminderDone);

module.exports = router;
