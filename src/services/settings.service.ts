import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export interface AssessmentQuestion {
  id: string;
  question: string;
  answers: Array<{
    id: string;
    text: string;
  }>;
  correctAnswer: string;
}

export interface AssessmentQuestionsSettings {
  questions: AssessmentQuestion[];
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Fetches assessment questions from Firestore settings
 * @returns Promise<AssessmentQuestion[]> Array of assessment questions
 */
export const getAssessmentQuestions = async (): Promise<
  AssessmentQuestion[]
> => {
  try {
    const docRef = doc(db, "settings", "assessment_questions");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.warn("No assessment questions found in settings");
      return [];
    }

    const data = docSnap.data() as AssessmentQuestionsSettings;
    return data.questions || [];
  } catch (error) {
    console.error("Error fetching assessment questions:", error);
    throw new Error("Failed to fetch assessment questions");
  }
};
