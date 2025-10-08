"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "../ui/Button";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import AuthModal from "../auth/AuthModal";

interface HeaderProps {
  lang: string;
  setLang: (lang: string) => void;
}

// كومبوننت الهيدر بالملاحة
export default function Header({ lang, setLang }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";
  const { user, logout } = useAuth();

  const navItems =
    lang === "ar"
      ? [
          { href: isAboutPage ? "/#home" : "#home", text: "الرئيسية" },
          { href: "/about", text: "من نحن" },
          {
            href: isAboutPage ? "/#learning-path" : "#learning-path",
            text: "المناهج",
          },
          { href: isAboutPage ? "/#pricing" : "#pricing", text: "الأسعار" },
          { href: isAboutPage ? "/#faq" : "#faq", text: "الأسئلة الشائعة" },
          { href: isAboutPage ? "/#contact" : "#contact", text: "تواصل معنا" },
          ...(user?.isAdmin
            ? [{ href: "/admin", text: "settings", admin: true, icon: true }]
            : []),
        ]
      : [
          { href: isAboutPage ? "/#home" : "#home", text: "Home" },
          { href: "/about", text: "About Us" },
          {
            href: isAboutPage ? "/#learning-path" : "#learning-path",
            text: "Curriculum",
          },
          { href: isAboutPage ? "/#pricing" : "#pricing", text: "Pricing" },
          { href: isAboutPage ? "/#faq" : "#faq", text: "FAQ" },
          { href: isAboutPage ? "/#contact" : "#contact", text: "Contact Us" },
          ...(user?.isAdmin
            ? [{ href: "/admin", text: "settings", admin: true, icon: true }]
            : []),
        ];

  const bgClass = "bg-[rgb(0,133,113)]"; // rgb(0 133 113)

  return (
    <header className={`sticky top-0 z-50 ${bgClass}`}>
      <div className="container flex justify-between items-center py-2">
        <Link
          className="flex items-center gap-2.5 font-extrabold text-white"
          href="#"
        >
          <span
            className="block relative leading-none"
            style={{ width: 180, height: 50 }}
          >
            <Image
              src="/log.png"
              alt="GCschool"
              fill
              className="object-contain"
              sizes="160px"
              priority
            />
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-6 md:flex" id="nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors hover:text-white ${
                item.admin
                  ? "text-teal-300 font-semibold border-b-2 border-teal-300"
                  : "text-white/80"
              }`}
            >
              {item.icon ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-5 h-5"
                >
                  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                item.text
              )}
            </Link>
          ))}
        </nav>

        <div className="flex gap-2 items-center">
          {/* Mobile buttons - visible on small screens */}
          <div className="flex gap-1.5 items-center md:hidden">
            <button
              className="bg-white/10 text-white px-2 py-1 text-xs rounded cursor-pointer transition-colors hover:bg-white/20"
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            >
              {lang === "ar" ? "EN" : "عربي"}
            </button>

            {/* Mobile Authentication */}
            {user ? (
              <button
                onClick={logout}
                className="bg-red-500/20 text-red-200 px-2 py-1 text-xs rounded cursor-pointer transition-colors hover:bg-red-500/30"
              >
                {lang === "ar" ? "خروج" : "Logout"}
              </button>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="bg-orange-500 text-white px-2 py-1 text-xs rounded font-semibold hover:bg-orange-600 transition-colors"
              >
                {lang === "ar" ? "سجل" : "Register"}
              </button>
            )}
          </div>

          {/* Desktop buttons - hidden on small screens */}
          <button
            className="hidden md:inline-flex bg-white/10 text-white px-3 py-1.5 rounded-md cursor-pointer transition-colors hover:bg-white/20"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
          >
            {lang === "ar" ? "EN" : "عربي"}
          </button>

          {/* Desktop User Authentication */}
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={logout}
                className="bg-red-500/20 text-red-200 px-3 py-1.5 rounded-md cursor-pointer transition-colors hover:bg-red-500/30"
              >
                {lang === "ar" ? "تسجيل الخروج" : "Logout"}
              </button>
            </div>
          ) : null}

          <div className="hidden md:block">
            <button
              onClick={() => setAuthModalOpen(true)}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
            >
              {lang === "ar" ? "سجل الآن" : "Register Now"}
            </button>
          </div>
          {/* Mobile menu button */}
          <button
            className="inline-flex justify-center items-center w-10 h-10 text-white rounded-md md:hidden hover:bg-white/10"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-6 h-6"
              aria-hidden
            >
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`${bgClass} md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container py-2">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-2 py-2 rounded-md transition-colors duration-200 text-white/90 hover:text-white hover:bg-white/10 flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                {item.icon ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-5 h-5"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : null}
                {item.text}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        lang={lang as "ar" | "en"}
      />
    </header>
  );
}
