const admin = require('firebase-admin');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    
    // Cache user data in request
    const user = await User.findOne({ firebaseUid: decodedToken.uid })
      .select('isAdmin username email');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = {
      ...decodedToken,
      isAdmin: decodedToken.admin === true || user.isAdmin === true,
      username: user.username,
      email: user.email,
      _id: user._id
    };
    
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized - Admin access required' });
    }

    next();
  } catch (error) {
    console.error('Admin check error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { authenticateToken, isAdmin }; 