const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

/**
 * Triggered when a new user is created in Firebase Auth.
 * Enforces domain restriction and creates a user profile in Firestore.
 * 
 * Why backend restriction?
 * - Client-side checks can be bypassed.
 * - Ensures only authorized domains can access the platform.
 * - Centralized logic for user initialization.
 */
exports.onCreateAuthUser = functions.auth.user().onCreate(async (user) => {
  const email = user.email;
  const uid = user.uid;

  // Domain restriction
  const allowedDomains = ['@vedam.org', '@vedamschool.tech'];
  const isAllowed = allowedDomains.some(domain => email.endsWith(domain));

  if (!isAllowed) {
    console.warn(`Unauthorized email domain: ${email}. Deleting user ${uid}.`);
    try {
      await admin.auth().deleteUser(uid);
      console.log(`Successfully deleted unauthorized user ${uid}.`);
    } catch (error) {
      console.error(`Error deleting unauthorized user ${uid}:`, error);
    }
    return;
  }

  // Create Firestore user profile
  // This is where we can integrate future Gemini AI analytics by adding fields here
  // or triggering other functions based on this document creation.
  const userProfile = {
    email: email,
    fullName: "Placeholder Name", // To be updated by user later
    batch: "Placeholder Batch",   // To be updated by user later
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    lastLogin: admin.firestore.FieldValue.serverTimestamp(),
    // Future analytics fields can go here
  };

  try {
    await admin.firestore().collection('users').doc(uid).set(userProfile);
    console.log(`Created user profile for ${email} (${uid}).`);
  } catch (error) {
    console.error(`Error creating user profile for ${uid}:`, error);
  }
});
