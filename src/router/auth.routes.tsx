import type { RouteObject } from "react-router";

import AuthLayout from "@/layouts/AuthLayout";
import { PublicRoute } from "@/shared/components/guards";
import { RootRedirect } from "@/shared/components/guards/RootRedirect";
import { lazy } from "react";

const LoginPage = lazy(() => import("@/features/auth/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/pages/RegisterPage"));

export const AuthRoutes: RouteObject = {
  element: <PublicRoute />,
  children: [
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/",
          element: <RootRedirect />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
      ],
    },
  ],
};
