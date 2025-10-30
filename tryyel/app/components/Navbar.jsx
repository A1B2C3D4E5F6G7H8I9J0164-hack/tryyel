"use client";
import { useState } from "react";
import Link from "next/link";
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
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 border-b">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Hamburger */}
        <button
          className="text-gray-800"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Center Logo */}
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Tryyel
        </Link>

        {/* Right Icons */}
        <div className="flex items-center space-x-3">
          <Heart className="w-5 h-5 text-gray-700 hover:text-black" />
          <ShoppingBag className="w-5 h-5 text-gray-700 hover:text-black" />
          <User className="w-5 h-5 text-gray-700 hover:text-black" />
        </div>
      </div>

      {/* Dropdown Menu */}
      {open && (
        <nav className="bg-white border-t">
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
