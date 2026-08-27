import { useCallback, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";

import { login } from "../features/auth/authApi";
import { LoadingSpinner } from "../shared/components/LoadingSpinner";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSuccess = useCallback(async (credential: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await login({
        provider: "Google",
        credential,
      });

      console.log("Backend response:", result);

      if (result.requiresRegistration) {
        console.log("External registration:", result.externalRegistration);

        return;
      }

      console.log("User:", result.user);
      console.log("Access token:", result.accessToken);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to sign in with Google",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  function handleGoogleError() {
    setError("Google sign-in failed.");
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
              <div className="mb-6 rounded-lg border border-red-900 bg-red-950/40 p-4">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <div className="flex justify-center">
              {isLoading ? (
                <LoadingSpinner size="md" />
              ) : (
                <GoogleLogin
                  onSuccess={(response) => {
                    if (!response.credential) {
                      setError("Google did not return a credential.");
                      return;
                    }

                    handleGoogleSuccess(response.credential);
                  }}
                  onError={handleGoogleError}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
