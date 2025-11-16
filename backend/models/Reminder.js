const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    medicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medication',
    },
    title: {
      type: String,
      required: true,
    },
    triggerTime: {
      type: Date,
      required: true,
    },
    recurrence: {
      type: String,
      enum: ['once', 'daily', 'weekly'],
      default: 'once',
    },
    status: {
      type: String,
      enum: ['pending', 'done', 'missed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reminder', reminderSchema);
