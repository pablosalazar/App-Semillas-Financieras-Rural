import type { ModuleRoutes } from "../types/modules.type";
import { lazy } from "react";

const Intro = lazy(() => import("./pages/Intro"));
const Instructions = lazy(() => import("./pages/Instructions"));
const Activity = lazy(() => import("./pages/Activity"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Reward = lazy(() => import("./pages/Reward"));
const SavingsProductsVideo = lazy(() => import("./pages/SavingsProductsVideo"));
const CreditProductsVideo = lazy(() => import("./pages/CreditProductsVideo"));
const InsuranceProductsVideo = lazy(
  () => import("./pages/InsuranceProductsVideo")
);
const FinancialChannelsVideo = lazy(
  () => import("./pages/FinancialChannelsVideo")
);

export const serviciosFinancierosRoutes: ModuleRoutes = {
  basePath: "productos-y-servicios-financieros",
  routes: [
    {
      path: "",
      element: <Intro />,
    },
    {
      path: "productos-ahorro",
      element: <SavingsProductsVideo />,
    },
    {
      path: "productos-credito",
      element: <CreditProductsVideo />,
    },
    {
      path: "productos-seguro",
      element: <InsuranceProductsVideo />,
    },
    {
      path: "canales-financieros",
      element: <FinancialChannelsVideo />,
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
