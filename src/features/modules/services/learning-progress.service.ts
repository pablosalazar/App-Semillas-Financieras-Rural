import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import type { LearningProgress, ModuleProgress } from "../types/modules.type";

const LEARNING_PROGRESS_COLLECTION = "learning_progress";

export const getLearningProgress = async (
  userId: string
): Promise<LearningProgress | null> => {
  try {
    const docRef = doc(db, LEARNING_PROGRESS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = docSnap.data();
    return {
      userId,
      modules: (data.modules || []).map((m: any) => ({
        moduleId: m.moduleId,
        progress: m.progress || 0,
        attempts: m.attempts || 0,
        startedAt: m.startedAt?.toDate() || new Date(),
        completedAt: m.completedAt?.toDate() || null,
        lastVisitedAt: m.lastVisitedAt?.toDate() || new Date(),
      })),
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
    };
  } catch (error) {
    console.error("Error getting learning progress:", error);
    throw new Error("Failed to get learning progress. Please try again.");
  }
};

export const registerLearningProgress = async (
  userId: string,
  moduleProgress: Omit<
    ModuleProgress,
    "startedAt" | "lastVisitedAt" | "attempts"
  > & {
    startedAt?: Date;
    lastVisitedAt?: Date;
    attempts?: number;
  }
): Promise<void> => {
  try {
    const docRef = doc(db, LEARNING_PROGRESS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);
    const now = new Date();

    if (!docSnap.exists()) {
      // Create new progress document
      const newModule: ModuleProgress = {
        ...moduleProgress,
        attempts: 1,
        startedAt: moduleProgress.startedAt || now,
        lastVisitedAt: moduleProgress.lastVisitedAt || now,
        completedAt: moduleProgress.progress >= 100 ? now : null,
      };

      await setDoc(docRef, {
        modules: [newModule],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return;
    }

    // Document exists, update it
    const data = docSnap.data();
    const modules = data.modules || [];

    // Find if module already exists
    const moduleIndex = modules.findIndex(
      (m: any) => m.moduleId === moduleProgress.moduleId
    );

    if (moduleIndex === -1) {
      // Module doesn't exist, add it
      const newModule: ModuleProgress = {
        ...moduleProgress,
        attempts: 1,
        startedAt: moduleProgress.startedAt || now,
        lastVisitedAt: moduleProgress.lastVisitedAt || now,
        completedAt: moduleProgress.progress >= 100 ? now : null,
      };
      modules.push(newModule);
    } else {
      // Module exists, update it
      const existingModule = modules[moduleIndex];
      const wasComplete = existingModule.progress >= 100;
      const isNowComplete = moduleProgress.progress >= 100;

      modules[moduleIndex] = {
        ...existingModule,
        ...moduleProgress,
        // Increment attempts every time the module is completed (reaches 100%)
        attempts: isNowComplete
          ? (existingModule.attempts || 0) + 1
          : existingModule.attempts,
        // Keep original startedAt
        startedAt: existingModule.startedAt,
        // Update lastVisitedAt to now
        lastVisitedAt: now,
        // Set completedAt only on first completion, keep it unchanged after that
        completedAt:
          isNowComplete && !wasComplete ? now : existingModule.completedAt,
      };
    }

    await setDoc(
      docRef,
      {
        modules,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating learning progress:", error);
    throw new Error("Failed to update learning progress. Please try again.");
  }
};
