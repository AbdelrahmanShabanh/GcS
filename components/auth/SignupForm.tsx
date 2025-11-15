"use client";

import { useState } from "react";

interface SignupFormProps {
  onSignup: (email: string, password: string, confirmPassword: string) => void;
  onSwitchToLogin: () => void;
  lang: "ar" | "en";
}

export default function SignupForm({
  onSignup,
  onSwitchToLogin,
  lang,
}: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const content = {
    ar: {
      title: "إنشاء حساب جديد",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirmPassword: "تأكيد كلمة المرور",
      signupButton: "إنشاء حساب",
      switchText: "لديك حساب بالفعل؟",
      switchLink: "تسجيل الدخول",
      loading: "جاري إنشاء الحساب...",
      passwordMismatch: "كلمات المرور غير متطابقة",
    },
    en: {
      title: "Create Account",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      signupButton: "Create Account",
      switchText: "Already have an account?",
      switchLink: "Login",
      loading: "Creating account...",
      passwordMismatch: "Passwords do not match",
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert(content[lang].passwordMismatch);
      return;
    }

    setIsLoading(true);

    try {
      await onSignup(email, password, confirmPassword);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          {content[lang].title}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {content[lang].email}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={content[lang].email}
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {content[lang].password}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={content[lang].password}
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {content[lang].confirmPassword}
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder={content[lang].confirmPassword}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? content[lang].loading : content[lang].signupButton}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {content[lang].switchText}{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-teal-500 hover:text-teal-600 font-medium"
            >
              {content[lang].switchLink}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

