import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
const ProtectedRoutes = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;