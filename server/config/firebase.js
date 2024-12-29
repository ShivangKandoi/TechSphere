const admin = require('firebase-admin');

const initializeFirebaseAdmin = () => {
  try {
    if (!admin.apps.length) {  // Check if Firebase Admin is already initialized
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        }),
      });
      console.log('Firebase Admin initialized successfully');
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
    throw error; // Rethrow the error to handle it in the main application
  }
};

module.exports = { 
  initializeFirebaseAdmin,
  admin  // Export admin instance for use in other files
}; 