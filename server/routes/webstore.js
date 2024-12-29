const express = require('express');
const router = express.Router();
const Tool = require('../models/Tool');
const { authenticateToken } = require('../middleware/auth');

// Get all tools
router.get('/', async (req, res) => {
  try {
    const tools = await Tool.find()
      .populate('author', 'username email')
      .select('-__v')
      .sort({ createdAt: -1 });
    res.json(tools);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tools' });
  }
});

module.exports = router; 