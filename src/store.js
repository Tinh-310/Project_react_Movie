// Redux-toolkit configuration
import { configureStore } from "@reduxjs/toolkit";
import homeMovie from "./modules/Home/slices/movie";
import movieDetails from "./modules/Movies/slices/movieDetails";

// Mặc định configureStore đã bao gồm redux-devtool và redux thunk
const store = configureStore({
  // Tự động combine các child reducers
  reducer: {
    // Home module
    homeMovie,
    // Movies module
    movieDetails,
  },
});

export default store;
