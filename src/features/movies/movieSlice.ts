import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as movieApi from "./movieApi";
import type { CreateMovieRequest } from "./types/createMovie";
import type { Movie } from "./types/movie";
import { ApiException } from "../../services/ApiException";
import type { PagedResult } from "../../shared/types/pageResult";

interface MovieState {
  items: Movie[];

  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  fetchError: string | null;
  fetchErrorDetails: Record<string, string[]>;

  createStatus: "idle" | "loading" | "succeeded" | "failed";
  createError: string | null;
  createErrorDetails: Record<string, string[]>;

  updateStatus: "idle" | "loading" | "succeeded" | "failed";
  updateError: string | null;
  updateErrorDetails: Record<string, string[]>;

  deleteStatus: "idle" | "loading" | "succeeded" | "failed";
  deleteError: string | null;
  deleteErrorDetails: Record<string, string[]>;

  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

const initialState: MovieState = {
  items: [],

  fetchStatus: "idle",
  fetchError: null,
  fetchErrorDetails: {},

  createStatus: "idle",
  createError: null,
  createErrorDetails: {},

  updateStatus: "idle",
  updateError: null,
  updateErrorDetails: {},

  deleteStatus: "idle",
  deleteError: null,
  deleteErrorDetails: {},

  page: 1,
  pageSize: 20,
  totalCount: 0,
  totalPages: 0,
};

export const fetchMovies = createAsyncThunk<
  PagedResult<Movie>,
  { page?: number; pageSize?: number },
  {
    rejectValue: {
      code: string;
      message: string;
      details: Record<string, string[]>;
    };
  }
>(
  "movies/fetchMovies",
  async ({ page = 1, pageSize = 20 }, { rejectWithValue }) => {
    try {
      return await movieApi.getMovies(page, pageSize);
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
  },
);

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

export const updateMovie = createAsyncThunk<
  Movie,
  { id: string; request: CreateMovieRequest },
  {
    rejectValue: {
      code: string;
      message: string;
      details: Record<string, string[]>;
    };
  }
>("movies/updateMovie", async ({ id, request }, { rejectWithValue }) => {
  try {
    return await movieApi.updateMovie(id, request);
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

export const deleteMovie = createAsyncThunk<
  void,
  string,
  {
    rejectValue: {
      code: string;
      message: string;
      details: Record<string, string[]>;
    };
  }
>("movies/deleteMovie", async (id, { rejectWithValue }) => {
  try {
    await movieApi.deleteMovie(id);
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

  reducers: {
    resetCreateStatus: (state) => {
      state.createStatus = "idle";
      state.createError = null;
      state.createErrorDetails = {};
    },

    resetUpdateStatus: (state) => {
      state.updateStatus = "idle";
      state.updateError = null;
      state.updateErrorDetails = {};
    },

    resetDeleteStatus: (state) => {
      state.deleteStatus = "idle";
      state.deleteError = null;
      state.deleteErrorDetails = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = null;
        state.fetchErrorDetails = {};
      })

      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";

        state.items = action.payload.items;
        state.page = action.payload.page;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
      })

      .addCase(fetchMovies.rejected, (state, action) => {
        state.fetchStatus = "failed";

        state.fetchError =
          action.payload?.message ??
          action.error.message ??
          "Failed to load movies";

        state.fetchErrorDetails = action.payload?.details ?? {};
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
      })

      .addCase(createMovie.rejected, (state, action) => {
        state.createStatus = "failed";

        state.createError =
          action.payload?.message ??
          action.error.message ??
          "Failed to create movie";

        state.createErrorDetails = action.payload?.details ?? {};
      })

      .addCase(updateMovie.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
        state.updateErrorDetails = {};
      })

      .addCase(updateMovie.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        state.updateError = null;
        state.updateErrorDetails = {};

        const index = state.items.findIndex(
          (movie) => movie.id === action.payload.id,
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(updateMovie.rejected, (state, action) => {
        state.updateStatus = "failed";

        state.updateError =
          action.payload?.message ??
          action.error.message ??
          "Failed to update movie";

        state.updateErrorDetails = action.payload?.details ?? {};
      })
      .addCase(deleteMovie.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
        state.deleteErrorDetails = {};
      })

      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.deleteError = null;
        state.deleteErrorDetails = {};

        state.items = state.items.filter(
          (movie) => movie.id !== action.meta.arg,
        );
      })

      .addCase(deleteMovie.rejected, (state, action) => {
        state.deleteStatus = "failed";

        state.deleteError =
          action.payload?.message ??
          action.error.message ??
          "Failed to delete movie";

        state.deleteErrorDetails = action.payload?.details ?? {};
      });
  },
});

export const { resetCreateStatus, resetUpdateStatus, resetDeleteStatus } =
  movieSlice.actions;

export default movieSlice.reducer;
