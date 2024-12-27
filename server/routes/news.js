const express = require('express');
const router = express.Router();
const News = require('../models/News');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

// Get all news
router.get('/', async (req, res) => {
  try {
    const news = await News.find().populate('author', 'username').sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create news (admin only)
router.post('/', isAdmin, async (req, res) => {
  try {
    // First, get or create the user document
    let user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      user = await User.create({
        firebaseUid: req.user.uid,
        email: req.user.email,
        username: req.user.email.split('@')[0]
      });
    }

    const news = new News({
      ...req.body,
      author: user._id
    });

    const savedNews = await news.save();
    const populatedNews = await News.findById(savedNews._id)
      .populate('author', 'username');
    
    res.status(201).json(populatedNews);
  } catch (error) {
    console.error('News creation error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete news (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 