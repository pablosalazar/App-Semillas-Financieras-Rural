import type { RouteObject } from "react-router";

import AppLayout from "@/layouts/AppLayout";
import { ProtectedRoute } from "@/shared/components/guards";
import { getModuleRoutes } from "@/features/modules";
import { lazy } from "react";
import { getAssessmentRoutes } from "@/features/assessment";

const HomePage = lazy(() => import("@/features/home/pages/HomePage"));
const ProfilePage = lazy(() => import("@/features/users/pages/ProfilePage"));

export const AppRoutes: RouteObject = {
  element: <ProtectedRoute />,
  children: [
    {
      element: <AppLayout />,
      children: [
        {
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/modulos",
          children: getModuleRoutes(),
        },
        {
          path: "/evaluaciones",
          children: getAssessmentRoutes(),
        },
      ],
    },
  ],
};
