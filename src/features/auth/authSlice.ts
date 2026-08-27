import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as authApi from "./authApi";
import { ApiException } from "../../services/ApiException";

import type { LoginRequest } from "./types/LoginRequest";
import type { LoginResponse } from "./types/LoginResponse";
import type { User } from "./types/User";
import type { ExternalRegistration } from "./types/ExternalRegistration";

interface AuthState {
  user: User | null;

  expiresInMinutes: number | null;

  externalRegistration: ExternalRegistration | null;

  loginStatus: "idle" | "loading" | "succeeded" | "failed";

  loginError: string | null;

  loginErrorDetails: Record<string, string[]>;
}

const initialState: AuthState = {
  user: null,

  expiresInMinutes: null,

  externalRegistration: null,

  loginStatus: "idle",

  loginError: null,

  loginErrorDetails: {},
};

export const login = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  {
    rejectValue: {
      code: string;
      message: string;
      details: Record<string, string[]>;
    };
  }
>("auth/login", async (request, { rejectWithValue }) => {
  try {
    return await authApi.login(request);
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

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;

      state.expiresInMinutes = null;

      state.externalRegistration = null;

      state.loginStatus = "idle";

      state.loginError = null;

      state.loginErrorDetails = {};
    },

    resetLoginStatus: (state) => {
      state.loginStatus = "idle";

      state.loginError = null;

      state.loginErrorDetails = {};
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";

        state.loginError = null;

        state.loginErrorDetails = {};
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";

        state.loginError = null;

        state.loginErrorDetails = {};

        const result = action.payload;

        /*
         * Google credential was valid, but this external
         * identity does not have an application user yet.
         *
         * The backend gives us a short-lived registration token
         * and the external identity information required for the
         * next registration step.
         */
        if (result.requiresRegistration) {
          state.externalRegistration = result.externalRegistration;

          state.user = null;

          state.expiresInMinutes = null;

          return;
        }

        /*
         * Normal login.
         *
         * The backend has already authenticated the user and
         * returned our application's access token and user.
         */
        state.externalRegistration = null;

        state.user = result.user;

        state.expiresInMinutes = result.expiresInMinutes;
      })

      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";

        state.loginError =
          action.payload?.message ?? action.error.message ?? "Failed to login";

        state.loginErrorDetails = action.payload?.details ?? {};
      });
  },
});

export const { logout, resetLoginStatus } = authSlice.actions;

export default authSlice.reducer;
