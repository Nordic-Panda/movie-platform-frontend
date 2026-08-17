import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchMovies } from "../features/movies/movieSlice";

export default function HomePage() {
  const dispatch = useAppDispatch();

  const movies = useAppSelector((state) => state.movies.items);

  const status = useAppSelector((state) => state.movies.status);

  const error = useAppSelector((state) => state.movies.error);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  console.log(movies);

  return (
    <div>
      <h1>Movies</h1>

      {status === "loading" && <p>Loading movies...</p>}

      {status === "failed" && <p>Failed to load movies: {error}</p>}

      {status === "succeeded" && <p>{movies.length} movies found.</p>}
    </div>
  );
}
