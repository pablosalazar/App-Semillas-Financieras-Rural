import type { ModuleRoutes } from "../types/modules.type";
import { lazy } from "react";

const Intro = lazy(() => import("./pages/Intro"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Reward = lazy(() => import("./pages/Reward"));

export const recomendacionesDeSeguridadRoutes: ModuleRoutes = {
  basePath: "recomendaciones-de-seguridad",
  routes: [
    {
      path: "",
      element: <Intro />,
    },
    {
      path: "feedback",
      element: <Feedback />,
    },
    {
      path: "reward",
      element: <Reward />,
    },
  ],
};
