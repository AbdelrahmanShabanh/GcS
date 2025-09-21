export const metadata = {
  title: "GCschool | Think . Code . Innovate  ",
  description:
    "GCschool - حصص برمجة مباشرة للأطفال والطلاب من الصف 1 إلى 12. مناهج معتمدة ومشروعات واقعية عبر الإنترنت.",
  icons: { icon: "/GC_Ver_White.jpg" },
};

import "./globals.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-sans">{children}</body>
    </html>
  );
}
