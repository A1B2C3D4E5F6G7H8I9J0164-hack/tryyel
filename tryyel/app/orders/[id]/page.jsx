"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Package,
  Truck,
  CheckCircle,
  RotateCcw,
  CreditCard,
} from "lucide-react";

export default function OrderDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const testOrders = [
      {
        id: "ORD123456",
        trackingId: "TRK987654321",
        date: "Oct 31, 2025",
        status: "Delivered",
        paymentMethod: "UPI (Google Pay)",
        items: [
          { name: "Classic Oversized T-Shirt", size: "L", color: "Black", quantity: 1, price: "₹899" },
          { name: "Denim Cargo Pants", size: "32", color: "Blue", quantity: 1, price: "₹1,299" },
        ],
        address: {
          name: "Ujjwal Bharadwaj",
          phone: "+91 9696531218",
          street: "Railway Ganj, Mangali Purwa",
          city: "Hardoi",
          state: "UP",
          pincode: "241001",
        },
      },
      {
        id: "ORD123457",
        trackingId: "TRK987654322",
        date: "Nov 1, 2025",
        status: "Shipped",
        paymentMethod: "Credit Card (HDFC)",
        items: [{ name: "Urban Hoodie", size: "M", color: "Grey", quantity: 1, price: "₹1,299" }],
        address: {
          name: "Ujjwal Bharadwaj",
          phone: "+91 9696531218",
          street: "Badkaunu Sweets, Hardoi",
          city: "Hardoi",
          state: "UP",
          pincode: "241001",
        },
      },
      {
        id: "ORD123458",
        trackingId: "TRK987654323",
        date: "Oct 29, 2025",
        status: "Returned",
        paymentMethod: "Cash on Delivery",
        returnInfo: {
          reason: "Size too small",
          status: "Refund in Process",
        },
        items: [
          { name: "Streetwear Sweatshirt", size: "M", color: "Beige", quantity: 1, price: "₹1,499" },
        ],
        address: {
          name: "Ujjwal Bharadwaj",
          phone: "+91 9696531218",
          street: "Civil Lines",
          city: "Hardoi",
          state: "UP",
          pincode: "241001",
        },
      },
    ];

    const foundOrder = testOrders.find((o) => o.id === id);
    setOrder(foundOrder);
  }, [id]);

  if (!order)
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-600">
        <Package className="w-10 h-10 mb-2" />
        <p>Loading order details...</p>
      </main>
    );

  const steps = ["Ordered", "Shipped", "Out for Delivery", "Delivered"];
  const currentStepIndex = steps.indexOf(order.status);

  // Refund steps
  const refundSteps = ["Return Requested", "Picked Up", "Refund in Process", "Refund Completed"];
  const currentRefundIndex =
    order.returnInfo && refundSteps.indexOf(order.returnInfo.status);

  return (
    <main className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center z-20">
        <button onClick={() => router.back()} className="mr-3">
          <ArrowLeft className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-semibold text-gray-900">Order Details</h1>
      </div>

      <div className="p-5 space-y-6">
        {/* Order Info */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-900">{order.id}</h2>
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : order.status === "Returned"
                  ? "bg-red-100 text-red-700"
                  : order.status === "Shipped"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order.status}
            </span>
          </div>
          <p className="text-sm text-gray-600">Tracking ID: {order.trackingId}</p>
          <p className="text-sm text-gray-600">Placed on: {order.date}</p>
        </div>

        {/* Delivery Progress */}
        {order.status !== "Returned" && (
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">
              Delivery Progress
            </h3>
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
               <div key={step} className="flex-1 flex flex-col items-center relative">
               {index < steps.length - 1 && (
                 <div
                   className={`absolute top-1/4 left-2/2 w-full h-[2px] ${
                     index < currentStepIndex ? "bg-blue-600" : "bg-gray-300"
                   } -translate-x-1/2 z-0`}
                 ></div>
               )}
             
               <div
                 className={`w-8 h-8 flex items-center justify-center rounded-full relative z-10 ${
                   index <= currentStepIndex
                     ? "bg-blue-600 text-white"
                     : "bg-gray-200 text-gray-500"
                 }`}
               >
                 {index < currentStepIndex ? (
                   <CheckCircle className="w-4 h-4" />
                 ) : index === currentStepIndex ? (
                   <Truck className="w-4 h-4" />
                 ) : (
                   <Package className="w-4 h-4" />
                 )}
               </div>
             
               <p className="text-xs text-gray-600 mt-2">{step}</p>
             </div>
             
              ))}
            </div>
          </div>
        )}

        {/* Refund / Return Progress */}
        {order.returnInfo && (
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-3   leading-tight flex items-start justify-center gap-2">
              <RotateCcw className="w-4 h-4 text-red-600" />
              Refund Progress
            </h3>
            <div className="flex justify-between items-center">
              {refundSteps.map((step, index) => (
                <div key={step} className="flex-1 flex flex-col items-center relative">
                {index < steps.length - 1 && (
                  <div
                    className={`absolute top-1/5 left-2/2 w-full h-[2px] ${
                      index < currentRefundIndex ? "bg-red-600" : "bg-gray-300"
                    } -translate-x-1/2 z-0`}
                  ></div>
                )}
              
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full relative z-10 ${
                    index <= currentRefundIndex
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index < currentRefundIndex ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : index === currentRefundIndex ? (
                    <Truck className="w-4 h-4" />
                  ) : (
                    <Package className="w-4 h-4" />
                  )}
                </div>
              
                <p className="mt-2 text-xs text-gray-700 text-center min-h-[40px] leading-tight flex items-center justify-center">
  {step}
</p>

              </div>
              
              ))}
            </div>
          </div>
        )}

        {/* Return Details */}
        {order.returnInfo && (
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-red-600" />
              Return Details
            </h3>
            <p className="text-sm text-gray-700">
              <strong>Reason:</strong> {order.returnInfo.reason}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Status:</strong> {order.returnInfo.status}
            </p>
          </div>
        )}

        {/* Items */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">
            Ordered Items ({order.items.length})
          </h3>
          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-start border-b last:border-none pb-3 mb-3"
            >
              <div>
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Size: {item.size} | Color: {item.color}
                </p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="font-medium text-gray-900">{item.price}</p>
            </div>
          ))}
        </div>

        {/* Address */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-700" />
            Delivery Address
          </h3>
          <p className="text-sm text-gray-700">{order.address.name}</p>
          <p className="text-sm text-gray-700">{order.address.street}</p>
          <p className="text-sm text-gray-700">
            {order.address.city}, {order.address.state} - {order.address.pincode}
          </p>
          <p className="text-sm text-gray-700 mt-1">📞 {order.address.phone}</p>
        </div>

        {/* Payment */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-gray-700" />
            Payment Method
          </h3>
          <p className="text-sm text-gray-700">{order.paymentMethod}</p>
        </div>

        {/* Total */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex justify-between items-center">
          <span className="text-sm text-gray-700">
            Total ({order.items.length} items)
          </span>
          <span className="font-semibold text-gray-900">
            ₹
            {order.items
              .reduce((acc, item) => acc + parseInt(item.price.replace("₹", "")), 0)
              .toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </main>
  );
}
