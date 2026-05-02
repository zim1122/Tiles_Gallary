import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { getFeaturedTiles } from "@/lib/tiles";
import TileShowcaseSlider from "@/components/TileShowcaseSlider";

export default async function Home() {
  const featuredTiles = await getFeaturedTiles();

  return (
    <div className="flex flex-col w-full">
      
      {/* Banner Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0 bg-base-300">
          <Image 
            src="https://images.unsplash.com/photo-1600607688969-a5bfcd64bd40?auto=format&fit=crop&q=80&w=2000"
            alt="Beautiful modern tiled bathroom"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-base-100/90 via-base-100/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 flex flex-col justify-center">
          <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">New 2026 Collection</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-base-content leading-[1.1]">
              Discover Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                Perfect Aesthetic
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-base-content/80 max-w-xl leading-relaxed">
              Elevate your spaces with our premium selection of curated tiles. From classic ceramics to modern geometric patterns, find the perfect foundation for your design vision.
            </p>
            
            <div className="pt-4 flex gap-4">
              <Link href="/all-tiles" className="btn btn-primary btn-lg rounded-full shadow-xl shadow-primary/30 group">
                Browse Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <div className="bg-primary text-primary-content overflow-hidden border-y border-primary/20 py-3 relative z-20">
        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-12 px-6 text-sm md:text-base font-medium tracking-wide">
            <span>✨ New Arrivals: Oceanic Blue Ceramic</span>
            <span>✨ Weekly Feature: Modern Geometric Patterns</span>
            <span>✨ Join the Community to unlock exclusive discounts</span>
            <span>✨ Free Shipping on orders over $500</span>
            <span>✨ Premium Quality Guaranteed</span>
            <span>✨ New Arrivals: Oceanic Blue Ceramic</span>
            <span>✨ Weekly Feature: Modern Geometric Patterns</span>
            <span>✨ Join the Community to unlock exclusive discounts</span>
            <span>✨ Free Shipping on orders over $500</span>
            <span>✨ Premium Quality Guaranteed</span>
          </div>
        </div>
      </div>

      {/* Featured Tiles Section */}
      <section className="py-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-base-content">Featured Collections</h2>
            <p className="text-base-content/60 max-w-2xl mx-auto">Handpicked favorites that are currently trending in the world of interior design.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredTiles.map((tile) => (
              <div key={tile.id} className="card bg-base-100 shadow-xl border border-base-200 group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                <figure className="relative h-64 w-full overflow-hidden">
                  <Image 
                    src={tile.image} 
                    alt={tile.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {tile.inStock ? (
                    <div className="absolute top-4 right-4 badge badge-success badge-sm shadow-md text-success-content">In Stock</div>
                  ) : (
                    <div className="absolute top-4 right-4 badge badge-error badge-sm shadow-md text-error-content">Out of Stock</div>
                  )}
                </figure>
                <div className="card-body p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="card-title text-lg leading-tight line-clamp-1">{tile.title}</h3>
                  </div>
                  <p className="text-sm text-base-content/60 line-clamp-2 flex-grow mb-4">{tile.description}</p>
                  
                  <div className="flex justify-between items-end mt-auto pt-4 border-t border-base-200">
                    <div className="flex flex-col">
                      <span className="text-xs text-base-content/50 uppercase tracking-wider">{tile.category}</span>
                      <span className="text-lg font-bold text-primary">${tile.price.toFixed(2)}</span>
                    </div>
                    <div className="card-actions">
                      <Link href={`/tile/${tile.id}`} className="btn btn-sm btn-outline rounded-full hover:bg-primary hover:text-primary-content hover:border-primary">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/all-tiles" className="btn btn-outline btn-wide rounded-full">
              View All Tiles
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-base-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold">Design Inspiration</h2>
            <p className="text-base-content/60 mt-2">
              Swipe curated picks built with SwiperJS for your next interior idea.
            </p>
          </div>
          <TileShowcaseSlider tiles={featuredTiles} />
        </div>
      </section>
    </div>
  );
}
