const mongoose = require('mongoose');

const healthStatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    heartRate: {
      type: Number,
      default: 72,
    },
    bloodPressureSystolic: {
      type: Number,
      default: 120,
    },
    bloodPressureDiastolic: {
      type: Number,
      default: 80,
    },
    steps: {
      type: Number,
      default: 0,
    },
    sleepHours: {
      type: Number,
      default: 7.5,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('HealthStat', healthStatSchema);
