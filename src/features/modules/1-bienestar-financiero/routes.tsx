import type { ModuleRoutes } from "../types/modules.type";
import { lazy } from "react";
import { BienestarFinancieroProvider } from "./context/BienestarFinancieroContext";

const Intro = lazy(() => import("./pages/Intro"));
const Instructions = lazy(() => import("./pages/Instructions"));
const Questions = lazy(() => import("./pages/Questions"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Reward = lazy(() => import("./pages/Reward"));

export const bienestarFinancieroRoutes: ModuleRoutes = {
  basePath: "bienestar-financiero",
  routes: [
    {
      element: <BienestarFinancieroProvider />,
      children: [
        {
          path: "",
          element: <Intro />,
        },
        {
          path: "instrucciones",
          element: <Instructions />,
        },
        {
          path: "preguntas",
          element: <Questions />,
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
    },
  ],
};
