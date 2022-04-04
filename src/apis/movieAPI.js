// Chứa các hàm gọi API liên quan đến movie

import axios from "./axiosClient";

export const getMovieShowing = () => {
  return axios.get("QuanLyPhim/LayDanhSachPhim", {
    params: {
      maNhom: "GP01",
    },
  });
};

export const getMovieDetails = (movieId) => {
  return axios.get("QuanLyPhim/LayThongTinPhim", {
    params: {
      maPhim: movieId,
    },
  });
};
