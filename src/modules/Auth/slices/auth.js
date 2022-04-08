import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "apis/authAPI";

const initialState = {
  user: null,
  isLoggedIn: false, // Dùng đê xác định xem user đã đăng nhập hay chưa
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk("auth/login", async (values) => {
  const data = await authAPI.login(values);
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
    [login.rejected]: (state, {error}) => {
      return { ...state, isLoading: false, error: error.message };
    },
  },
});
export default authSlice.reducer;
