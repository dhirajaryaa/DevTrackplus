import { useGetUserMutation } from "@/app/auth/authApi";
import Layout from "@/layout/Layout";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, replace, useNavigate } from "react-router-dom";
import { setUser, removeUser } from "@/app/auth/authReducer";

function ProtectedRoute() {
  const { user, isUserLoggedIn } = useSelector((state) => state.auth);
  const [authCheck, setAuthCheck] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getLoginUser, { data, isLoading, isError }] = useGetUserMutation();

  useEffect(() => {
    if (!isUserLoggedIn) {
      getLoginUser()
        .unwrap()
        .then((data) => {          
            dispatch(setUser(data));
        })
        .catch((err) => {
          dispatch(removeUser());
          navigate("/login");
        })
        .finally(() => {
          setAuthCheck(true);
        });
    }
  }, [dispatch, navigate, getLoginUser, isUserLoggedIn]);

  if (isLoading && !authCheck) {
    return (
      <main className="w-full h-screen flex items-center justify-center">
        <Loader2 className="size-14 animate-spin" />
      </main>
    );
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default ProtectedRoute;
