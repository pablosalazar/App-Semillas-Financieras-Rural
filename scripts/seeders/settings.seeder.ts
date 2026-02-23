// Load environment variables first, before any other imports
import "../load-env.js";

import { db } from "../../src/lib/firebase";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { ASSESSMENT_QUESTIONS } from "../data/assessmentQuestions";

const SETTINGS_COLLECTION = "settings";
const ASSESSMENT_QUESTIONS_DOC_ID = "assessment_questions";

/**
 * Clears the assessment questions from settings
 * @returns Promise<boolean> True if document was deleted, false if it didn't exist
 */
export const clearAssessmentConfig = async (): Promise<boolean> => {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, ASSESSMENT_QUESTIONS_DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await deleteDoc(docRef);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error clearing assessment questions:", error);
    throw new Error("Failed to clear assessment questions. Please try again.");
  }
};

/**
 * Seeds the assessment questions to Firestore settings
 * @returns Promise<number> Number of questions seeded
 */
export const seedAssessmentConfig = async (): Promise<number> => {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, ASSESSMENT_QUESTIONS_DOC_ID);

    await setDoc(docRef, {
      questions: ASSESSMENT_QUESTIONS,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return ASSESSMENT_QUESTIONS.length;
  } catch (error) {
    console.error("Error seeding assessment questions:", error);
    throw new Error("Failed to seed assessment questions. Please try again.");
  }
};

/**
 * Resets the assessment questions by clearing and then seeding
 * @returns Promise<number> Number of questions seeded
 */
const resetAssessmentConfig = async (): Promise<number> => {
  const wasDeleted = await clearAssessmentConfig();
  if (wasDeleted) {
    console.log("✅ Cleared existing assessment questions.");
  } else {
    console.log("ℹ️  No existing assessment questions found.");
  }
  const count = await seedAssessmentConfig();
  return count;
};

// Export resetAssessmentConfig for potential direct use
export { resetAssessmentConfig };
