import type { ModuleRoutes } from "../types/modules.type";
import { lazy } from "react";
import { SaludEconomicaProvider } from "./context/SaludEconomicaContext";

const Intro = lazy(() => import("./pages/Intro"));
const Instructions = lazy(() => import("./pages/Instructions"));
const Questions = lazy(() => import("./pages/Questions"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Reward = lazy(() => import("./pages/Reward"));

export const saludEconomicaRoutes: ModuleRoutes = {
  basePath: "salud-economica",
  routes: [
    {
      element: <SaludEconomicaProvider />,
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
