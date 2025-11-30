/**
 * SEED SCRIPT: addPerformanceHistory.js
 * 
 * Purpose:
 * This script populates all existing user documents in Firestore with a 'performanceHistory' field.
 * It generates a 7-day history of scores for each user to visualize progress on the dashboard.
 * 
 * Logic:
 * 1. Fetches all documents from the 'users' collection.
 * 2. Iterates through each user.
 * 3. Generates a random score for each of the last 7 days.
 * 4. Updates the user document with this new 'performanceHistory' object.
 */

import { db } from "../firebase-config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export const addPerformanceHistory = async () => {
  console.log("Starting performance history seeding...");

  try {
    // Reference to the users collection
    const usersRef = collection(db, "users");
    // Fetch all user snapshots
    const snapshot = await getDocs(usersRef);

    if (snapshot.empty) {
      console.log("No users found to seed.");
      return;
    }

    // Define the dates for the last 7 days
    // We'll use fixed dates as requested or dynamic last 7 days?
    // The prompt gave specific dates: "2025-11-21" to "2025-11-27".
    // I will use those specific dates to match the request EXACTLY.
    const dates = [
      "2025-11-21",
      "2025-11-22",
      "2025-11-23",
      "2025-11-24",
      "2025-11-25",
      "2025-11-26",
      "2025-11-27"
    ];

    // Iterate over each user document
    const updatePromises = snapshot.docs.map(async (userDoc) => {
      const userData = userDoc.data();
      
      // Generate random scores based on the requested ranges
      // Ranges:
      // 21: 50-90
      // 22: 40-96
      // 23: 55-93
      // 24: 47-90
      // 25: 52-92
      // 26: 40-95
      // 27: 45-88
      
      const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

      const performanceHistory = {
        "2025-11-21": getRandom(50, 90),
        "2025-11-22": getRandom(40, 96),
        "2025-11-23": getRandom(55, 93),
        "2025-11-24": getRandom(47, 90),
        "2025-11-25": getRandom(52, 92),
        "2025-11-26": getRandom(40, 95),
        "2025-11-27": getRandom(45, 88)
      };

      // Update the document in Firestore
      const userDocRef = doc(db, "users", userDoc.id);
      await updateDoc(userDocRef, {
        performanceHistory: performanceHistory
      });

      console.log(`Updated performance history for user: ${userData.name || userDoc.id}`);
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);
    console.log("Performance history added successfully");

  } catch (error) {
    console.error("Error seeding performance history:", error);
  }
};
