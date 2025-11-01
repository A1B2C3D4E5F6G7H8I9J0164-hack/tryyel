"use client";

import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Sun,
  Moon,
  Phone,
} from "lucide-react";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loginPhoneNumber, setLoginPhoneNumber] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isLoginPhoneFocused, setIsLoginPhoneFocused] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isLoginPhoneValid, setIsLoginPhoneValid] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // Email validation
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Phone number validation
  const validatePhone = (phone) => {
    const re = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
    return re.test(phone.replace(/\s/g, ""));
  };

  // Handle phone number change (for sign up)
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    setPhoneNumber(value);
    if (value) {
      setIsPhoneValid(validatePhone(value) || value.length >= 10);
    } else {
      setIsPhoneValid(true);
    }
  };

  // Handle login phone number change
  const handleLoginPhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    setLoginPhoneNumber(value);
    if (value) {
      setIsLoginPhoneValid(validatePhone(value) || value.length >= 10);
    } else {
      setIsLoginPhoneValid(true);
    }
  };

  // Handle email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value) {
      setIsEmailValid(validateEmail(e.target.value));
    } else {
      setIsEmailValid(true);
    }
  };

  // Handle password confirmation
  useEffect(() => {
    if (!isLogin && confirmPassword) {
      setPasswordsMatch(password === confirmPassword);
    } else {
      setPasswordsMatch(true);
    }
  }, [password, confirmPassword, isLogin]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    if (isLogin) {
      if (loginPhoneNumber && password && validatePhone(loginPhoneNumber)) {
        console.log("Login submitted:", { phoneNumber: loginPhoneNumber, password, rememberMe });
        // Here you would typically handle the login process
        const form = document.querySelector(".login-form");
        if (form) {
          form.classList.add("form-success");
          setTimeout(() => {
            form.classList.remove("form-success");
          }, 1500);
        }
      }
    } else {
      if (phoneNumber && password && confirmPassword && validatePhone(phoneNumber) && passwordsMatch) {
        console.log("Sign up submitted:", { phoneNumber, password });
        // Here you would typically handle the sign up process
        const form = document.querySelector(".login-form");
        if (form) {
          form.classList.add("form-success");
          setTimeout(() => {
            form.classList.remove("form-success");
          }, 1500);
        }
      }
    }
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark-mode");
  };

  // Initialize theme based on user preference
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(prefersDark);
    if (prefersDark) {
      document.documentElement.classList.add("dark-mode");
    }
  }, []);

  // Create particles
  useEffect(() => {
    const canvas = document.getElementById("particles");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = isDarkMode
          ? `rgba(255, 255, 255, ${Math.random() * 0.2})`
          : `rgba(0, 0, 100, ${Math.random() * 0.2})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles = [];
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [isDarkMode]);

  return (
    <main className="bg-white min-h-screen w-full relative overflow-hidden">
      <canvas 
        id="particles" 
        className="absolute inset-0 w-full h-full"
        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
      ></canvas>
      <div 
        className="fixed top-4 right-4 z-50 cursor-pointer p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
        onClick={toggleDarkMode}
      >
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen w-full px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8 relative">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? "Welcome" : "Create Account"}
              </h1>
              <p className="text-gray-600">
                {isLogin ? "Please sign in to continue" : "Sign up to get started"}
              </p>
            </div>

            <form className="login-form space-y-6" onSubmit={handleSubmit}>
              {/* Phone Number field for sign up */}
              {!isLogin && (
                <div className={`relative ${!isPhoneValid && phoneNumber ? "mb-8" : ""}`}>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    onFocus={() => setIsPhoneFocused(true)}
                    onBlur={() => setIsPhoneFocused(false)}
                    required
                    maxLength={15}
                    className={`w-full px-4 py-3 pl-10 border-b-2 bg-transparent outline-none transition-colors ${
                      isPhoneFocused || phoneNumber
                        ? "border-gray-900"
                        : "border-gray-300"
                    } ${!isPhoneValid && phoneNumber ? "border-red-500" : ""}`}
                  />
                  <Phone 
                    className={`absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                      isPhoneFocused || phoneNumber ? "text-gray-900" : "text-gray-400"
                    }`}
                  />
                  <label
                    htmlFor="phoneNumber"
                    className={`absolute left-10 transition-all duration-200 pointer-events-none ${
                      isPhoneFocused || phoneNumber
                        ? "top-0 text-xs text-gray-900"
                        : "top-3 text-sm text-gray-500"
                    }`}
                  >
                    Phone Number
                  </label>
                  {!isPhoneValid && phoneNumber && (
                    <span className="absolute -bottom-5 left-0 text-xs text-red-500">
                      Please enter a valid phone number
                    </span>
                  )}
                </div>
              )}

              {/* Phone Number field for login */}
              {isLogin && (
                <div className={`relative ${!isLoginPhoneValid && loginPhoneNumber ? "mb-8" : ""}`}>
                  <input
                    type="tel"
                    id="loginPhoneNumber"
                    value={loginPhoneNumber}
                    onChange={handleLoginPhoneChange}
                    onFocus={() => setIsLoginPhoneFocused(true)}
                    onBlur={() => setIsLoginPhoneFocused(false)}
                    required
                    maxLength={15}
                    className={`w-full px-4 py-3 pl-10 border-b-2 bg-transparent outline-none transition-colors ${
                      isLoginPhoneFocused || loginPhoneNumber
                        ? "border-gray-900"
                        : "border-gray-300"
                    } ${!isLoginPhoneValid && loginPhoneNumber ? "border-red-500" : ""}`}
                  />
                  <Phone 
                    className={`absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                      isLoginPhoneFocused || loginPhoneNumber ? "text-gray-900" : "text-gray-400"
                    }`}
                  />
                  <label
                    htmlFor="loginPhoneNumber"
                    className={`absolute left-10 transition-all duration-200 pointer-events-none ${
                      isLoginPhoneFocused || loginPhoneNumber
                        ? "top-0 text-xs text-gray-900"
                        : "top-3 text-sm text-gray-500"
                    }`}
                  >
                    Phone Number
                  </label>
                  {!isLoginPhoneValid && loginPhoneNumber && (
                    <span className="absolute -bottom-5 left-0 text-xs text-red-500">
                      Please enter a valid phone number
                    </span>
                  )}
                </div>
              )}


              <div className={`relative ${!passwordsMatch && !isLogin && confirmPassword ? "mb-8" : ""}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  required
                  className={`w-full px-4 py-3 pr-10 border-b-2 bg-transparent outline-none transition-colors ${
                    isPasswordFocused || password
                      ? "border-gray-900"
                      : "border-gray-300"
                  }`}
                />
                <label
                  htmlFor="password"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    isPasswordFocused || password
                      ? "top-0 text-xs text-gray-900"
                      : "top-3 text-sm text-gray-500"
                  }`}
                >
                  Password
                </label>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* Confirm Password field for sign up */}
              {!isLogin && (
                <div className={`relative ${!passwordsMatch && confirmPassword ? "mb-8" : ""}`}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setIsConfirmPasswordFocused(true)}
                    onBlur={() => setIsConfirmPasswordFocused(false)}
                    required
                    className={`w-full px-4 py-3 pr-10 border-b-2 bg-transparent outline-none transition-colors ${
                      isConfirmPasswordFocused || confirmPassword
                        ? "border-gray-900"
                        : "border-gray-300"
                    } ${!passwordsMatch && confirmPassword ? "border-red-500" : ""}`}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      isConfirmPasswordFocused || confirmPassword
                        ? "top-0 text-xs text-gray-900"
                        : "top-3 text-sm text-gray-500"
                    }`}
                  >
                    Confirm Password
                  </label>
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {!passwordsMatch && confirmPassword && (
                    <span className="absolute -bottom-5 left-0 text-xs text-red-500">
                      Passwords do not match
                    </span>
                  )}
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-gray-900 mr-2"
                    />
                    <span className="text-gray-600">Remember me</span>
                  </label>

                  <a href="#" className="text-gray-900 hover:underline">
                    Forgot Password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={
                  isFormSubmitted && (
                    isLogin
                      ? (!loginPhoneNumber || !password || !isLoginPhoneValid)
                      : (!phoneNumber || !password || !confirmPassword || !isPhoneValid || !passwordsMatch)
                  )
                }
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or continue with</span>
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button 
                type="button"
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                onClick={() => console.log("Google sign in")}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button 
                type="button"
                className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                onClick={() => console.log("Apple sign in")}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                </svg>
                Apple
              </button>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-gray-900 font-medium hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="text-gray-900 font-medium hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}