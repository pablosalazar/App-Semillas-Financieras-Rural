import type { LearningProgress } from "@/features/modules/types/modules.type";
import { MODULES_PATH, type ModulePath } from "../constants/modulesPath";

export interface ModuleWithStatus extends ModulePath {
  isUnlocked: boolean;
  isCompleted: boolean;
  moduleIndex: number;
}

/**
 * Determines if a module is unlocked based on learning progress
 * @param moduleIndex - Array index of the module (0-based)
 * @param learningProgress - User's learning progress data
 * @returns true if module is unlocked (first module or previous module completed)
 */
export function isModuleUnlocked(
  moduleIndex: number,
  learningProgress: LearningProgress | null
): boolean {
  // First module is always unlocked
  if (moduleIndex === 0) {
    return true;
  }

  // If no learning progress, only first module is unlocked
  if (!learningProgress) {
    return false;
  }

  // Get the previous module
  const previousModule = MODULES_PATH[moduleIndex - 1];
  if (!previousModule) {
    return false;
  }

  // Check if previous module is completed
  return isModuleCompleted(previousModule.id, learningProgress);
}

/**
 * Checks if a module is completed (progress === 100)
 * @param moduleId - String ID of the module (e.g., "salud-economica")
 * @param learningProgress - User's learning progress data
 * @returns true if module progress is exactly 100
 */
export function isModuleCompleted(
  moduleId: string,
  learningProgress: LearningProgress | null
): boolean {
  if (!learningProgress) {
    return false;
  }

  const moduleProgress = learningProgress.modules.find(
    (m) => m.moduleId === moduleId
  );

  return moduleProgress?.progress === 100;
}

/**
 * Gets all modules with their unlock and completion status
 * @param learningProgress - User's learning progress data
 * @returns Array of modules with status information
 */
export function getModulesWithStatus(
  learningProgress: LearningProgress | null
): ModuleWithStatus[] {
  return MODULES_PATH.map((module, index) => ({
    ...module,
    moduleIndex: index,
    isUnlocked: isModuleUnlocked(index, learningProgress),
    isCompleted: isModuleCompleted(module.id, learningProgress),
  }));
}
