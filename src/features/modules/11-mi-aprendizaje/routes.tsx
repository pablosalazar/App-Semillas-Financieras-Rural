import type { ModuleRoutes } from "../types/modules.type";
import { lazy } from "react";

const Reward = lazy(() => import("./pages/Reward"));

export const miAprendizajeRoutes: ModuleRoutes = {
  basePath: "mi-aprendizaje",
  routes: [
    {
      path: "",
      element: <Reward />,
    },
  ],
};
