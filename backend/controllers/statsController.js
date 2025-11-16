const HealthStat = require('../models/HealthStat');

// @desc    Get user's health stats
// @route   GET /api/stats
// @access  Private
const getStats = async (req, res) => {
  try {
    let stats = await HealthStat.findOne({ userId: req.user._id });

    // Create default stats if not found
    if (!stats) {
      stats = await HealthStat.create({ userId: req.user._id });
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user's health stats
// @route   POST /api/stats
// @access  Private
const updateStats = async (req, res) => {
  try {
    const { heartRate, bloodPressureSystolic, bloodPressureDiastolic, steps, sleepHours } =
      req.body;

    let stats = await HealthStat.findOne({ userId: req.user._id });

    if (stats) {
      stats.heartRate = heartRate !== undefined ? heartRate : stats.heartRate;
      stats.bloodPressureSystolic =
        bloodPressureSystolic !== undefined ? bloodPressureSystolic : stats.bloodPressureSystolic;
      stats.bloodPressureDiastolic =
        bloodPressureDiastolic !== undefined
          ? bloodPressureDiastolic
          : stats.bloodPressureDiastolic;
      stats.steps = steps !== undefined ? steps : stats.steps;
      stats.sleepHours = sleepHours !== undefined ? sleepHours : stats.sleepHours;

      const updatedStats = await stats.save();
      res.json(updatedStats);
    } else {
      const newStats = await HealthStat.create({
        userId: req.user._id,
        heartRate,
        bloodPressureSystolic,
        bloodPressureDiastolic,
        steps,
        sleepHours,
      });
      res.status(201).json(newStats);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getStats, updateStats };
