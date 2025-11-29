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

// Sign up a new user
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Log in an existing user
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Log out the current user
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

// Listen for authentication state changes
export const listenAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// Get user profile from Firestore
// Note: Profile creation is handled by Cloud Functions to ensure security and consistency
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

// Update user profile in Firestore
export const updateUserProfile = async (uid, data) => {
  try {
    const docRef = doc(db, 'users', uid);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

// Update user stats when a question is marked as done
export const updateUserStats = async (uid, { questionTitle, questionTopic }) => {
  try {
    const userRef = doc(db, "users", uid);
    
    await updateDoc(userRef, {
      solvedCount: increment(1),
      streak: increment(1),
      leetSolved: increment(1),
      lastSolvedAt: serverTimestamp(),
      solvedHistory: arrayUnion({
        title: questionTitle,
        topic: questionTopic,
        solvedAt: new Date() // Using client date for array element to avoid serverTimestamp issues in arrays
      })
    });
    console.log("User stats updated successfully");
  } catch (error) {
    console.error("Error updating user stats:", error);
    throw error;
  }
};
