import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (searchTerm) => {
    const API_KEY = "1de027e4";
    const response = await axios.get(
      `http://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`
    );
    const data = response.data;
    if (data.Response === "True") {
      return data.Search;
    } else {
      throw new Error(data.Error);
    }
  }
);

export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (movieId) => {
    const API_KEY = "1de027e4";
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${movieId}&apikey=${API_KEY}`
    );
    const data = response.data;
    if (data.Response === "True") {
      return data;
    } else {
      throw new Error(data.Error);
    }
  }
);

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
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.moviesList = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMovieDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearMovieDetails } = movieSlice.actions;

export default movieSlice.reducer;
