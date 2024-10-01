import { Navigate } from "react-router-dom";
import { useAuthServiceContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuthServiceContext();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace={true} />;
  }
  return <>{children}</>; // Wrapping children in a React fragment
};

export default ProtectedRoute;
