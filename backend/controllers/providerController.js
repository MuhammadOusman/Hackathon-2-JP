const Provider = require('../models/Provider');

// @desc    Get all providers
// @route   GET /api/providers
// @access  Private
const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find().sort({ name: 1 });
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get provider by ID
// @route   GET /api/providers/:id
// @access  Private
const getProviderById = async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (provider) {
      res.json(provider);
    } else {
      res.status(404).json({ message: 'Provider not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProviders, getProviderById };
