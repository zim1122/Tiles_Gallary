import { getAuth } from "@/lib/auth";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, XCircle, Tag, Ruler, Sparkles, Box, User } from "lucide-react";
import { getTileById } from "@/lib/tiles";

export default async function TileDetailsPage({ params }) {
  const { id } = await params;

  // Protect route
  const session = await getAuth().api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect(`/login?redirect=/tile/${id}`);
  }

  const tile = await getTileById(id);

  if (!tile) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-base-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back button */}
        <Link href="/all-tiles" className="inline-flex items-center text-sm font-medium text-base-content/60 hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Gallery
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left: High-Res Image Preview */}
          <div className="relative h-[50vh] lg:h-[70vh] w-full rounded-3xl overflow-hidden shadow-2xl border border-base-200">
            <Image 
              src={tile.image}
              alt={tile.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {tile.featured && (
              <div className="absolute top-6 left-6 badge badge-primary badge-lg shadow-lg backdrop-blur-md bg-primary/90 gap-1 p-4">
                <Sparkles className="w-4 h-4" /> Featured
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="badge badge-outline border-base-300 text-base-content/70 uppercase tracking-widest text-xs py-3 px-4">
                  {tile.category}
                </span>
                {tile.inStock ? (
                  <span className="flex items-center text-sm font-medium text-success">
                    <CheckCircle2 className="w-4 h-4 mr-1" /> In Stock
                  </span>
                ) : (
                  <span className="flex items-center text-sm font-medium text-error">
                    <XCircle className="w-4 h-4 mr-1" /> Out of Stock
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-base-content tracking-tight mb-4">
                {tile.title}
              </h1>
              <p className="text-3xl font-light text-primary">
                ${tile.price.toFixed(2)} <span className="text-sm text-base-content/50 font-normal">/ sq.m</span>
              </p>
            </div>

            <div className="prose prose-base-content">
              <h3 className="text-lg font-semibold mb-2">Style Description</h3>
              <p className="text-base-content/70 leading-relaxed text-lg">
                {tile.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 py-6 border-y border-base-200">
              <div className="flex flex-col">
                <span className="flex items-center text-sm text-base-content/50 mb-1">
                  <Ruler className="w-4 h-4 mr-2" /> Dimensions
                </span>
                <span className="font-medium text-base-content">{tile.dimensions}</span>
              </div>
              <div className="flex flex-col">
                <span className="flex items-center text-sm text-base-content/50 mb-1">
                  <Box className="w-4 h-4 mr-2" /> Material
                </span>
                <span className="font-medium text-base-content">{tile.material}</span>
              </div>
              <div className="flex flex-col">
                <span className="flex items-center text-sm text-base-content/50 mb-1">
                  <User className="w-4 h-4 mr-2" /> Creator
                </span>
                <span className="font-medium text-base-content">{tile.creator}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-base-content/50 uppercase tracking-wider mb-3 flex items-center">
                <Tag className="w-4 h-4 mr-2" /> Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tile.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 bg-base-200 rounded-full text-sm font-medium text-base-content/70 hover:bg-primary/10 hover:text-primary cursor-default transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button 
                className="btn btn-primary btn-lg w-full sm:w-auto rounded-full px-12 shadow-lg shadow-primary/30"
                disabled={!tile.inStock}
              >
                {tile.inStock ? "Add to Cart" : "Notify Me When Available"}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
