const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const { authenticateToken } = require('../middleware/auth');
const User = require('../models/User');

// Get current user
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Register user
router.post('/register', async (req, res) => {
  try {
    const { email, username, token, photoURL, displayName } = req.body;
    
    // Verify the token
    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Check if user exists in our database
    let user = await User.findOne({ firebaseUid: decodedToken.uid });
    
    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        firebaseUid: decodedToken.uid,
        email,
        username: username || email.split('@')[0],
        profilePicture: photoURL || '',
        displayName: displayName || username || email.split('@')[0]
      });
      await user.save();
    }

    res.status(201).json({ user });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ message: error.message });
  }
});

// Login is handled by Firebase client SDK

// Update user profile
router.put('/user', authenticateToken, async (req, res) => {
  try {
    console.log('Received update request:', req.body); // Debug log
    console.log('User ID from token:', req.user.uid); // Debug log

    const user = await User.findOne({ firebaseUid: req.user.uid });
    if (!user) {
      console.log('User not found:', req.user.uid); // Debug log
      return res.status(404).json({ message: 'User not found' });
    }

    const updates = {
      displayName: req.body.displayName,
      college: req.body.college,
      linkedinUrl: req.body.linkedinUrl,
      githubUrl: req.body.githubUrl,
      bio: req.body.bio,
      updatedAt: Date.now()
    };

    console.log('Updating user with:', updates); // Debug log

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: updates },
      { new: true }
    );

    console.log('Updated user:', updatedUser); // Debug log
    res.json(updatedUser);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ 
      message: 'Error updating profile',
      error: error.message 
    });
  }
});

module.exports = router; 