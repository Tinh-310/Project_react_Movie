// Redux-toolkit configuration
import { configureStore } from "@reduxjs/toolkit";
import homeMovie from "./modules/Home/slices/movie";
import auth from "./modules/Auth/slices/auth";
import movieDetails from "./modules/Movies/slices/movieDetails";

// Mặc định configureStore đã bao gồm redux-devtool và redux thunk
const store = configureStore({
  // Tự động combine các child reducers
  reducer: {
    // Home module
    homeMovie,
    // Movies module
    movieDetails,
    // Auth module
    auth,
  },
});

export default store;
