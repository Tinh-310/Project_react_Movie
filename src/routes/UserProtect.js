import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// Component có nhiệm vụ kiểm tra xem User có được truy cập vào 1 route hay không
function UserProtect({ children }) {
  const { isLoggedIn } = useSelector((state) => state.auth);

  const { pathname } = useLocation();

  // Chưa đăng nhập
  if (!isLoggedIn) {
    // Redirect user về login page
    // Lưu url hiện tại trước khi redirect về trang login để sau khi user login thành công có thể quay về page này, giúp tăng UX
    return <Navigate to={`/login?successUrl=${pathname}`} replace />;
  }

  // Đã đăng nhập
  return children;
}

export default UserProtect;
