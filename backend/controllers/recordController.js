const MedicalRecord = require('../models/MedicalRecord');
const cloudinary = require('../config/cloudinary');

// @desc    Get user's medical records
// @route   GET /api/records
// @access  Private
const getRecords = async (req, res) => {
  try {
    const records = await MedicalRecord.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Upload medical record
// @route   POST /api/records/upload
// @access  Private
const uploadRecord = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder: 'medicare_records' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(req.file.buffer);
    });

    const record = await MedicalRecord.create({
      userId: req.user._id,
      fileName: req.file.originalname,
      fileUrl: result.secure_url,
      fileType: req.file.mimetype,
      cloudinaryId: result.public_id,
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get record by ID
// @route   GET /api/records/:id
// @access  Private
const getRecordById = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);

    if (record && record.userId.toString() === req.user._id.toString()) {
      res.json(record);
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete record
// @route   DELETE /api/records/:id
// @access  Private
const deleteRecord = async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.id);

    if (record && record.userId.toString() === req.user._id.toString()) {
      // Delete from Cloudinary
      await cloudinary.uploader.destroy(record.cloudinaryId);
      await record.deleteOne();
      res.json({ message: 'Record removed' });
    } else {
      res.status(404).json({ message: 'Record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRecords, uploadRecord, getRecordById, deleteRecord };
