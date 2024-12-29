require('dotenv').config();
const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

async function setAdminClaim(email) {
  try {
    // Get user by email
    const user = await admin.auth().getUserByEmail(email);
    
    // Set admin claim
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    });

    console.log(`Successfully set admin claim for user: ${email}`);
  } catch (error) {
    console.error('Error setting admin claim:', error);
  } finally {
    process.exit();
  }
}

// Add this to package.json scripts: "create-admin": "node scripts/createAdmin.js admin@techsphere.com"
const email = process.argv[2];
if (!email) {
  console.error('Please provide an email address');
  process.exit(1);
}

setAdminClaim(email); 