"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Grid3X3, Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Tiles", path: "/all-tiles" },
    { name: "My Profile", path: "/my-profile" },
  ];

  const isActive = (path) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-md border-b border-base-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-primary rounded-xl group-hover:scale-105 transition-transform">
                <Grid3X3 className="w-6 h-6 text-primary-content" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                Tiles Gallery
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-base-200 text-base-content/70 hover:text-base-content"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isPending ? (
              <div className="skeleton w-24 h-10 rounded-full"></div>
            ) : session ? (
              <div className="flex items-center gap-4">
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary/20">
                    <div className="w-10 rounded-full">
                      {session.user.image ? (
                        <Image alt={session.user.name} src={session.user.image} width={40} height={40} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary text-primary-content font-bold">
                          {session.user.name?.charAt(0) || "U"}
                        </div>
                      )}
                    </div>
                  </div>
                  <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow-lg menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200">
                    <li className="menu-title px-4 py-2">
                      <span className="font-semibold text-base-content">{session.user.name}</span>
                      <span className="text-xs text-base-content/60 block truncate">{session.user.email}</span>
                    </li>
                    <div className="divider my-0"></div>
                    <li>
                      <Link href="/my-profile" className="py-3">
                        <User className="w-4 h-4" />
                        Profile Settings
                      </Link>
                    </li>
                    <li>
                      <button onClick={() => signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/login" } } })} className="py-3 text-error">
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <Link href="/login" className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow">
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-base-content hover:bg-base-200 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-base-100 border-b border-base-200 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium ${
                  isActive(link.path)
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-base-200 text-base-content/70"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="divider"></div>
            
            {isPending ? (
              <div className="skeleton w-full h-12 rounded-xl"></div>
            ) : session ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="avatar">
                    <div className="w-10 rounded-full border border-primary/20">
                      {session.user.image ? (
                        <Image alt={session.user.name} src={session.user.image} width={40} height={40} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-primary text-primary-content font-bold">
                          {session.user.name?.charAt(0) || "U"}
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-base-content">{session.user.name}</div>
                    <div className="text-xs text-base-content/60">{session.user.email}</div>
                  </div>
                </div>
                <button
                  onClick={() => signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/login" } } })}
                  className="btn btn-error btn-outline btn-block rounded-xl"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="btn btn-primary btn-block rounded-xl shadow-lg shadow-primary/30"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
