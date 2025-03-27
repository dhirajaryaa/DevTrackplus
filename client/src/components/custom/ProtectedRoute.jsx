import Layout from "@/layout/Layout";
import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default ProtectedRoute;
