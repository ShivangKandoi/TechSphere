const mongoose = require('mongoose');

// Check if the model already exists before defining it
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  displayName: String,
  college: String,
  linkedinUrl: String,
  githubUrl: String,
  bio: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}));

module.exports = User; 