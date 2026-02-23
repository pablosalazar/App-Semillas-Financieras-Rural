import { type RouteObject } from "react-router";
import { preAssessmentRoutes } from "./pre-assessment/routes";
import { postAssessmentRoutes } from "./post-assessment/routes";

export function getAssessmentRoutes(): RouteObject[] {
  return [
    {
      path: preAssessmentRoutes.basePath,
      children: preAssessmentRoutes.routes,
    },
    {
      path: postAssessmentRoutes.basePath,
      children: postAssessmentRoutes.routes,
    },
  ];
}
