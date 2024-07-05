import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth, useGetRole } from "../services/hooks";

const AuthRoute = ({ Component }) => {
  const isAuthenticated = useAuth();
  const role = useGetRole();
  if (isAuthenticated) {
    if (role === "admin") {
      return <Navigate to="/dashboard" />;
    }
  } else {
    return <Component />;
  }
};
export default AuthRoute;
