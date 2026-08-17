import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as movieApi from "./movieApi";
import type { CreateMovieRequest } from "./types/createMovie";
import type { Movie } from "./types/movie";

interface MovieState {
  items: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MovieState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  return await movieApi.getMovies();
});

export const createMovie = createAsyncThunk(
  "movies/createMovie",
  async (request: CreateMovieRequest) => {
    return await movieApi.createMovie(request);
  },
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load movies";
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default movieSlice.reducer;
