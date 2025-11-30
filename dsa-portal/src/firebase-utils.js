/**
 * FILE: firebase-utils.js
 * 
 * Purpose:
 * This file contains utility functions for interacting with Firebase services (Auth and Firestore).
 * It abstracts the Firebase SDK calls into reusable functions for the application.
 * 
 * Key Functions:
 * - signUp: Creates a new user account.
 * - login: Signs in an existing user.
 * - logout: Signs out the current user.
 * - listenAuthState: Subscribes to authentication state changes.
 * - getUserProfile: Fetches user data from Firestore.
 * - updateUserProfile: Updates user data in Firestore.
 * - updateUserStats: Atomically updates user statistics (solved count, streak, history).
 */

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  increment,
  arrayUnion,
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db } from './firebase-config';

/**
 * Signs up a new user with email and password.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<User>} - The created Firebase User object.
 */
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

/**
 * Logs in an existing user.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<User>} - The signed-in Firebase User object.
 */
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

/**
 * Logs out the current user.
 */
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

/**
 * Subscribes to authentication state changes.
 * @param {function} callback - Function to call when auth state changes.
 * @returns {function} - Unsubscribe function.
 */
export const listenAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * Fetches the user profile document from Firestore.
 * @param {string} uid - The user's unique ID.
 * @returns {Promise<Object|null>} - The user data object or null if not found.
 */
export const getUserProfile = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

/**
 * Updates the user profile document in Firestore.
 * @param {string} uid - The user's unique ID.
 * @param {Object} data - The data to update.
 */
export const updateUserProfile = async (uid, data) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

/**
 * Atomically updates user statistics when a question is solved.
 * 
 * Updates performed:
 * 1. Increments 'solvedCount'.
 * 2. Increments 'streak'.
 * 3. Increments 'leetSolved'.
 * 4. Updates 'lastSolvedAt' to server timestamp.
 * 5. Appends the question to 'solvedHistory'.
 * 6. Updates 'performanceHistory' for the current day (Task 4).
 * 7. Updates 'lastActive' date.
 * 
 * @param {string} uid - The user's unique ID.
 * @param {Object} questionData - { questionTitle, questionTopic }
 */
export const updateUserStats = async (uid, { questionTitle, questionTopic }) => {
  try {
    const userRef = doc(db, "users", uid);
    
    // Get today's date key (YYYY-MM-DD) for performance history
    const today = new Date().toISOString().split('T')[0];
    
    // Note: We cannot use dynamic keys directly in updateDoc with dot notation for nested fields easily 
    // if the key is a variable without using computed property names in the object passed to updateDoc.
    // Firestore supports "performanceHistory.2025-11-30": increment(5)
    
    const performanceUpdateKey = `performanceHistory.${today}`;

    await updateDoc(userRef, {
      solvedCount: increment(1),
      streak: increment(1),
      leetSolved: increment(1),
      lastSolvedAt: serverTimestamp(),
      lastActive: new Date().toISOString(), // Track last active time
      solvedHistory: arrayUnion({
        title: questionTitle,
        topic: questionTopic,
        solvedAt: new Date() // Using client date for array element to avoid serverTimestamp issues in arrays
      }),
      [performanceUpdateKey]: increment(5) // Task 4: Add 5 points to today's score
    });
    console.log("User stats updated successfully");
  } catch (error) {
    console.error("Error updating user stats:", error);
    throw error;
  }
};
