import { useCallback } from "react";
import { GoogleLogin } from "@react-oauth/google";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { login, resetLoginStatus } from "../features/auth/authSlice";
import { LoadingSpinner } from "../shared/components/LoadingSpinner";

export default function LoginPage() {
  const dispatch = useAppDispatch();

  const loginStatus = useAppSelector((state) => state.auth.loginStatus);
  const loginError = useAppSelector((state) => state.auth.loginError);

  const isLoading = loginStatus === "loading";

  const handleGoogleSuccess = useCallback(
    async (credential: string) => {
      try {
        dispatch(resetLoginStatus());

        const result = await dispatch(
          login({
            provider: "Google",
            credential,
          }),
        ).unwrap();

        console.log("Backend response:", result);

        if (result.requiresRegistration) {
          console.log("External registration:", result.externalRegistration);

          return;
        }

        console.log("User:", result.user);
        //console.log("Access token:", result.accessToken);
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
    [dispatch],
  );

  // Note that here we are facing two different kind of errors
  // Google SDK error, and our BE error, idealy, split them up
  function handleGoogleError() {
    dispatch(resetLoginStatus());
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
            {loginError && (
              <div className="mb-6 rounded-lg border border-red-900 bg-red-950/40 p-4">
                <p className="text-sm text-red-400">{loginError}</p>
              </div>
            )}

            <div className="flex justify-center">
              {isLoading ? (
                <LoadingSpinner size="md" />
              ) : (
                <GoogleLogin
                  onSuccess={(response) => {
                    if (!response.credential) {
                      dispatch(resetLoginStatus());
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
