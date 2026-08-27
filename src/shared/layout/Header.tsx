import { Link } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { Logo } from "../brand/Logo";

export function Header() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <nav className="flex items-center gap-8">
          <Link
            to="/"
            className="text-sm font-medium text-white transition hover:text-yellow-500"
          >
            Movies
          </Link>

          {user ? (
            <>
              <span className="text-sm text-zinc-300">{user.username}</span>

              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium text-zinc-400 transition hover:text-yellow-500"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm font-medium text-zinc-400 transition hover:text-yellow-500"
            >
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
