"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingBag, User, X, Search } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navLinks = [
    { name: "Women", href: "/women" },
    { name: "Men", href: "/men" },
    { name: "Kids", href: "/kids" },
    { name: "Sale", href: "/sale" },
  ];

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#011219] shadow-md z-50">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 h-14">

        {/* Center Logo */}
        <Link href="/" className="flex items-center justify-center">
          <Image
            src="/tryyel_logo1.png"
            alt="Tryyel Logo"
            width={140}
            height={100}
            priority
          />
        </Link>

        {/* Right Side: Icons */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button
            onClick={() => setShowSearch(true)}
            className="text-white hover:opacity-80"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart */}
          <Link href="/cart">
            <ShoppingBag className="w-5 h-5 text-white hover:opacity-80" />
          </Link>
          <Link href="/account">
            <User className="w-5 h-5 text-white hover:opacity-80" />
          </Link>
        </div>
      </div>

      {/* Search Overlay */}
      {showSearch && (
        <div className="absolute inset-0 bg-[#011219]/95 flex items-center px-4">
          <div className="flex items-center w-full space-x-2">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 text-sm"
              autoFocus
            />
            <button
              onClick={() => setShowSearch(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Dropdown Menu */}
      {open && (
        <nav className="bg-white border-t animate-slide-down">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-4 py-3 text-gray-800 hover:bg-gray-50 border-b text-sm"
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
