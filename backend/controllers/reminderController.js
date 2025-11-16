const Reminder = require('../models/Reminder');

// @desc    Get user's reminders
// @route   GET /api/reminders
// @access  Private
const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ userId: req.user._id })
      .populate('medicationId', 'name dosage')
      .sort({ triggerTime: 1 });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create reminder
// @route   POST /api/reminders
// @access  Private
const createReminder = async (req, res) => {
  try {
    const { medicationId, title, triggerTime, recurrence } = req.body;

    if (!title || !triggerTime) {
      return res.status(400).json({ message: 'Please provide title and trigger time' });
    }

    const reminder = await Reminder.create({
      userId: req.user._id,
      medicationId,
      title,
      triggerTime,
      recurrence,
    });

    const populated = await Reminder.findById(reminder._id).populate('medicationId', 'name dosage');
    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update reminder
// @route   PUT /api/reminders/:id
// @access  Private
const updateReminder = async (req, res) => {
  try {
    const { title, triggerTime, recurrence, status } = req.body;
    const reminder = await Reminder.findById(req.params.id);

    if (reminder && reminder.userId.toString() === req.user._id.toString()) {
      reminder.title = title || reminder.title;
      reminder.triggerTime = triggerTime || reminder.triggerTime;
      reminder.recurrence = recurrence || reminder.recurrence;
      reminder.status = status || reminder.status;

      const updatedReminder = await reminder.save();
      const populated = await Reminder.findById(updatedReminder._id).populate(
        'medicationId',
        'name dosage'
      );
      res.json(populated);
    } else {
      res.status(404).json({ message: 'Reminder not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark reminder as done
// @route   PATCH /api/reminders/:id/done
// @access  Private
const markReminderDone = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (reminder && reminder.userId.toString() === req.user._id.toString()) {
      reminder.status = 'done';
      const updatedReminder = await reminder.save();
      const populated = await Reminder.findById(updatedReminder._id).populate(
        'medicationId',
        'name dosage'
      );
      res.json(populated);
    } else {
      res.status(404).json({ message: 'Reminder not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete reminder
// @route   DELETE /api/reminders/:id
// @access  Private
const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);

    if (reminder && reminder.userId.toString() === req.user._id.toString()) {
      await reminder.deleteOne();
      res.json({ message: 'Reminder removed' });
    } else {
      res.status(404).json({ message: 'Reminder not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReminders,
  createReminder,
  updateReminder,
  markReminderDone,
  deleteReminder,
};
