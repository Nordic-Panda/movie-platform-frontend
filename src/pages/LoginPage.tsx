export default function LoginPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto flex max-w-md flex-col items-center px-6 py-20">
        <div className="w-full">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>

            <p className="mt-2 text-sm text-zinc-400">
              Sign in to your MovieService account.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200"
            >
              Continue with Google
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
