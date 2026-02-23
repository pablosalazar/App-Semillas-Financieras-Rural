import { Navigate } from "react-router";

export function RootRedirect() {
  // Redirect to login page
  // PublicRoute will handle redirecting to /home if user is already authenticated
  return <Navigate to="/login" replace />;
}
