const express = require('express');
const router = express.Router();
const Tool = require('../models/Tool');
const User = require('../models/User');
const authenticateToken = require('../middleware/auth');
const isAdmin = require('../middleware/isAdmin');

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

    const tool = new Tool({
      ...req.body,
      author: user._id
    });

    const savedTool = await tool.save();
    res.status(201).json(savedTool);
  } catch (error) {
    console.error('Tool creation error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete tool (admin only)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    await Tool.findByIdAndDelete(req.params.id);
    res.json({ message: 'Tool deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 