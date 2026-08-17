import { Logo } from "../brand/Logo";

export function Header() {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />

        <nav className="flex items-center gap-8">
          <a
            href="/"
            className="text-sm font-medium text-white transition hover:text-yellow-500"
          >
            Movies
          </a>

          <a
            href="/genres"
            className="text-sm font-medium text-zinc-400 transition hover:text-yellow-500"
          >
            Genres
          </a>
        </nav>
      </div>
    </header>
  );
}
