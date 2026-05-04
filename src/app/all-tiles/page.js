"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";

export default function AllTilesPage() {
  const [tilesData, setTilesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchTiles = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = searchQuery 
          ? `/api/tiles?search=${encodeURIComponent(searchQuery)}`
          : "/api/tiles";
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch tiles");
        const data = await res.json();
        setTilesData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search
    const timer = setTimeout(() => {
      fetchTiles();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-base-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="flex flex-col items-center mb-12 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-base-content">
              The Gallery
            </h1>
            <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
              Explore our complete collection of premium tiles. Find the perfect match for your next project.
            </p>
          </div>
          
          <div className="w-full max-w-2xl relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-base-content/50 group-focus-within:text-primary transition-colors">
              <Search className="h-6 w-6" />
            </div>
            <input
              type="text"
              className="input input-lg w-full pl-12 pr-4 bg-base-100 border-2 border-base-300 focus:border-primary shadow-lg rounded-2xl transition-all"
              placeholder="Search tiles by title, category, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Content Area */}
        {error ? (
          <div className="alert alert-error max-w-2xl mx-auto shadow-lg">
            <span>{error}</span>
            <button className="btn btn-sm" onClick={() => setSearchQuery("")}>Retry</button>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-base-content/60 font-medium animate-pulse">Loading amazing tiles...</p>
          </div>
        ) : tilesData.length === 0 ? (
          <div className="text-center py-24 bg-base-200 rounded-3xl border border-base-300">
            <h3 className="text-2xl font-bold text-base-content mb-2">No tiles found</h3>
            <p className="text-base-content/60 mb-6">
              We couldn&apos;t find any tiles matching &quot;{searchQuery}&quot;
            </p>
            <button className="btn btn-primary rounded-full" onClick={() => setSearchQuery("")}>
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {tilesData.map((tile) => (
              <div key={tile.id} className="card bg-base-100 shadow-xl border border-base-200 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <figure className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={tile.image} 
                    alt={tile.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-primary shadow-md backdrop-blur-md bg-primary/90">{tile.category}</span>
                  </div>
                </figure>
                <div className="card-body p-6">
                  <h3 className="card-title text-lg leading-tight line-clamp-1">{tile.title}</h3>
                  <div className="flex flex-wrap gap-1 mb-4 mt-2">
                    {tile.tags.map(tag => (
                      <span key={tag} className="badge badge-sm badge-outline text-xs border-base-300 text-base-content/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-end mt-auto pt-4 border-t border-base-200">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-base-content">${tile.price.toFixed(2)}</span>
                    </div>
                    <div className="card-actions">
                      <Link href={`/tile/${tile.id}`} className="btn btn-sm btn-primary rounded-full shadow-md shadow-primary/20">
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
