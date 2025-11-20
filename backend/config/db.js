const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      bufferCommands: false, // Disable mongoose buffering
    });

    // DB connected successfully
  } catch (error) {
    throw error; // Re-throw to handle in calling function
  }
};

module.exports = connectDB;
