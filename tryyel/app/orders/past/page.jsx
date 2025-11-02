"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Package } from "lucide-react";

export default function PastOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Example data for testing
    const pastOrders = [
      {
        id: "ORD123456", // ✅ Match existing testOrders ID in your [id]/page.js
        date: "Sep 15, 2025",
        status: "Delivered",
        total: "₹2,299",
        items: 2,
      },
      {
        id: "ORD123458", // ✅ This one is Returned in your testOrders data
        date: "Aug 22, 2025",
        status: "Returned",
        total: "₹999",
        items: 1,
      },
    ];
    setOrders(pastOrders);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center z-20">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Past Orders</h1>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500">
            <Package className="w-12 h-12 mb-3" />
            <p>No past orders</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              onClick={() => router.push(`/orders/${order.id}`)} // ✅ Fixed route
              className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200 hover:shadow-md transition cursor-pointer"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-gray-900">{order.id}</h2>
                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Returned"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Date */}
              <p className="text-sm text-gray-600">{order.date}</p>

              {/* Footer */}
              <div className="flex justify-between items-center mt-3 border-t pt-2 text-sm text-gray-700">
                <span>
                  {order.items} {order.items > 1 ? "items" : "item"}
                </span>
                <span className="font-semibold">{order.total}</span>
              </div>

              {/* View Details */}
              <p className="mt-3 text-sm font-medium text-blue-600 text-center">
                View Details →
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
