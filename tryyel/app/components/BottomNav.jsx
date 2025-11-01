"use client";

import Link from "next/link";

export default function BottomNav() {
  const navItems = [
    { name: "Home", icon: "🏠", href: "/" },
    { name: "Shop", icon: "🛍️", href: "/shop" },
    { name: "Fast", icon: "⚡", href: "/fast" },
    { name: "Category", icon: "📂", href: "/category" },
    { name: "Wishlist", icon: "❤️", href: "/wishlist" },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#011219] border-t border-[#022C2B] shadow-md flex justify-around items-center py-2 z-50">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="flex flex-col items-center text-gray-300 hover:text-[#00E5CC] transition-colors"
        >
          <span className="text-xl">{item.icon}</span>
          <span className="text-xs">{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
