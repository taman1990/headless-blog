import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/ThemeProvider";

// Local font is loaded via next/font to:
// - avoid external requests
// - enable automatic font optimization
// - expose a CSS variable for Tailwind usage
const inter = localFont({
  src: [
    {
      path: "../assets/fonts/Inter-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Inter-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Inter-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Headless Blog",
  description: "Minimal Next.js headless blog",
  alternates: {
    types: {
      // Expose RSS feed for browsers, crawlers, and feed readers
      "application/rss+xml": "/rss.xml",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<html lang="en" suppressHydrationWarning>
  <body className={`${inter.variable}`}>
    <ThemeProvider>
      <div className="bg-bg text-text-primary min-h-screen">
        <Header />
        {children}
        <Footer />
      </div>
    </ThemeProvider>
  </body>
</html>


  );
}
