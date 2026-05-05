"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import { Loader2, Mail, Lock, User, Image as ImageIcon, AlertCircle, CheckCircle2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

function getFriendlyAuthError(error) {
  const message = error?.message || error?.statusText || "Registration failed. Please try again.";
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

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    
    try {
      const result = await signUp.email({
        email,
        password,
        name,
        image: photoUrl || undefined,
      });

      if (result?.error) {
        setError(getFriendlyAuthError(result.error));
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.replace("/login");
      }, 1200);
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
        callbackURL: "/",
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
            Registration
          </h2>
          <p className="mt-3 text-sm text-base-content/60">
            Join us to discover premium tiles
          </p>
        </div>

        {error && (
          <div className="alert alert-error shadow-sm rounded-xl text-sm py-3">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success shadow-sm rounded-xl text-sm py-3 text-success-content">
            <CheckCircle2 className="w-5 h-5" />
            <span>Registration successful! Redirecting to login...</span>
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-medium text-base-content/80">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  required
                  className="input input-bordered w-full pl-10 bg-base-50 focus:border-primary transition-colors"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-medium text-base-content/80">Email Address</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  className="input input-bordered w-full pl-10 bg-base-50 focus:border-primary transition-colors"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-medium text-base-content/80">Photo URL (Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <input
                  type="url"
                  className="input input-bordered w-full pl-10 bg-base-50 focus:border-primary transition-colors"
                  placeholder="https://example.com/photo.jpg"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label py-1">
                <span className="label-text font-medium text-base-content/80">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  className="input input-bordered w-full pl-10 bg-base-50 focus:border-primary transition-colors"
                  placeholder="••••••••"
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading || googleLoading || success}
              className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/20"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-base-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-base-100 text-base-content/50">Or register with</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              type="button"
              disabled={loading || googleLoading || success}
              className="btn btn-outline w-full rounded-xl hover:bg-base-200 hover:text-base-content border-base-300 font-medium"
            >
              {googleLoading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <FcGoogle className="w-6 h-6 mr-2" />
              )}
              {googleLoading ? "Redirecting…" : "Sign up with Google"}
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-base-content/70 mt-8">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:text-primary-focus transition-colors">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
