import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as languageApi from "./languageApi";
import { ApiException } from "../../services/ApiException";
import type { Language } from "./types/language";

interface LanguageState {
  items: Language[];

  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  fetchError: string | null;
  fetchErrorDetails: Record<string, string[]>;
}

const initialState: LanguageState = {
  items: [],

  fetchStatus: "idle",
  fetchError: null,
  fetchErrorDetails: {},
};

export const fetchLanguages = createAsyncThunk<
  Language[],
  void,
  {
    rejectValue: {
      code: string;
      message: string;
      details: Record<string, string[]>;
    };
  }
>("languages/fetchLanguages", async (_, { rejectWithValue }) => {
  try {
    return await languageApi.getLanguages();
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

const languageSlice = createSlice({
  name: "languages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLanguages.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = null;
        state.fetchErrorDetails = {};
      })
      .addCase(fetchLanguages.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.items = action.payload;
        state.fetchError = null;
        state.fetchErrorDetails = {};
      })
      .addCase(fetchLanguages.rejected, (state, action) => {
        state.fetchStatus = "failed";

        state.fetchError =
          action.payload?.message ??
          action.error.message ??
          "Failed to load languages";

        state.fetchErrorDetails = action.payload?.details ?? {};
      });
  },
});

export default languageSlice.reducer;
