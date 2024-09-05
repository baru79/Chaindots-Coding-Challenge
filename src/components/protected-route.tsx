import { useNavigate } from "react-router-dom";
import useAuthenticatedContext from "../hooks/useAuthenticatedContext";
import { PropsWithChildren, useEffect } from "react";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user, isAuthenticated } = useAuthenticatedContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login", { replace: true });
    }
  }, [navigate, user, isAuthenticated]);

  return children;
};

export default ProtectedRoute;
