"use client";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const categories = [
    { name: "Women", img: "/images/women.jpg", href: "/women" },
    { name: "Men", img: "/images/men.jpg", href: "/men" },
    { name: "Kids", img: "/images/kids.jpg", href: "/kids" },
    { name: "Sale", img: "/images/sale.jpg", href: "/sale" },
  ];

  const products = [
    { id: 1, name: "Classic Cotton Shirt", price: "₹999", img: "/images/product1.jpg" },
    { id: 2, name: "Denim Jacket", price: "₹1,499", img: "/images/product2.jpg" },
    { id: 3, name: "Linen Pants", price: "₹1,299", img: "/images/product3.jpg" },
    { id: 4, name: "Casual Dress", price: "₹1,199", img: "/images/product4.jpg" },
  ];

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex items-center justify-center bg-gray-100">
        <Image
          src="/images/hero-banner.jpg"
          alt="Hero Banner"
          fill
          priority
          className="object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Discover Your Style</h1>
          <p className="text-sm md:text-lg mb-6">Trendy. Sustainable. Affordable.</p>
          <Link
            href="/women"
            className="bg-white text-black px-5 py-2 rounded-full font-medium hover:bg-gray-200 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link key={cat.name} href={cat.href} className="group relative rounded-lg overflow-hidden">
              <Image
                src={cat.img}
                alt={cat.name}
                width={300}
                height={300}
                className="w-full h-60 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-white text-lg font-semibold">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="border rounded-lg p-3 hover:shadow-lg transition cursor-pointer"
            >
              <Image
                src={p.img}
                alt={p.name}
                width={300}
                height={300}
                className="w-full h-64 object-cover rounded-md"
              />
              <h3 className="mt-3 text-gray-800 font-medium text-sm truncate">{p.name}</h3>
              <p className="text-gray-600 text-sm">{p.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 border-t py-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Tryyel — All Rights Reserved.
      </footer>
    </main>
  );
}
