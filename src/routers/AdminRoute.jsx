import React from "react";
import { Navigate } from "react-router-dom";
import { useGetRole, useAuth } from "../services/hooks";

const AdminRoute = ({ Component }) => {
  const isAuthenticated = useAuth();
  const role = useGetRole();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    if (role === "admin") {
      return <Component />;
    } else {
      return <Navigate to="/not-found" />;
    }
  }
};

export default AdminRoute;
