"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useAuth } from "../../contexts/AuthContext";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: "ar" | "en";
}

export default function AuthModal({ isOpen, onClose, lang }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup } = useAuth();

  const content = {
    ar: {
      title: "مرحباً بك في GC School",
      subtitle: "سجل دخولك أو أنشئ حساباً جديداً",
    },
    en: {
      title: "Welcome to GC School",
      subtitle: "Login or create a new account",
    },
  };

  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password);
    if (success) {
      onClose();
    } else {
      alert(lang === "ar" ? "خطأ في تسجيل الدخول" : "Login failed");
    }
  };

  const handleSignup = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const success = await signup(email, password, confirmPassword);
    if (success) {
      onClose();
    } else {
      alert(lang === "ar" ? "خطأ في إنشاء الحساب" : "Signup failed");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal content */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white text-center">
            <h2 className="text-2xl font-bold mb-2">{content[lang].title}</h2>
            <p className="text-teal-100">{content[lang].subtitle}</p>
          </div>

          <div className="p-6">
            {isLogin ? (
              <LoginForm
                onLogin={handleLogin}
                onSwitchToSignup={() => setIsLogin(false)}
                lang={lang}
              />
            ) : (
              <SignupForm
                onSignup={handleSignup}
                onSwitchToLogin={() => setIsLogin(true)}
                lang={lang}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
