import { useAuth } from "@/context";
import { Loader } from "@/shared/components/ui/loader/Loader";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loader while checking authentication from localStorage
  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
