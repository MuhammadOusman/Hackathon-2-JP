const Appointment = require('../models/Appointment');

// @desc    Get user's appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id })
      .populate('providerId', 'name specialty avatar')
      .sort({ startTime: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
  try {
    const { providerId, startTime, reason } = req.body;

    if (!providerId || !startTime) {
      return res.status(400).json({ message: 'Please provide provider and start time' });
    }

    const appointment = await Appointment.create({
      userId: req.user._id,
      providerId,
      startTime,
      reason,
    });

    const populatedAppointment = await Appointment.findById(appointment._id).populate(
      'providerId',
      'name specialty avatar'
    );

    res.status(201).json(populatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate(
      'providerId',
      'name specialty avatar'
    );

    if (appointment && appointment.userId.toString() === req.user._id.toString()) {
      res.json(appointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res) => {
  try {
    const { startTime, reason, status } = req.body;
    const appointment = await Appointment.findById(req.params.id);

    if (appointment && appointment.userId.toString() === req.user._id.toString()) {
      appointment.startTime = startTime || appointment.startTime;
      appointment.reason = reason || appointment.reason;
      appointment.status = status || appointment.status;

      const updatedAppointment = await appointment.save();
      const populated = await Appointment.findById(updatedAppointment._id).populate(
        'providerId',
        'name specialty avatar'
      );
      res.json(populated);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (appointment && appointment.userId.toString() === req.user._id.toString()) {
      await appointment.deleteOne();
      res.json({ message: 'Appointment removed' });
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAppointments,
  createAppointment,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
