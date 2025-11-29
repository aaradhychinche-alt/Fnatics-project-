import { db } from "../firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const copyStudentsToUsers = async () => {
  const studentIds = [
    "student1", "student2", "student3", "student4", "student5",
    "student6", "student7", "student8", "student9", "student10"
  ];

  try {
    for (const id of studentIds) {
      const studentRef = doc(db, "students", id);
      const studentSnap = await getDoc(studentRef);

      if (studentSnap.exists()) {
        const studentData = studentSnap.data();
        // Copy to users collection
        await setDoc(doc(db, "users", id), studentData);
        console.log(`Copied ${id} to users collection.`);
      } else {
        console.warn(`Student ${id} not found.`);
      }
    }
    console.log("All students copied to users collection successfully.");
  } catch (error) {
    console.error("Error copying students to users:", error);
  }
};
