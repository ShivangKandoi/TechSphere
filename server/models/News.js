const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/300x200?text=News+Article'
  },
  category: {
    type: String,
    required: true,
    enum: ['AI', 'Web Dev', 'Cybersecurity', 'Mobile', 'Cloud', 'Other']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add indexes
newsSchema.index({ author: 1, createdAt: -1 });
newsSchema.index({ category: 1 });
newsSchema.index({ views: -1 });

module.exports = mongoose.model('News', newsSchema); 