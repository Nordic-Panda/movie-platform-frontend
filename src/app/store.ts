import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movies/movieSlice";
import genreReducer from "../features/genres/genreSlice";
import languageReducer from "../features/languages/languageSlice";
import currencyReducer from "../features/currencies/currencySlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    genres: genreReducer,
    languages: languageReducer,
    currencies: currencyReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
