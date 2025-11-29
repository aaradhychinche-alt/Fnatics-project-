import { db } from "../firebase-config";
import { doc, setDoc } from "firebase/firestore";

export const addDemoUsers = async () => {
  const demoUsers = [
    {
      id: "demo_uid_1",
      data: {
        "email": "student1@vedam.org",
        "uid": "demo_uid_1",
        "name": "Aaradhy Chinche",
        "batch": "A",
        "solvedCount": 42,
        "streak": 10,
        "leaderboardRank": 3,
        "weakTopics": ["Trees", "DP"],
        "strongTopics": ["Arrays", "Hashing"],
        "dsaProgress": {
          "arrays": 80,
          "dp": 40,
          "trees": 20,
          "graphs": 50,
          "recursion": 70,
          "bitmasking": 65
        }
      }
    },
    {
      id: "demo_uid_2",
      data: {
        "email": "student2@vedam.org",
        "uid": "demo_uid_2",
        "name": "Riya Sharma",
        "batch": "A",
        "solvedCount": 58,
        "streak": 19,
        "leaderboardRank": 1,
        "weakTopics": ["Bitmasking"],
        "strongTopics": ["DP", "Graphs"],
        "dsaProgress": {
          "arrays": 85,
          "dp": 90,
          "trees": 60,
          "graphs": 80,
          "recursion": 55,
          "bitmasking": 25
        }
      }
    },
    {
      id: "demo_uid_3",
      data: {
        "email": "student3@vedam.org",
        "uid": "demo_uid_3",
        "name": "Karthik Menon",
        "batch": "B",
        "solvedCount": 35,
        "streak": 6,
        "leaderboardRank": 7,
        "weakTopics": ["DP", "Graphs"],
        "strongTopics": ["Arrays"],
        "dsaProgress": {
          "arrays": 75,
          "dp": 20,
          "trees": 40,
          "graphs": 30,
          "recursion": 50,
          "bitmasking": 60
        }
      }
    },
    {
      id: "demo_uid_4",
      data: {
        "email": "student4@vedam.org",
        "uid": "demo_uid_4",
        "name": "Sneha Reddy",
        "batch": "B",
        "solvedCount": 47,
        "streak": 12,
        "leaderboardRank": 4,
        "weakTopics": ["Recursion"],
        "strongTopics": ["Trees", "Graphs"],
        "dsaProgress": {
          "arrays": 65,
          "dp": 70,
          "trees": 90,
          "graphs": 85,
          "recursion": 25,
          "bitmasking": 40
        }
      }
    },
    {
      id: "demo_uid_5",
      data: {
        "email": "student5@vedam.org",
        "uid": "demo_uid_5",
        "name": "Arjun Patel",
        "batch": "C",
        "solvedCount": 29,
        "streak": 3,
        "leaderboardRank": 9,
        "weakTopics": ["Trees", "DP"],
        "strongTopics": ["Bitmasking"],
        "dsaProgress": {
          "arrays": 55,
          "dp": 30,
          "trees": 20,
          "graphs": 45,
          "recursion": 50,
          "bitmasking": 75
        }
      }
    },
    {
      id: "demo_uid_6",
      data: {
        "email": "student6@vedam.org",
        "uid": "demo_uid_6",
        "name": "Meera Iyer",
        "batch": "A",
        "solvedCount": 52,
        "streak": 14,
        "leaderboardRank": 2,
        "weakTopics": ["Arrays"],
        "strongTopics": ["DP", "Recursion"],
        "dsaProgress": {
          "arrays": 35,
          "dp": 80,
          "trees": 70,
          "graphs": 65,
          "recursion": 90,
          "bitmasking": 60
        }
      }
    },
    {
      id: "demo_uid_7",
      data: {
        "email": "student7@vedam.org",
        "uid": "demo_uid_7",
        "name": "Varun Singh",
        "batch": "C",
        "solvedCount": 23,
        "streak": 1,
        "leaderboardRank": 10,
        "weakTopics": ["Trees", "Graphs"],
        "strongTopics": ["Arrays"],
        "dsaProgress": {
          "arrays": 50,
          "dp": 40,
          "trees": 10,
          "graphs": 15,
          "recursion": 45,
          "bitmasking": 55
        }
      }
    },
    {
      id: "demo_uid_8",
      data: {
        "email": "student8@vedam.org",
        "uid": "demo_uid_8",
        "name": "Priya Gupta",
        "batch": "B",
        "solvedCount": 40,
        "streak": 8,
        "leaderboardRank": 5,
        "weakTopics": ["Graphs"],
        "strongTopics": ["Arrays", "DP"],
        "dsaProgress": {
          "arrays": 85,
          "dp": 75,
          "trees": 65,
          "graphs": 25,
          "recursion": 55,
          "bitmasking": 45
        }
      }
    },
    {
      id: "demo_uid_9",
      data: {
        "email": "student9@vedam.org",
        "uid": "demo_uid_9",
        "name": "Aman Desai",
        "batch": "A",
        "solvedCount": 31,
        "streak": 5,
        "leaderboardRank": 8,
        "weakTopics": ["Bitmasking", "Trees"],
        "strongTopics": ["Graphs"],
        "dsaProgress": {
          "arrays": 40,
          "dp": 35,
          "trees": 20,
          "graphs": 70,
          "recursion": 60,
          "bitmasking": 15
        }
      }
    },
    {
      id: "demo_uid_10",
      data: {
        "email": "student10@vedam.org",
        "uid": "demo_uid_10",
        "name": "Zoya Khan",
        "batch": "C",
        "solvedCount": 55,
        "streak": 16,
        "leaderboardRank": 6,
        "weakTopics": ["DP"],
        "strongTopics": ["Trees", "Bitmasking"],
        "dsaProgress": {
          "arrays": 65,
          "dp": 45,
          "trees": 85,
          "graphs": 60,
          "recursion": 70,
          "bitmasking": 90
        }
      }
    }
  ];

  try {
    for (const user of demoUsers) {
      await setDoc(doc(db, "users", user.id), user.data);
      console.log(`Uploaded demo user: ${user.data.name} (${user.id})`);
    }
    console.log("All demo users uploaded successfully!");
  } catch (error) {
    console.error("Error uploading demo users:", error);
  }
};
