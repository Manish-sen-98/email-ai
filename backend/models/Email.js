const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: true
  },
  generatedEmail: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Email', EmailSchema);