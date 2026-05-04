import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-base-100">
      <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
      <h2 className="text-2xl font-bold text-base-content tracking-tight animate-pulse">
        Loading...
      </h2>
      <p className="text-base-content/60 mt-2">
        Preparing your premium experience
      </p>
    </div>
  );
}
