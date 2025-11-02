"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  MapPin,
  LogOut,
  Ticket,
  HelpCircle,
  Info,
  AlertTriangle,
  ChevronRight,
  UserPlus,
  Package,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("userInfo");
    if (saved) setUserInfo(JSON.parse(saved));
    else
      setUserInfo({
        name: "User",
        email: "user@example.com",
        phone: "+919696531218",
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userInfo");
    router.push("/Account");
  };

  const menuOptions = [
      {
        icon: Package,
        title: "Orders",
        onClick: () => router.push("/orders"), // ✅ navigate to orders page
      },
    { icon: UserPlus, title: "Invite Friends & Earn" },
    { icon: Ticket, title: "My Coupons" },
    {
      icon: MapPin,
      title: "Address",
      onClick: () => router.push("/address"), // ✅ navigate to address page
    },
    { icon: HelpCircle, title: "Help & Support" },
    { icon: Info, title: "About Us" },
    { icon: AlertTriangle, title: "Report App Issue" },
    { icon: LogOut, title: "Logout", onClick: handleLogout },
  ];

  if (!userInfo)
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );

  return (
    <main className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="border-b border-gray-200 py-4 px-6">
        <h1 className="text-2xl font-bold text-gray-900">Me</h1>
      </div>

      {/* Profile */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
            <User className="w-10 h-10 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-base font-bold text-gray-900 mb-1">
              {userInfo.phone}
            </p>
            <p className="text-sm text-gray-500 mb-2">E-mail address</p>
            <p className="text-sm text-gray-900">{userInfo.email}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="px-6 space-y-1">
        {menuOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <button
              key={index}
              onClick={option.onClick}
              className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 border-b transition"
            >
              <Icon className="w-6 h-6 text-gray-700" />
              <div className="flex-1 text-left text-base text-gray-900">
                {option.title}
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          );
        })}
      </div>
    </main>
  );
}
