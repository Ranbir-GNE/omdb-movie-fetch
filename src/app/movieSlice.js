import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

const fetchMoviesStart = () => ({
  type: "movies/fetchMoviesStart",
});

const fetchMoviesSuccess = (movies) => ({
  type: "movies/fetchMoviesSuccess",
  payload: movies,
});

const fetchMoviesFailure = (error) => ({
  type: "movies/fetchMoviesFailure",
  payload: error,
});

export const fetchMovies = (searchTerm) => async (dispatch) => {
  dispatch(fetchMoviesStart());
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
    );
    const data = response.data;
    if (data.Response === "True") {
      dispatch(fetchMoviesSuccess(data.Search));
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    dispatch(fetchMoviesFailure(error.message));
  }
};

const fetchMovieDetailStart = () => ({
  type: "movies/fetchMovieDetailStart",
});

const fetchMovieDetailSuccess = (movie) => ({
  type: "movies/fetchMovieDetailSuccess",
  payload: movie,
});

const fetchMovieDetailFailure = (error) => ({
  type: "movies/fetchMovieDetailFailure",
  payload: error,
});

export const fetchMovieDetail = (movieId) => async (dispatch) => {
  dispatch(fetchMovieDetailStart());
  try {
    const response = await axios.get(
      `https://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`
    );
    const data = response.data;
    if (data.Response === "True") {
      dispatch(fetchMovieDetailSuccess(data));
    } else {
      throw new Error(data.Error);
    }
  } catch (error) {
    dispatch(fetchMovieDetailFailure(error.message));
  }
};

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    moviesList: [],
    movieDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearMovieDetails: (state) => {
      state.movieDetails = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("movies/fetchMoviesStart", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("movies/fetchMoviesSuccess", (state, action) => {
        state.loading = false;
        state.moviesList = action.payload;
      })
      .addCase("movies/fetchMoviesFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase("movies/fetchMovieDetailStart", (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase("movies/fetchMovieDetailSuccess", (state, action) => {
        state.loading = false;
        state.movieDetails = action.payload;
      })
      .addCase("movies/fetchMovieDetailFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMovieDetails } = movieSlice.actions;

export default movieSlice.reducer;
