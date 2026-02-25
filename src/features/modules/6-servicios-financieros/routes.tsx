import type { ModuleRoutes } from "../types/modules.type";
import { lazy } from "react";

const Intro = lazy(() => import("./pages/Intro"));
const Instructions = lazy(() => import("./pages/Instructions"));
const Video1 = lazy(() => import("./pages/Video1"));
const Video2 = lazy(() => import("./pages/Video2"));
const Video3 = lazy(() => import("./pages/Video3"));
const Activity = lazy(() => import("./pages/Activity"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Reward = lazy(() => import("./pages/Reward"));

export const serviciosFinancierosRoutes: ModuleRoutes = {
  basePath: "productos-y-servicios-financieros",
  routes: [
    {
      path: "",
      element: <Intro />,
    },
    {
      path: "video-1",
      element: <Video1 />,
    },
    {
      path: "video-2",
      element: <Video2 />,
    },
    {
      path: "video-3",
      element: <Video3 />,
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
