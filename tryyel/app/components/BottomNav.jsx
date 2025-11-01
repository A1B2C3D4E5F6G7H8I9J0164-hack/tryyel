"use client";

import Link from "next/link";
import { Home, ShoppingBag, Zap, Folder, User } from "lucide-react";

export default function BottomNav() {
  const navItems = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Shop", icon: ShoppingBag, href: "/shop" },
    { name: "Fast", icon: Zap, href: "/fast" },
    { name: "Category", icon: Folder, href: "/category" },
    { name: "Profile", icon: User, href: "/Account" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 shadow-sm flex justify-around items-center py-2 z-50">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <Link
            key={item.name}
            href={item.href}
            className="flex flex-col items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <IconComponent className="w-5 h-5" />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
