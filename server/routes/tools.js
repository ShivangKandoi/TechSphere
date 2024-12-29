const express = require('express');
const router = express.Router();
const Tool = require('../models/Tool');
const User = require('../models/User');
const { authenticateToken, isAdmin } = require('../middleware/auth');

// Get all tools
router.get('/', async (req, res) => {
  try {
    const tools = await Tool.find().sort({ createdAt: -1 });
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create tool (admin only)
router.post('/', authenticateToken, isAdmin, async (req, res) => {
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

    const tool = new Tool({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      accessLink: req.body.accessLink,
      thumbnail: req.body.thumbnail || 'https://via.placeholder.com/300x200?text=Web+Tool',
      author: user._id
    });

    const savedTool = await tool.save();
    const populatedTool = await Tool.findById(savedTool._id)
      .populate('author', 'username email');

    res.status(201).json(populatedTool);
  } catch (error) {
    console.error('Tool creation error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete tool (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req, res) => {
  try {
    await Tool.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tool deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single tool
router.get('/:id', async (req, res) => {
  try {
    const tool = await Tool.findById(req.params.id)
      .populate('author', 'username email');
    if (!tool) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    res.json(tool);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tool' });
  }
});

module.exports = router; 