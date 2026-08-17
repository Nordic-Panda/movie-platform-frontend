import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as movieApi from "./movieApi";
import type { CreateMovieRequest } from "./types/createMovie";
import type { Movie } from "./types/movie";
import { ApiException } from "../../services/ApiException";
import type { PagedResult } from "../../shared/types/pageResult";

interface MovieState {
  items: Movie[];

  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;

  createStatus: "idle" | "loading" | "succeeded" | "failed";
  createError: string | null;
  createErrorDetails: Record<string, string[]>;

  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

const initialState: MovieState = {
  items: [],
  status: "idle",
  error: null,
  createStatus: "idle",
  createError: null,
  createErrorDetails: {},

  page: 1,
  pageSize: 20,
  totalCount: 0,
  totalPages: 0,
};

export const fetchMovies = createAsyncThunk<
  PagedResult<Movie>,
  number | undefined
>("movies/fetchMovies", async (page: number = 1) => {
  return await movieApi.getMovies(page);
});

export const createMovie = createAsyncThunk<
  Movie,
  CreateMovieRequest,
  {
    rejectValue: {
      code: string;
      message: string;
      details: Record<string, string[]>;
    };
  }
>("movies/createMovie", async (request, { rejectWithValue }) => {
  try {
    return await movieApi.createMovie(request);
  } catch (error) {
    if (error instanceof ApiException) {
      return rejectWithValue({
        code: error.code,
        message: error.message,
        details: error.details,
      });
    }

    throw error;
  }
});

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
        state.items = action.payload.items;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load movies";
      })
      .addCase(createMovie.pending, (state) => {
        state.createStatus = "loading";
        state.createError = null;
        state.createErrorDetails = {};
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.createError = null;
        state.createErrorDetails = {};

        state.items.push(action.payload);
      })
      .addCase(createMovie.rejected, (state, action) => {
        state.createStatus = "failed";

        state.createError =
          action.payload?.message ??
          action.error.message ??
          "Failed to create movie";

        state.createErrorDetails = action.payload?.details ?? {};
      });
  },
});

export default movieSlice.reducer;
