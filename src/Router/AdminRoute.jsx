import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) {
    return (
      <span className="loading loading-bars loading-lg flex text-center items-center mx-auto justify-center min-h-screen"></span>
    );
  }
  if (user && isAdmin) {
    return children;
  }
  return <Navigate to="/login" state={location.pathname}></Navigate>;
};

export default AdminRoute;
