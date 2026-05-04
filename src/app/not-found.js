import Link from "next/link";
import { SearchX, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center bg-base-100 px-4">
      <div className="text-center space-y-6 max-w-lg">
        <div className="flex justify-center mb-8">
          <div className="p-6 bg-base-200 rounded-full animate-bounce">
            <SearchX className="w-20 h-20 text-primary" />
          </div>
        </div>
        
        <h1 className="text-6xl font-extrabold text-base-content tracking-tight">404</h1>
        <h2 className="text-2xl font-bold text-base-content">Page Not Found</h2>
        
        <p className="text-base-content/60 text-lg">
          Oops! The page you are looking for doesn&apos;t exist, has been moved, or is temporarily unavailable.
        </p>
        
        <div className="pt-8">
          <Link href="/" className="btn btn-primary btn-lg rounded-full shadow-xl shadow-primary/30 group">
            <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
