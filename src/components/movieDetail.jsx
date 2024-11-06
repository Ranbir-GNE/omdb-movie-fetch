import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetail, clearMovieDetails } from "../app/movieSlice";
import LoadingSpinner from "./LoadingSpinner";

const MovieDetail = ({ movieId, onClose }) => {
  const dispatch = useDispatch();
  const { movieDetails, loading, error } = useSelector((state) => state.movies);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (
      movieId &&
      !hasFetched &&
      (!movieDetails || movieDetails.imdbID !== movieId)
    ) {
      dispatch(fetchMovieDetail(movieId));
      setHasFetched(true);
    }
  }, [movieId, hasFetched, dispatch, movieDetails]);

  const handleClose = () => {
    dispatch(clearMovieDetails());
    setHasFetched(false);
    onClose();
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500">{error}</p>;

  if (!movieDetails || typeof movieDetails !== "object") {
    return <p>No details available</p>;
  }

  const {
    Title = "Unknown Title",
    Poster,
    Director = "Unknown Director",
    Year = "Unknown Year",
    Plot = "No plot available",
    Genre = "Unknown Genre",
    imdbRating = "Not rated",
    Runtime = "Unknown Runtime",
    Actors = "Unknown Actors",
    Language = "Unknown Language",
    Country = "Unknown Country",
    Awards = "No awards",
    BoxOffice = "Unknown Box Office",
  } = movieDetails;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 relative w-full max-w-lg">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          Close
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{Title}</h2>
          <img
            src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/150"}
            alt={`${Title} poster`}
            className="w-full h-64 object-contain rounded-lg mb-4"
          />
          <p>
            <strong>Director:</strong> {Director}
          </p>
          <p>
            <strong>Year:</strong> {Year}
          </p>
          <p>
            <strong>Runtime:</strong> {Runtime}
          </p>
          <p>
            <strong>Actors:</strong> {Actors}
          </p>
          <p>
            <strong>Box Office:</strong> {BoxOffice}
          </p>
          <p>
            <strong>Rating:</strong> {imdbRating}
          </p>
          <p>
            <strong>Genre:</strong> {Genre}
          </p>
          <p>
            <strong>Language:</strong> {Language}
          </p>
          <p>
            <strong>Country:</strong> {Country}
          </p>
          <p>
            <strong>Awards:</strong> {Awards}
          </p>
          <p>
            <strong>Plot:</strong> {Plot}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
