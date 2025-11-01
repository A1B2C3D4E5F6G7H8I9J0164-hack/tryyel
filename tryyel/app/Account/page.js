"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AccountPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login/signup logic here
    console.log(isLogin ? "Login" : "Signup", { email, password });
  };

  return (
    <main className="bg-white min-h-screen w-full">
      {/* Account Page Container - matching main page dimensions */}
      <section className="w-full min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-white px-4 py-8">
        <div className="w-full max-w-sm">
          {/* Simple Login Card - Minimalist like newme.asia */}
          <div className="w-full">
            {/* Header - Simple and Clean */}
            <div className="text-center mb-10">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                {isLogin ? "Login" : "Register"}
              </h1>
              <p className="text-sm text-gray-500">
                {isLogin
                  ? "Please login to your account"
                  : "Create an account to continue"}
              </p>
            </div>

            {/* Login Form - Clean and Minimalist */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-b border-gray-300 bg-transparent focus:border-gray-900 outline-none transition-colors text-sm"
                  placeholder="Email Address"
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 pr-10 border-b border-gray-300 bg-transparent focus:border-gray-900 outline-none transition-colors text-sm"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>

              {/* Remember Me & Forgot Password */}
              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 mr-2"
                    />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-gray-900 hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
              )}

              {/* Submit Button - Prominent like newme.asia */}
              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3.5 rounded-sm font-medium hover:bg-gray-800 transition-colors text-sm mt-8"
              >
                {isLogin ? "LOGIN" : "REGISTER"}
              </button>
            </form>

            {/* Toggle between Login and Register */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-gray-900 font-medium hover:underline"
                >
                  {isLogin ? "Register" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
