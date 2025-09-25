"use client";

import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  onClick?: () => void;
}

// كومبوننت عنصر زرار جاهز
export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const base = variant === "ghost" ? "btn btn-ghost" : "btn";
  return (
    <Link
      href={href}
      className={`${base} ${className}`.trim()}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}





