import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserLoginState } from "../Store/Slices/userSlice";

function ProtectRoutesFromLoggedInUser() {
  const isSignedIn = useSelector(selectUserLoginState);

  if (isSignedIn) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
export default ProtectRoutesFromLoggedInUser;
