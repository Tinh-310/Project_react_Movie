import { lazy } from "react";
import NotFound from "components/NotFound";
import AdminLayout from "components/AdminLayout";
import UserProtect from "./UserProtect";
import AdminProtect from "./AdminProtect";

// Dùng lazyload để tối ưu tốc độ tải trang
const HomePage = lazy(() => import("modules/Home/pages/HomePage"));
const LoginPage = lazy(() => import("modules/Auth/pages/Login"));
const RegisterPage = lazy(() => import("modules/Auth/pages/Register"));
const MovieShowing = lazy(() => import("modules/Movies/pages/MovieShowing"));
const MovieComming = lazy(() => import("modules/Movies/pages/MovieComming"));
const MovieDetails = lazy(() => import("modules/Movies/pages/MovieDetails"));
const Booking = lazy(() => import("modules/Checkout/pages/Booking"));

// Admin
const MovieList = lazy(() => import("modules/MovieManagement/pages/MovieList"));
const AddMovie = lazy(() => import("modules/MovieManagement/pages/AddMovie"));
const UpdateMovie = lazy(() =>
  import("modules/MovieManagement/pages/UpdateMovie")
);

const routes = [
  // User Routes
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/movies",
    children: [
      {
        path: "now-showing",
        element: <MovieShowing />,
      },
      {
        path: "coming-soon",
        element: <MovieComming />,
      },
      {
        path: ":movieId",
        element: <MovieDetails />,
      },
    ],
  },
  {
    path: "booking/:ticketId",
    element: (
      <UserProtect>
        {/* children */}
        <Booking />
      </UserProtect>
    ),
  },

  // Admin Routes
  {
    path: "/admin",
    // element: <AdminProtect />,
    element: <AdminLayout />, // Layout
    children: [
      {
        path: "movies",
        element: (
          <AdminProtect>
            <MovieList />
          </AdminProtect>
        ),
      },
      {
        path: "movies/add",
        element: (
          <AdminProtect>
            <AddMovie />
          </AdminProtect>
        ),
      },
      {
        path: "movies/update/:movieId",
        element: (
          <AdminProtect>
            <UpdateMovie />
          </AdminProtect>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
