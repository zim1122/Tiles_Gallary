import Link from "next/link";
import { Grid3X3, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-primary rounded-xl group-hover:scale-105 transition-transform">
                <Grid3X3 className="w-6 h-6 text-primary-content" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Tiles Gallery
              </span>
            </Link>
            <p className="text-base-content/70 max-w-xs leading-relaxed">
              Discover premium quality tiles for every space. Transform your home with our exclusive collection of aesthetic and durable designs.
            </p>
            <div className="flex gap-4">
              <a href="#" className="btn btn-circle btn-sm btn-ghost bg-base-100 hover:bg-primary hover:text-primary-content transition-colors">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="#" className="btn btn-circle btn-sm btn-ghost bg-base-100 hover:bg-primary hover:text-primary-content transition-colors">
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a href="#" className="btn btn-circle btn-sm btn-ghost bg-base-100 hover:bg-primary hover:text-primary-content transition-colors">
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-base-content relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-base-content/70 hover:text-primary transition-colors hover:translate-x-1 inline-block">Home</Link>
              </li>
              <li>
                <Link href="/all-tiles" className="text-base-content/70 hover:text-primary transition-colors hover:translate-x-1 inline-block">All Tiles Gallery</Link>
              </li>
              <li>
                <Link href="/login" className="text-base-content/70 hover:text-primary transition-colors hover:translate-x-1 inline-block">Login</Link>
              </li>
              <li>
                <Link href="/register" className="text-base-content/70 hover:text-primary transition-colors hover:translate-x-1 inline-block">Create Account</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-6 text-base-content relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-base-content/70">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>123 Gallery Street,<br />Design District, NY 10001</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/70">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3 text-base-content/70">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span>hello@tilesgallery.com</span>
                </li>
              </ul>
              
              <div className="space-y-3">
                <p className="text-sm font-medium text-base-content/80">Subscribe to our newsletter</p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="input input-bordered w-full bg-base-100 focus:border-primary transition-colors" 
                  />
                  <button type="button" className="btn btn-primary shadow-lg shadow-primary/20">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-base-300 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-base-content/60">
            &copy; {new Date().getFullYear()} Tiles Gallery. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-base-content/60">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
