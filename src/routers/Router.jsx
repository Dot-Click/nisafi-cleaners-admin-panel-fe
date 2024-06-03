import React from "react";
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

const Router = () => {
  // use protected routes for authenticated users (i.e: UserRoute & AdminRoute or make more if you've to)..

  return (
    <Routes>
      {/* Default Layout routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="/dashboard/user-managment" element={<UserManagement />} />
        <Route path="/dashboard/user/worker-info" element={<WorkerInfo />} />
        <Route path="/dashboard/payment-details" element={<PaymentDetails />} />
        <Route path="/dashboard/settings" element={<Settings />} />
      </Route>

      {/* Auth routes */}
      <Route path="/" element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/new-password" element={<NewPassword />} />
      </Route>

      {/* Not found page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
