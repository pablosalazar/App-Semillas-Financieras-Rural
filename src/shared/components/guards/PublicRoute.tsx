import { useAuth } from "@/context";
import { Loader } from "@/shared/components/ui/loader/Loader";
import { Navigate, Outlet } from "react-router";

export function PublicRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loader while checking authentication from localStorage
  if (isLoading) {
    return <Loader />;
  }

  // If user is already authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
