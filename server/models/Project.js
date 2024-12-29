const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/300x200?text=Project+Thumbnail'
  },
  detailedDescription: {
    type: String,
    default: ''
  },
  demoLink: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  githubLink: {
    type: String,
    required: false
  },
  techStack: {
    type: [String],
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes for frequently queried fields
projectSchema.index({ author: 1, createdAt: -1 });
projectSchema.index({ userId: 1 });
projectSchema.index({ techStack: 1 });

module.exports = mongoose.model('Project', projectSchema); 