const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { authenticateToken } = require('../middleware/auth');

// Get current user
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await admin.auth().getUser(req.user.uid);
    res.json({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      admin: req.user.admin || false
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user' });
  }
});

// Register user
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email,
      password
    });
    res.status(201).json({ uid: userRecord.uid });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login is handled by Firebase client SDK

module.exports = router; 