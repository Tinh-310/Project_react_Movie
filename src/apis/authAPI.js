import axios from "./axiosClient";

export const login = (values) => {
  return axios.post("QuanLyNguoiDung/DangNhap", values);
};

export const register = (values) => {
  return axios.post("QuanLyNguoiDung/DangKy", { ...values, maNhom: "GP01" });
};
