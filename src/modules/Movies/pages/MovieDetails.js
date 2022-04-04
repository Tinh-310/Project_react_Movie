import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMovieDetails } from "../slices/movieDetails";

function MovieDetails() {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.movieDetails);

  const { movieId } = useParams();

  useEffect(() => {
    dispatch(getMovieDetails(movieId));
  }, []);

  return (
    <div>
      <h3>MovieDetails</h3>
      <p>Tên phim: {data.tenPhim}</p>
    </div>
  );
}

export default MovieDetails;
