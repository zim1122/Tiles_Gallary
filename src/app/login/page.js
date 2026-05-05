"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { Loader2, Mail, Lock, AlertCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

function safeInternalPath(path) {
  if (!path || typeof path !== "string") return "/";
  if (!path.startsWith("/") || path.startsWith("//")) return "/";
  return path;
}

function getFriendlyAuthError(error) {
  const message = error?.message || error?.statusText || "Failed to login. Please check your credentials.";
  if (message.includes("Failed to fetch") || message.includes("NetworkError")) {
    return "Cannot reach auth server. In production, set BETTER_AUTH_URL to your deployed domain and redeploy.";
  }
  if (
    message.includes("Internal Server Error") ||
    message.includes("ECONNREFUSED") ||
    message.includes("MongoServerSelectionError") ||
    message.includes("MongoTopologyClosedError") ||
    message.includes("SERVER_ERROR")
  ) {
    return "Database connection failed. Set MONGODB_URI or MONGO_DB_URI in .env.local (Atlas or local MongoDB).";
  }
  if (message.includes("Provider not found")) {
    return "Google sign-in is not set up yet. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env.local (Google Cloud OAuth web client).";
  }
  return message;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = safeInternalPath(searchParams.get("redirect"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: redirectPath,
      });

      if (result?.error) {
        setError(getFriendlyAuthError(result.error));
        return;
      }

      router.replace(redirectPath);
      router.refresh();
    } catch (err) {
      setError(getFriendlyAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const result = await signIn.social({
        provider: "google",
        callbackURL: redirectPath,
      });
      if (result?.error) {
        setError(getFriendlyAuthError(result.error));
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-base-200/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-base-100 p-8 sm:p-10 rounded-3xl shadow-2xl border border-base-300">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-base-content tracking-tight">
            Login
          </h2>
          <p className="mt-3 text-sm text-base-content/60">
            Please sign in to your account
          </p>
        </div>

        {error && (
          <div className="alert alert-error shadow-sm rounded-xl text-sm py-3">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">Email Address</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  className="input input-bordered w-full pl-10 bg-base-50 focus:border-primary transition-colors"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  className="input input-bordered w-full pl-10 bg-base-50 focus:border-primary transition-colors"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/20"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-base-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-base-100 text-base-content/50">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              type="button"
              disabled={loading || googleLoading}
              className="btn btn-outline w-full rounded-xl hover:bg-base-200 hover:text-base-content border-base-300 font-medium"
            >
              {googleLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <FcGoogle className="w-6 h-6 mr-2" />
              )}
              {googleLoading ? "Redirecting…" : "Sign in with Google"}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-base-content/70 mt-8">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-primary hover:text-primary-focus transition-colors">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
