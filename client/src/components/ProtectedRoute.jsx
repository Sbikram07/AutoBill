import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/authContext";

const ProtectedRoute = () => {
  const { isLogin } = useAuth();
  return isLogin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
