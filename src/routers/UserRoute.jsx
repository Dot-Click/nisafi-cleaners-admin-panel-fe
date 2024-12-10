import React from "react";
import { useGetRole, useAuth } from "../services/hooks";
import { Navigate } from "react-router-dom";

const UserRoute = ({ Component }) => {
  const isAuthenticated = useAuth();
  const role = useGetRole();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    if (role === "worker" || role === "client") {
      return <Component />;
    } else {
      return <Navigate to="/not-found" />;
    }
  }
};

export default UserRoute;
