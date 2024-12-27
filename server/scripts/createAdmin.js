require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = require('../ver-1-7a8c3-firebase-adminsdk-cig5r-7ea17991ff.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: process.env.FIREBASE_PROJECT_ID
});

async function listAllUsers() {
  try {
    const listUsersResult = await admin.auth().listUsers();
    console.log('All Users:');
    listUsersResult.users.forEach((userRecord) => {
      console.log('User:', {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName
      });
    });
    process.exit(0);
  } catch (error) {
    console.error('Error listing users:', error);
    process.exit(1);
  }
}

listAllUsers(); 