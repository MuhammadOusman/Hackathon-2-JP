const Medication = require('../models/Medication');

// @desc    Get user's medications
// @route   GET /api/medications
// @access  Private
const getMedications = async (req, res) => {
  try {
    const medications = await Medication.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(medications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create medication
// @route   POST /api/medications
// @access  Private
const createMedication = async (req, res) => {
  try {
    const { name, dosage, frequency, notes } = req.body;

    if (!name || !dosage) {
      return res.status(400).json({ message: 'Please provide name and dosage' });
    }

    const medication = await Medication.create({
      userId: req.user._id,
      name,
      dosage,
      frequency,
      notes,
    });

    res.status(201).json(medication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update medication
// @route   PUT /api/medications/:id
// @access  Private
const updateMedication = async (req, res) => {
  try {
    const { name, dosage, frequency, notes } = req.body;
    const medication = await Medication.findById(req.params.id);

    if (medication && medication.userId.toString() === req.user._id.toString()) {
      medication.name = name || medication.name;
      medication.dosage = dosage || medication.dosage;
      medication.frequency = frequency || medication.frequency;
      medication.notes = notes || medication.notes;

      const updatedMedication = await medication.save();
      res.json(updatedMedication);
    } else {
      res.status(404).json({ message: 'Medication not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete medication
// @route   DELETE /api/medications/:id
// @access  Private
const deleteMedication = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);

    if (medication && medication.userId.toString() === req.user._id.toString()) {
      await medication.deleteOne();
      res.json({ message: 'Medication removed' });
    } else {
      res.status(404).json({ message: 'Medication not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMedications, createMedication, updateMedication, deleteMedication };
