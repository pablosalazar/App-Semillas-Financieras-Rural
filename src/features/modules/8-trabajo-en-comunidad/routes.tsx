import type { ModuleRoutes } from "../types/modules.type";
import { lazy } from "react";

const Intro = lazy(() => import("./pages/Intro"));
const Activity = lazy(() => import("./pages/Activity"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Reward = lazy(() => import("./pages/Reward"));
const Instructions = lazy(() => import("./pages/Instructions"));

export const trabajoEnComunidadRoutes: ModuleRoutes = {
  basePath: "trabajo-en-comunidad",
  routes: [
    {
      path: "",
      element: <Intro />,
    },
    {
      path: "instrucciones",
      element: <Instructions />,
    },
    {
      path: "actividad",
      element: <Activity />,
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
