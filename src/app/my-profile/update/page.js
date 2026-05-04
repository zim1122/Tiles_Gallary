"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, updateUser } from "@/lib/auth-client";
import { Loader2, User, Image as ImageIcon, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login?redirect=/my-profile/update");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const safeName = name || session.user.name || "";
      const safeImage = image || session.user.image || undefined;
      await updateUser({
        name: safeName,
        image: safeImage,
      });
      setSuccess(true);
      setTimeout(() => {
        router.push("/my-profile");
        router.refresh();
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-base-200/30 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full">
        
        <Link href="/my-profile" className="inline-flex items-center text-sm font-medium text-base-content/60 hover:text-primary transition-colors mb-6 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Profile
        </Link>

        <div className="bg-base-100 p-8 sm:p-10 rounded-3xl shadow-2xl border border-base-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-base-content tracking-tight">Update Information</h1>
            <p className="mt-2 text-sm text-base-content/60">Change your profile name and photo URL</p>
          </div>

          {error && (
            <div className="alert alert-error shadow-sm rounded-xl text-sm py-3 mb-6">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="alert alert-success shadow-sm rounded-xl text-sm py-3 mb-6 text-success-content">
              <CheckCircle2 className="w-5 h-5" />
              <span>Profile updated successfully! Redirecting...</span>
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="form-control w-full">
              <label className="label">
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
                  placeholder="Your Full Name"
                  value={name || session.user.name || ""}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-medium text-base-content/80">Photo URL</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <input
                  type="url"
                  className="input input-bordered w-full pl-10 bg-base-50 focus:border-primary transition-colors"
                  placeholder="https://example.com/photo.jpg"
                  value={image || session.user.image || ""}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <label className="label">
                <span className="label-text-alt text-base-content/50">Must be a valid image URL</span>
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading || success}
                className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/20"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Update Information"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
