import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBgGeA4GMQFi-1vTReMGnO6-lK6AKWZTVQ",
  authDomain: "vedam-dsa-portal.firebaseapp.com",
  projectId: "vedam-dsa-portal",
  storageBucket: "vedam-dsa-portal.firebasestorage.app",
  messagingSenderId: "117185109178",
  appId: "1:117185109178:web:aaa12448b14d170df1f683",
  measurementId: "G-W97VBJKKJP"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const timestamp = serverTimestamp;

console.log("Connected to Firebase project:", firebaseConfig.projectId);

// Export initialized services
export { auth, db, timestamp };
