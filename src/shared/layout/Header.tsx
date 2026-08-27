import { Link } from "react-router-dom";
import { Logo } from "../brand/Logo";

export function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <nav className="flex items-center gap-8">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-sm font-medium text-white transition hover:text-yellow-500"
            >
              Movies
            </Link>

            <Link
              to="/about"
              className="text-sm font-medium text-zinc-400 transition hover:text-yellow-500"
            >
              About Us
            </Link>
          </div>

          <Link
            to="/login"
            className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition hover:bg-yellow-400"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
