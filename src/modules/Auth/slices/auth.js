import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "apis/authAPI";

const user = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user,
  isLoggedIn: Boolean(user), // dùng để xác định xem user đã đăng nhập hay chưa
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk("auth/login", async (values) => {
  const data = await authAPI.login(values);
  // Nếu muốn user không cần đăng nhập lại khi refresh hoặc close browser
  // Đăng nhập thành công => Lưu thông tin user vào localStorage
  localStorage.setItem("user", JSON.stringify(data));
  return { data };
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.pending]: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    [login.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        isLoading: false,
        user: payload.data,
        isLoggedIn: true,
      };
    },
    [login.rejected]: (state, { error }) => {
      return { ...state, isLoading: false, error: error.message };
    },
  },
});

export default authSlice.reducer;
