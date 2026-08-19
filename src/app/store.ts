import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movies/movieSlice";
import genreReducer from "../features/genres/genreSlice";
import languageReducer from "../features/languages/languageSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    genres: genreReducer,
    languages: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
