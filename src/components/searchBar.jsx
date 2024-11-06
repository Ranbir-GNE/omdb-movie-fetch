import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../app/movieSlice";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(fetchMovies(searchTerm));
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex justify-center mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a movie"
        className="w-80 p-2 rounded-l-lg focus:outline-none border-none text-gray-900"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
};

export default Searchbar;
