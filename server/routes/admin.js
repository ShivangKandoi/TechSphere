const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Project = require('../models/Project');
const Tool = require('../models/Tool');
const News = require('../models/News');
const { isAdmin } = require('../middleware/auth');

// Get all users
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get dashboard stats
router.get('/stats', isAdmin, async (req, res) => {
  try {
    const [totalUsers, totalProjects, totalTools, totalNews] = await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      Tool.countDocuments(),
      News.countDocuments()
    ]);

    res.json({
      totalUsers,
      totalProjects,
      totalTools,
      totalNews
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Make user admin
router.put('/users/:userId/make-admin', isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isAdmin: true },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove admin privileges
router.put('/users/:userId/remove-admin', isAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isAdmin: false },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user
router.delete('/users/:userId', isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 