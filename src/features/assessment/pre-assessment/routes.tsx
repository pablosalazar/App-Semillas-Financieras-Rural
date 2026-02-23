import type { RouteObject } from "react-router";
import { lazy } from "react";

const PreIntro = lazy(() => import("./pages/Intro"));
const PreAssessment = lazy(() => import("./pages/Assessment"));

export interface AssessmentRoutes {
  basePath: string;
  routes: RouteObject[];
}

export const preAssessmentRoutes: AssessmentRoutes = {
  basePath: "inicial",
  routes: [
    {
      index: true,
      element: <PreIntro />,
    },
    {
      path: "preguntas",
      element: <PreAssessment />,
    },
  ],
};
