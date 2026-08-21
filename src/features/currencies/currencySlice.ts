import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as currencyApi from "./currencyApi";
import { ApiException } from "../../services/ApiException";
import type { Currency } from "./types/currency";

interface CurrencyState {
  items: Currency[];

  fetchStatus: "idle" | "loading" | "succeeded" | "failed";
  fetchError: string | null;
  fetchErrorDetails: Record<string, string[]>;
}

const initialState: CurrencyState = {
  items: [],

  fetchStatus: "idle",
  fetchError: null,
  fetchErrorDetails: {},
};

export const fetchCurrencies = createAsyncThunk<
  Currency[],
  void,
  {
    rejectValue: {
      code: string;
      message: string;
      details: Record<string, string[]>;
    };
  }
>("currencies/fetchCurrencies", async (_, { rejectWithValue }) => {
  try {
    return await currencyApi.getCurrencies();
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

const currencySlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrencies.pending, (state) => {
        state.fetchStatus = "loading";
        state.fetchError = null;
        state.fetchErrorDetails = {};
      })
      .addCase(fetchCurrencies.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.fetchError = null;
        state.fetchErrorDetails = {};

        state.items = action.payload;
      })
      .addCase(fetchCurrencies.rejected, (state, action) => {
        state.fetchStatus = "failed";

        state.fetchError =
          action.payload?.message ??
          action.error.message ??
          "Failed to load currencies";

        state.fetchErrorDetails = action.payload?.details ?? {};
      });
  },
});

export default currencySlice.reducer;
