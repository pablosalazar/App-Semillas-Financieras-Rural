// Load environment variables first, before any other imports
import "../load-env.js";

import { db } from "../../src/lib/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { sampleUsers } from "../data/sampleUsers";
import type { User } from "../../src/features/users/types";

const USERS_COLLECTION = "users";

/**
 * Clears the users collection by deleting all existing users
 * @returns Promise<number> The number of users deleted
 */
export const clearUsers = async (): Promise<number> => {
  try {
    const querySnapshot = await getDocs(collection(db, USERS_COLLECTION));
    const deletePromises = querySnapshot.docs.map((document) =>
      deleteDoc(doc(db, USERS_COLLECTION, document.id)),
    );

    await Promise.all(deletePromises);

    return querySnapshot.size;
  } catch (error) {
    console.error("Error clearing users:", error);
    throw new Error("Failed to clear users. Please try again.");
  }
};

/**
 * Seeds the users collection with sample data
 * @returns Promise<User[]> Array of created users
 */
export const seedUsers = async (): Promise<User[]> => {
  try {
    const createdUsers: User[] = [];

    for (const userData of sampleUsers) {
      const docRef = await addDoc(collection(db, USERS_COLLECTION), {
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      const now = new Date();
      const createdUser: User = {
        ...userData,
        id: docRef.id,
        acceptDataTreatmentAt: undefined,
        acceptPrivacyPolicyAt: undefined,
        createdAt: now,
        updatedAt: now,
      };

      createdUsers.push(createdUser);
    }

    return createdUsers;
  } catch (error) {
    console.error("Error seeding users:", error);
    throw new Error("Failed to seed users. Please try again.");
  }
};

/**
 * Resets the users collection by clearing and then seeding with sample data
 * @returns Promise<User[]> Array of created users
 */
const resetUsers = async (): Promise<User[]> => {
  const deletedCount = await clearUsers();
  console.log(`✅ Cleared ${deletedCount} user(s) from the database.`);
  const createdUsers = await seedUsers();
  return createdUsers;
};

// Export resetUsers for potential direct use
export { resetUsers };
