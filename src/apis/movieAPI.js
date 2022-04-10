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

export const addMovie = (movie) => {
  // Nếu bên trong object movie có chứa data là định dạng File thì không thể upload như bình thường mà cần chuyển sang định dạng FormData để upload
  const formData = new FormData();
  formData("maNhom", "GP01");
  for (let key in movie) {
    formData.append(key, movie[key]);
  }

  return axios.post("QuanLyPhim/ThemPhimUploadHinh", formData);
};






