import { useState } from "react";
import { login } from "../features/auth/authApi";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleLogin() {
    try {
      setIsLoading(true);
      setError(null);

      // For 3rd party provider credential
      const credential = "";

      const result = await login({
        provider: "Google",
        credential,
      });

      console.log(result);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to sign in with Google",
      );
    } finally {
      setIsLoading(false);
    }
  }

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
            {error && (
              <div className="mb-4 rounded-lg border border-red-900 bg-red-950/40 p-4">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-3 text-sm font-medium text-zinc-900 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Connecting..." : "Continue with Google"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
