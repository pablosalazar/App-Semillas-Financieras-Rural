import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import type { UserAssessments, AssessmentType } from "../types";

const ASSESSMENTS_COLLECTION = "assessments";

/**
 * Get user's assessment data (pre and post assessments)
 */
export const getUserAssessments = async (
  userId: string
): Promise<UserAssessments | null> => {
  try {
    const docRef = doc(db, ASSESSMENTS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    return {
      userId,
      preAssessment: data.preAssessment
        ? {
            answers: data.preAssessment.answers,
            score: data.preAssessment.score || 0,
            correctAnswers: data.preAssessment.correctAnswers || 0,
            totalQuestions: data.preAssessment.totalQuestions || 0,
            completedAt: data.preAssessment.completedAt?.toDate() || new Date(),
          }
        : undefined,
      postAssessment: data.postAssessment
        ? {
            answers: data.postAssessment.answers,
            score: data.postAssessment.score || 0,
            correctAnswers: data.postAssessment.correctAnswers || 0,
            totalQuestions: data.postAssessment.totalQuestions || 0,
            completedAt:
              data.postAssessment.completedAt?.toDate() || new Date(),
          }
        : undefined,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    };
  } catch (error) {
    console.error("Error getting user assessments:", error);
    throw new Error("Failed to get user assessments. Please try again.");
  }
};

/**
 * Save assessment answers (pre or post)
 */
export const saveAssessment = async (
  userId: string,
  type: AssessmentType,
  answers: Record<string, string>,
  score: number,
  correctAnswers: number,
  totalQuestions: number
): Promise<void> => {
  try {
    const docRef = doc(db, ASSESSMENTS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    const assessmentData = {
      answers,
      score,
      correctAnswers,
      totalQuestions,
      completedAt: serverTimestamp(),
    };

    if (!docSnap.exists()) {
      // Create new document
      await setDoc(docRef, {
        [type === "pre" ? "preAssessment" : "postAssessment"]: assessmentData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } else {
      // Update existing document
      await setDoc(
        docRef,
        {
          [type === "pre" ? "preAssessment" : "postAssessment"]: assessmentData,
          updatedAt: serverTimestamp(),
        },
        { merge: true }
      );
    }
  } catch (error) {
    console.error("Error saving assessment:", error);
    throw new Error("Failed to save assessment. Please try again.");
  }
};

/**
 * Check if user has completed pre-assessment
 */
export const hasCompletedPreAssessment = async (
  userId: string
): Promise<boolean> => {
  try {
    const assessments = await getUserAssessments(userId);
    return !!assessments?.preAssessment;
  } catch (error) {
    console.error("Error checking pre-assessment:", error);
    return false;
  }
};

/**
 * Check if user has completed post-assessment
 */
export const hasCompletedPostAssessment = async (
  userId: string
): Promise<boolean> => {
  try {
    const assessments = await getUserAssessments(userId);
    return !!assessments?.postAssessment;
  } catch (error) {
    console.error("Error checking post-assessment:", error);
    return false;
  }
};
