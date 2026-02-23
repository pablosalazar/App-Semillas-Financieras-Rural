import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import type { RegisterInput, User, UserInput } from "../types";

const USERS_COLLECTION = "users";

export class UserAlreadyExistsError extends Error {
  constructor() {
    super("Usuario ya se encuentra registrado");
    this.name = "UserAlreadyExistsError";
  }
}

export const createUser = async (userData: RegisterInput): Promise<User> => {
  try {
    const { acceptDataTreatment, acceptPrivacyPolicy, ...userFields } =
      userData;

    const existingUser = await getUserByDocumentNumber(
      userFields.documentNumber,
    );
    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const now = new Date();

    const docRef = await addDoc(collection(db, USERS_COLLECTION), {
      ...userFields,
      ...(acceptDataTreatment && { acceptDataTreatmentAt: serverTimestamp() }),
      ...(acceptPrivacyPolicy && { acceptPrivacyPolicyAt: serverTimestamp() }),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const createdUser: User = {
      ...userFields,
      id: docRef.id,
      acceptDataTreatmentAt: acceptDataTreatment ? now : undefined,
      acceptPrivacyPolicyAt: acceptPrivacyPolicy ? now : undefined,
      createdAt: now,
      updatedAt: now,
    };

    return createdUser;
  } catch (error) {
    // Re-throw intentional errors (e.g. UserAlreadyExistsError) as-is
    if (error instanceof Error) throw error;
    throw new Error("Failed to create user. Please try again.");
  }
};

export const getUserByDocumentNumber = async (
  documentNumber: string,
): Promise<User | null> => {
  try {
    const q = query(
      collection(db, USERS_COLLECTION),
      where("documentNumber", "==", documentNumber),
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return null;
    }

    const doc = querySnapshot.docs[0];
    const data = doc.data();

    // Convert Firestore timestamps to Date objects
    const user: User = {
      ...(data as UserInput),
      id: doc.id,
      birthdate: data.birthdate?.toDate() || new Date(),
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    };

    return user;
  } catch (error) {
    console.error("Error getting user:", error);
    throw new Error("Failed to get user. Please try again.");
  }
};

export const updateUser = async (userData: User): Promise<User> => {
  try {
    await updateDoc(doc(db, USERS_COLLECTION, userData.id), {
      ...userData,
      updatedAt: serverTimestamp(),
    });

    const now = new Date();
    const updatedUser: User = {
      ...userData,
      updatedAt: now,
    };

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user. Please try again.");
  }
};
