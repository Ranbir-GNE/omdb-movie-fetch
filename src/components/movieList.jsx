import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../app/movieSlice"; // Import your fetchMovies action
import LoadingSpinner from "./LoadingSpinner";
import MovieDetail from "./movieDetail";

const MovieList = () => {
  const dispatch = useDispatch();
  const { moviesList, loading, error } = useSelector((state) => state.movies);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchMovies(searchTerm));
    }
  }, [dispatch, searchTerm]); 

  const handleMovieClick = (id) => {
    setSelectedMovieId(id);
  };

  const renderMovieCard = (movie) => (
    <div
      key={movie.imdbID}
      onClick={() => handleMovieClick(movie.imdbID)}
      className="bg-gray-800 rounded-lg p-4 shadow-md w-64 text-center cursor-pointer"
    >
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/150"
        }
        alt={`${movie.Title} poster`}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold">{movie.Title}</h3>
      <p className="text-sm text-gray-400">{movie.Year}</p>
    </div>
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {moviesList.length > 0 ? (
        moviesList.map(renderMovieCard)
      ) : (
        <p className="text-center text-gray-500">No movies found</p>
      )}
      {selectedMovieId && (
        <MovieDetail
          movieId={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
};

export default MovieList;
