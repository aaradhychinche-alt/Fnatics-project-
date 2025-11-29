import { db, auth } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

const demoStudents = [
  {
    email: "student1@vedam.org",
    name: "Aaradhy Chinche",
    batch: "A",
    solvedCount: 42,
    streak: 10,
    leaderboardRank: 3,
    weakTopics: ["Trees", "DP"],
    strongTopics: ["Arrays", "Hashing"],
    dsaProgress: {
      arrays: 80,
      dp: 40,
      trees: 20,
      graphs: 50,
      recursion: 70,
      bitmasking: 65
    }
  },
  {
    email: "student2@vedam.org",
    name: "Riya Sharma",
    batch: "A",
    solvedCount: 58,
    streak: 19,
    leaderboardRank: 1,
    weakTopics: ["Bitmasking"],
    strongTopics: ["DP", "Graphs"],
    dsaProgress: {
      arrays: 85,
      dp: 90,
      trees: 60,
      graphs: 80,
      recursion: 55,
      bitmasking: 25
    }
  },
  {
    email: "student3@vedam.org",
    name: "Karthik Menon",
    batch: "B",
    solvedCount: 35,
    streak: 6,
    leaderboardRank: 7,
    weakTopics: ["DP", "Graphs"],
    strongTopics: ["Arrays"],
    dsaProgress: {
      arrays: 75,
      dp: 20,
      trees: 40,
      graphs: 30,
      recursion: 50,
      bitmasking: 60
    }
  },
  {
    email: "student4@vedam.org",
    name: "Sneha Reddy",
    batch: "B",
    solvedCount: 47,
    streak: 12,
    leaderboardRank: 4,
    weakTopics: ["Recursion"],
    strongTopics: ["Trees", "Graphs"],
    dsaProgress: {
      arrays: 65,
      dp: 70,
      trees: 90,
      graphs: 85,
      recursion: 25,
      bitmasking: 40
    }
  },
  {
    email: "student5@vedam.org",
    name: "Arjun Patel",
    batch: "C",
    solvedCount: 29,
    streak: 3,
    leaderboardRank: 9,
    weakTopics: ["Trees", "DP"],
    strongTopics: ["Bitmasking"],
    dsaProgress: {
      arrays: 55,
      dp: 30,
      trees: 20,
      graphs: 45,
      recursion: 50,
      bitmasking: 75
    }
  },
  {
    email: "student6@vedam.org",
    name: "Meera Iyer",
    batch: "A",
    solvedCount: 52,
    streak: 14,
    leaderboardRank: 2,
    weakTopics: ["Arrays"],
    strongTopics: ["DP", "Recursion"],
    dsaProgress: {
      arrays: 35,
      dp: 80,
      trees: 70,
      graphs: 65,
      recursion: 90,
      bitmasking: 60
    }
  },
  {
    email: "student7@vedam.org",
    name: "Varun Singh",
    batch: "C",
    solvedCount: 23,
    streak: 1,
    leaderboardRank: 10,
    weakTopics: ["Trees", "Graphs"],
    strongTopics: ["Arrays"],
    dsaProgress: {
      arrays: 50,
      dp: 40,
      trees: 10,
      graphs: 15,
      recursion: 45,
      bitmasking: 55
    }
  },
  {
    email: "student8@vedam.org",
    name: "Priya Gupta",
    batch: "B",
    solvedCount: 40,
    streak: 8,
    leaderboardRank: 5,
    weakTopics: ["Graphs"],
    strongTopics: ["Arrays", "DP"],
    dsaProgress: {
      arrays: 85,
      dp: 75,
      trees: 65,
      graphs: 25,
      recursion: 55,
      bitmasking: 45
    }
  },
  {
    email: "student9@vedam.org",
    name: "Aman Desai",
    batch: "A",
    solvedCount: 31,
    streak: 5,
    leaderboardRank: 8,
    weakTopics: ["Bitmasking", "Trees"],
    strongTopics: ["Graphs"],
    dsaProgress: {
      arrays: 40,
      dp: 35,
      trees: 20,
      graphs: 70,
      recursion: 60,
      bitmasking: 15
    }
  },
  {
    email: "student10@vedam.org",
    name: "Zoya Khan",
    batch: "C",
    solvedCount: 55,
    streak: 16,
    leaderboardRank: 6,
    weakTopics: ["DP"],
    strongTopics: ["Trees", "Bitmasking"],
    dsaProgress: {
      arrays: 65,
      dp: 45,
      trees: 85,
      graphs: 60,
      recursion: 70,
      bitmasking: 90
    }
  }
];

export const createAuthUsers = async () => {
  console.log("Starting creation of 10 REAL demo users...");

  for (const student of demoStudents) {
    try {
      // 1. Create Auth User
      // This will automatically sign in the created user
      const userCredential = await createUserWithEmailAndPassword(auth, student.email, "123456");
      const user = userCredential.user;
      const uid = user.uid;

      console.log(`Created Auth User: ${student.email} (UID: ${uid})`);

      // 2. Create Firestore Document
      const userData = {
        uid: uid,
        email: student.email,
        name: student.name,
        batch: student.batch,
        solvedCount: student.solvedCount,
        streak: student.streak,
        leaderboardRank: student.leaderboardRank,
        weakTopics: student.weakTopics,
        strongTopics: student.strongTopics,
        dsaProgress: student.dsaProgress,
        createdAt: new Date()
      };

      await setDoc(doc(db, "users", uid), userData);
      console.log(`Created Firestore Doc for: ${student.name}`);

      // Optional: Wait a bit to prevent rate limiting or race conditions
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error(`Failed to create ${student.email}:`, error.message);
    }
  }

  console.log("Finished creating all demo users.");
  
  // Sign out the last created user so the app is ready for a fresh login
  try {
    await signOut(auth);
    console.log("Signed out last created user.");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
