"use client";

import Link from "next/link";
import Button from "../ui/Button";

// كومبوننت شريط علوي بسيط
export default function Topbar() {
  return (
    <div className="bg-primary-50 text-gray-700 text-sm">
      <div className="container flex gap-4 items-center justify-end py-1">
        <div className="flex gap-2 items-center">
          <Link href="#" className="opacity-80">
            EN
          </Link>
          <Button href="#contact" variant="ghost" className="btn-sm">
            تواصل معنا
          </Button>
          <Button href="#login" className="btn-sm">
            سجل الدخول
          </Button>
        </div>
      </div>
    </div>
  );
}
