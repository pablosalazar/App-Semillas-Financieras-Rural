import type { RouteObject } from "react-router";
import { lazy } from "react";

const PostIntro = lazy(() => import("./pages/Intro"));
const PostAssessment = lazy(() => import("./pages/Assessment"));

export interface AssessmentRoutes {
  basePath: string;
  routes: RouteObject[];
}

export const postAssessmentRoutes: AssessmentRoutes = {
  basePath: "final",
  routes: [
    {
      index: true,
      element: <PostIntro />,
    },
    {
      path: "preguntas",
      element: <PostAssessment />,
    },
  ],
};
