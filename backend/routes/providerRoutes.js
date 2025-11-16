const express = require('express');
const { getProviders, getProviderById } = require('../controllers/providerController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getProviders);
router.get('/:id', protect, getProviderById);

module.exports = router;
