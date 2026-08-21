import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as genreApi from "./genreApi";
import type { Genre } from "./types/genre";

interface GenreState {
  items: Genre[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: GenreState = {
  items: [],
  status: "idle",
  error: null,
};

export const fetchGenres = createAsyncThunk("genres/fetchGenres", async () => {
  return await genreApi.getGenres();
});

const genreSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchGenres.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to load genres";
      });
  },
});

export default genreSlice.reducer;
