import { useEffect } from "react";
import { getMovies } from "../services/movieApi";

export default function HomePage() {
  useEffect(() => {
    getMovies()
      .then((movies) => {
        console.log(movies);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <h1 className="text-2xl font-bold text-yellow-400">Movie Platform</h1>

          <nav>
            <a href="/" className="text-sm text-zinc-300 hover:text-white">
              Movies
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <h2 className="mb-8 text-4xl font-bold">Movies</h2>

        <p className="text-zinc-400">Browse our movie collection.</p>
      </main>
    </div>
  );
}
