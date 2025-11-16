const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      default: 5.0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Provider', providerSchema);
