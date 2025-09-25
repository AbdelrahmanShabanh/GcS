export const metadata = {
  title: "GC School | Think . Code . Innovate  ",
  description:
    "GC School - حصص برمجة مباشرة للأطفال والطلاب من سن 6 الى 18. مناهج معتمدة ومشروعات واقعية عبر الإنترنت.",
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
