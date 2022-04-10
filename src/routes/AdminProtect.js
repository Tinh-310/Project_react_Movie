import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

function AdminProtect({ children }) {
  const { pathname } = useLocation();

  const { user, isLoggedIn } = useSelector((state) => state.auth);

  // Chưa đăng nhập
  if (!isLoggedIn) {
    return <Navigate to={`/login?successUrl=${pathname}`} replace />;
  }

  // Đã đăng nhập nhưng không phải là admin
  if (user?.maLoaiNguoiDung !== "QuanTri") {
    return <Navigate to="/" replace />;
    // return <Navigate to="/not-found" replace />;
  }

  // return <Outlet />;
  return children;
}

export default AdminProtect;
