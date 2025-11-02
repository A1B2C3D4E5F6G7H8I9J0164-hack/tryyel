"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Package, History } from "lucide-react";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const testOrders = [
      {
        id: "ORD123456",
        date: "Oct 31, 2025",
        status: "Delivered",
        items: 2,
        total: "₹1,499",
      },
      {
        id: "ORD123457",
        date: "Nov 1, 2025",
        status: "Shipped",
        items: 1,
        total: "₹799",
      },
    ];
    setOrders(testOrders);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center z-20">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">My Orders</h1>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-4">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500">
            <Package className="w-12 h-12 mb-3" />
            <p>No orders yet</p>
          </div>
        ) : (
          <>
            {orders.map((order) => (
              <div
                key={order.id}
                onClick={() => router.push(`/orders/${order.id}`)}
                className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-semibold text-gray-900">{order.id}</h2>
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{order.date}</p>
                <div className="flex justify-between items-center mt-3 border-t pt-2 text-sm text-gray-700">
                  <span>{order.items} items</span>
                  <span className="font-semibold">{order.total}</span>
                </div>
                <p className="mt-3 text-sm font-medium text-blue-600 text-center">
                  View Details →
                </p>
              </div>
            ))}

            {/* Past Orders Button at the bottom */}
            <button
              onClick={() => router.push("/orders/past")}
              className="w-full flex items-center justify-center gap-2 mt-6 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition"
            >
              <History className="w-5 h-5" />
              View Past Orders
            </button>
          </>
        )}
      </div>
    </main>
  );
}
