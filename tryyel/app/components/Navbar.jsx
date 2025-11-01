"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Heart, ShoppingBag, User, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

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
        {/* Hamburger */}
        <button
          className="text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

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

        {/* Right Icons */}
        <div className="flex items-center space-x-3">
          <Link href="/wishlist">
            <Heart className="w-5 h-5 text-white hover:opacity-80" />
          </Link>
          <Link href="/cart">
            <ShoppingBag className="w-5 h-5 text-white hover:opacity-80" />
          </Link>
          <Link href="/account">
            <User className="w-5 h-5 text-white hover:opacity-80" />
          </Link>
        </div>
      </div>

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
