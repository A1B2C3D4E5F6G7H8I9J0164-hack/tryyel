"use client";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const categories = [
    { name: "New Arrivals", href: "/new-arrivals" },
    { name: "Tops", href: "/tops" },
    { name: "Co-ords", href: "/coords" },
    { name: "Indofusion", href: "/indofusion" },
    { name: "Winterwear", href: "/winterwear" },
    { name: "Sale", href: "/sale" },
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Classic White Shirt",
      price: "₹1,299",
      originalPrice: "₹1,599",
      discount: "19% OFF",
      img: "/images/product1.jpg",
    },
    {
      id: 2,
      name: "Denim Jacket",
      price: "₹1,799",
      originalPrice: "₹2,199",
      discount: "18% OFF",
      img: "/images/product2.jpg",
    },
    {
      id: 3,
      name: "Linen Co-ord Set",
      price: "₹2,499",
      originalPrice: "₹2,999",
      discount: "17% OFF",
      img: "/images/product3.jpg",
    },
    {
      id: 4,
      name: "Casual Dress",
      price: "₹1,599",
      originalPrice: "₹1,899",
      discount: "16% OFF",
      img: "/images/product4.jpg",
    },
    {
      id: 5,
      name: "Winter Sweater",
      price: "₹1,899",
      originalPrice: "₹2,299",
      discount: "17% OFF",
      img: "/images/product1.jpg",
    },
    {
      id: 6,
      name: "Indofusion Kurta",
      price: "₹1,399",
      originalPrice: "₹1,699",
      discount: "18% OFF",
      img: "/images/product2.jpg",
    },
  ];

  const newArrivals = [
    {
      id: 7,
      name: "Floral Print Top",
      price: "₹999",
      img: "/images/product3.jpg",
    },
    {
      id: 8,
      name: "Slim Fit Jeans",
      price: "₹1,499",
      img: "/images/product4.jpg",
    },
    {
      id: 9,
      name: "Casual Blazer",
      price: "₹2,299",
      img: "/images/product1.jpg",
    },
    {
      id: 10,
      name: "Summer Dress",
      price: "₹1,199",
      img: "/images/product2.jpg",
    },
  ];

  return (
    <main className="bg-white">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[60vh] bg-gray-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="relative z-10 text-center px-4 max-w-md mx-auto">
          <h1 className="text-3xl md:text-4xl font-light mb-4 text-gray-900">
            New Collection
          </h1>
          <p className="text-sm md:text-base text-gray-600 mb-6">
            Discover the latest trends in fashion
          </p>
          <Link
            href="/new-arrivals"
            className="inline-block bg-gray-900 text-white px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 px-4 bg-white">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-light text-gray-900 mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-center py-6 border border-gray-200 hover:border-gray-900 transition-colors"
              >
                <p className="text-sm text-gray-900 font-medium">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full py-12 px-4 bg-gray-50">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-light text-gray-900">Featured</h2>
            <Link
              href="/featured"
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="bg-white group"
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden mb-3">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1">
                      {product.discount}
                    </div>
                  )}
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="w-full py-12 px-4 bg-white">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-light text-gray-900">New Arrivals</h2>
            <Link
              href="/new-arrivals"
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {newArrivals.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="bg-white group"
              >
                <div className="relative aspect-square bg-gray-100 overflow-hidden mb-3">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-900">{product.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-12 px-4 bg-gray-50">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xl font-light text-gray-900 mb-2">
            Stay Updated
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Subscribe to get updates on new arrivals and exclusive offers
          </p>
          <form className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 text-sm"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 py-8 px-4">
        <div className="max-w-md mx-auto">
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/about" className="hover:text-gray-900">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-900">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-gray-900">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-gray-900">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-4">
                Customer Care
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/faq" className="hover:text-gray-900">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/size-guide" className="hover:text-gray-900">
                    Size Guide
                  </Link>
                </li>
                <li>
                  <Link href="/track-order" className="hover:text-gray-900">
                    Track Order
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:text-gray-900">
                    Help
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Tryyel. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}