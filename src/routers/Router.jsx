import React from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import NotFound from "../pages/NotFound";
import ForgotPassword from "../components/auth/ForgotPassword";
import VerifyEmail from "../components/auth/VerifyEmail";
import NewPassword from "../components/auth/NewPassword";
import DashboardLayout from "../layouts/DashboardLayout";

const Router = () => {
  // use protected routes for authenticated users (i.e: UserRoute & AdminRoute or make more if you've to)..

  return (
    <Routes>
      {/* Default Layout routes */}
      <Route path="/dashoardwer" element={<DashboardLayout />}>
        {/* <Route path="/dashoard" element={<Home />} /> */}
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
