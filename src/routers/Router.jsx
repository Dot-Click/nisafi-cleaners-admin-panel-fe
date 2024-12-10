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
import { successMessage } from "../services/helpers";
import { useDashboardStore } from "../stores/dashboardStore";
import UserAccount from "../pages/UserAccount";
import UserRoute from "./UserRoute";

const Router = () => {
  return (
    <Routes>
      {/* Default Layout routes */}

      <Route
        path="/user-account"
        element={<UserRoute Component={UserAccount} />}
      />
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
          path="/dashboard/job/details/:id"
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
