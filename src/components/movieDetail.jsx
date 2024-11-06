import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetail, clearMovieDetails } from "../app/movieSlice";
import LoadingSpinner from "./LoadingSpinner";

const MovieDetail = ({ movieId, onClose }) => {
  const dispatch = useDispatch();
  const { movieDetails, loading, error } = useSelector((state) => state.movies);

  useEffect(() => {
    if (movieId && (!movieDetails || movieDetails.id !== movieId)) {
      dispatch(fetchMovieDetail(movieId));
    }

    return () => {
      dispatch(clearMovieDetails());
    };
  }, [movieId]);

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
  } = movieDetails;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-8 relative w-full max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          Close
        </button>
        <>
          <h2 className="text-2xl font-bold mb-4">{Title}</h2>
          <img
            src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/150"}
            alt={`${Title} poster`}
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <p>
            <strong>Director:</strong> {Director}
          </p>
          <p>
            <strong>Year:</strong> {Year}
          </p>
          <p>
            <strong>Plot:</strong> {Plot}
          </p>
          <p>
            <strong>Genre:</strong> {Genre}
          </p>
          <p>
            <strong>Rating:</strong> {imdbRating}
          </p>
        </>
      </div>
    </div>
  );
};

export default MovieDetail;
