// libs
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Global } from "@emotion/react";

// component
import NotFound from "./components/NotFound";

import globalStyles from "./globalStyles";
import ErrorBoundary from "components/ErrorBoundary";

// Dùng lazyload để tối ưu tốc độ tải trang
const HomePage = lazy(() => import("./modules/Home/pages/HomePage"));
const MovieShowing = lazy(() => import("./modules/Movies/pages/MovieShowing"));
const MovieComming = lazy(() => import("./modules/Movies/pages/MovieComming"));
const MovieDetails = lazy(() => import("./modules/Movies/pages/MovieDetails"));

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading Route....</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/movies">
            <Route path="now-showing" element={<MovieShowing />} />
            <Route path="coming-soon" element={<MovieComming />} />
            <Route path=":movieId" element={<MovieDetails />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Global styles={globalStyles} />
    </ErrorBoundary>
  );
}

export default App;
