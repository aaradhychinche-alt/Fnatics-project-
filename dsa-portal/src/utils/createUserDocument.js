import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export const createUserDocument = async (user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    const { email, uid, displayName } = user;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        uid,
        email,
        name: displayName || email.split('@')[0], // Fallback to email prefix if no name
        createdAt,
        solvedCount: 0,
        streak: 0,
        leaderboardRank: 0, // Default rank
        strongTopics: [],
        weakTopics: [],
        dsaProgress: {
          arrays: 0,
          dp: 0,
          trees: 0,
          graphs: 0,
          recursion: 0,
          bitmasking: 0
        }
      });
      console.log("User document created successfully");
    } catch (error) {
      console.error("Error creating user document", error);
    }
  } else {
    // Optional: Update last login time or other metadata here if needed
    console.log("User document already exists");
  }
};
