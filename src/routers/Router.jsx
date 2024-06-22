import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../components/auth/Login";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../components/auth/ForgotPassword";
import VerifyEmail from "../components/auth/VerifyEmail";
import NewPassword from "../components/auth/NewPassword";
import DashboardLayout from "../layouts/DashboardLayout";
import UserManagement from "../pages/UserManagement";
import Dashboard from "../pages/Dashboard";
import PaymentDetails from "../pages/PaymentDetails";
import Settings from "../pages/Settings";
import WorkerInfo from "../pages/WorkerInfo";
import JobManagement from "../pages/JobManagement";
import AuthRoute from "./AuthRoute";
import AdminRoute from "./AdminRoute";
import JobDetail from "../pages/JobDetail";
import { useShallow } from "zustand/react/shallow";
import { useAuthStore } from "../stores/authStore";

const Router = () => {
  const { isAuthenticated, socket, user } = useAuthStore(
    useShallow((state) => state)
  );

  useEffect(() => {
    console.log("isAuth", isAuthenticated);
    console.log("user", user);
    console.log("socket", socket);
    if (isAuthenticated && user) {
      socket.emit("join", user?.userData?._id);
      console.log("Here");
      socket.on("reconnect", () => {
        if (isAuthenticated) {
          socket.emit("join", user?.userData?._id);
        }
      });
    }

    //  socket.on("notification", (notification) => {
    //    if (user?.role === "admin") {
    //      successMessage("Notification recieved!");
    //    }
    //    dispatch(getNewNotification(notification));
    //  });

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated]);

  return (
    <Routes>
      {/* Default Layout routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<AdminRoute Component={Dashboard} />} />

        <Route
          path="/dashboard/user/management"
          element={<AdminRoute Component={UserManagement} />}
        />
        <Route
          path="/dashboard/user/worker-info/:id"
          element={<AdminRoute Component={WorkerInfo} />}
        />
        <Route
          path="/dashboard/payment-details"
          element={<AdminRoute Component={PaymentDetails} />}
        />
        <Route
          path="/dashboard/settings"
          element={<AdminRoute Component={Settings} />}
        />

        <Route
          path="/dashboard/jobs/management"
          element={<AdminRoute Component={JobManagement} />}
        />
        <Route
          path="/dashboard/jobs/details/:id"
          element={<AdminRoute Component={JobDetail} />}
        />
      </Route>

      {/* Auth routes */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<AuthRoute Component={Login} />} />

        <Route
          path="/forgot-password"
          element={<AuthRoute Component={ForgotPassword} />}
        />

        <Route
          path="/verify-email"
          element={<AuthRoute Component={VerifyEmail} />}
        />
        <Route
          path="/new-password"
          element={<AuthRoute Component={NewPassword} />}
        />
      </Route>

      {/* Not found page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
