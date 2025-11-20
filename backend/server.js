require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const providerRoutes = require('./routes/providerRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const medicationRoutes = require('./routes/medicationRoutes');
const reminderRoutes = require('./routes/reminderRoutes');
const recordRoutes = require('./routes/recordRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (no DB connection needed)
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Medicare API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Debug endpoint (no DB connection needed)
app.get('/debug', (req, res) => {
  res.json({
    mongoUri: process.env.MONGO_URI ? 'Set' : 'Not Set',
    jwtSecret: process.env.JWT_SECRET ? 'Set' : 'Not Set',
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME ? 'Set' : 'Not Set',
      apiKey: process.env.CLOUDINARY_API_KEY ? 'Set' : 'Not Set',
      apiSecret: process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not Set'
    },
    nodeEnv: process.env.NODE_ENV
  });
});

// Global DB connection check for all API routes
app.use('/api/*', async (req, res, next) => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState < 1) {
      await connectDB();
    }
    next();
  } catch (error) {
    console.error('DB Connection failed:', error);
    return res.status(500).json({ message: 'Database connection failed' });
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medications', medicationRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/stats', statsRoutes);

// Error Handler
app.use(errorHandler);

// For Vercel serverless deployment
module.exports = app;

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  connectDB().then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
      console.log(`🚀 Accessible at http://192.168.100.30:${PORT} on your network`);
    });
  });
}
