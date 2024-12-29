const express = require('express');
const router = express.Router();
const News = require('../models/News');
const User = require('../models/User');
const { authenticateToken, isAdmin } = require('../middleware/auth');
const { validateNews } = require('../middleware/validate');

// Get all news
router.get('/', async (req, res) => {
  try {
    const news = await News.find()
      .populate('author', 'username')
      .sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create news (admin only)
router.post('/', [authenticateToken, isAdmin, validateNews], async (req, res) => {
  try {
    let user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      user = await User.create({
        firebaseUid: req.user.uid,
        email: req.user.email,
        username: req.user.email.split('@')[0]
      });
    }

    const news = new News({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      category: req.body.category,
      thumbnail: req.body.thumbnail,
      author: user._id
    });

    const savedNews = await news.save();
    const populatedNews = await News.findById(savedNews._id)
      .populate('author', 'username email');

    res.status(201).json(populatedNews);
  } catch (error) {
    console.error('News creation error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete news (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single news article
router.get('/:id', async (req, res) => {
  try {
    const article = await News.findById(req.params.id)
      .populate('author', 'username email');
    if (!article) {
      return res.status(404).json({ message: 'News article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching news article' });
  }
});

module.exports = router; 