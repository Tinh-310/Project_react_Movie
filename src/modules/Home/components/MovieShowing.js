import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getShowing } from "../slices/movie";

function MovieShowing() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.homeMovie);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getShowing());
  }, []);

  const goToMovieDetails = (movieId) => {
    // Navigate tới trang movies/:movieId
    navigate(`/movies/${movieId}`);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error || "Something went wrong"}</p>;
  }

  return (
    <div>
      <h3>MovieShowing</h3>
      {data.map((movie) => (
        <>
          <p>{movie.tenPhim}</p>
          <button onClick={() => goToMovieDetails(movie.maPhim)}>
            Details
          </button>
        </>
      ))}
    </div>
  );
}

export default MovieShowing;
