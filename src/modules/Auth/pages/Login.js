import React from "react";

function Login() {
  return (
    <form>
      <div>
        <label htmlFor="">Tài Khoản</label>
        <input type="text" id="taiKhoan" />
      </div>
      <div>
        <label htmlFor="">Mật Khẩu</label>
        <input type="password" id="matKhau" />
      </div>
    </form>
  );
}

export default Login;
