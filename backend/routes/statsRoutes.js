const express = require('express');
const { getStats, updateStats } = require('../controllers/statsController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getStats).post(protect, updateStats);

module.exports = router;
