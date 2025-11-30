/**
 * FILE: firebase-config.js
 * 
 * Purpose:
 * This file initializes the Firebase application and exports the core services.
 * It uses environment variables for secure configuration.
 * 
 * Exports:
 * - auth: Firebase Authentication service instance.
 * - db: Firestore Database service instance.
 * - timestamp: Helper for server-side timestamps.
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

// Firebase configuration object using environment variables
// These variables must be set in .env (local) and Vercel Project Settings (production)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app instance
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const timestamp = serverTimestamp;

console.log("Connected to Firebase project:", firebaseConfig.projectId);

// Export initialized services for use throughout the app
export { auth, db, timestamp };
