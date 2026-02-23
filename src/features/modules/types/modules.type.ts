import type { RouteObject } from "react-router";
export interface ModuleRoutes {
  /**
   * The base path for the module (e.g., "1-evaluacion-inicial")
   * This will be used to create the full path: /modules/{basePath}
   */
  basePath: string;

  /**
   * The routes for this module
   * These routes will be automatically prefixed with /modules/{basePath}
   */
  routes: RouteObject[];
}
export interface ModuleProgress {
  moduleId: string;
  progress: number;
  attempts: number;
  startedAt: Date;
  completedAt?: Date | null;
  lastVisitedAt: Date;
}
export interface LearningProgress {
  userId: string;
  modules: ModuleProgress[];
  createdAt: Date;
  updatedAt: Date;
}
