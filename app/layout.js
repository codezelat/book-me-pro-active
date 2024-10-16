"use client";
import { usePathname } from "next/navigation"; // Import the usePathname hook
import localFont from "next/font/local";
import "./globals.css";
import Header from "/components/header";
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";

export default function Layout({ children }) {
  const pathname = usePathname(); // Get the current route path

  // Check if the current page is the dashboard
  const isDashboard = pathname === "/dashboard";

  return (
    <SessionProvider>
      <html lang="en">
        <body>
          {/* Only show Header if it's not the dashboard */}
          {!isDashboard && <Header />}
          
          {/* Page content */}
          {children}

          {/* Only show Footer if it's not the dashboard */}
          {!isDashboard && <Footer />}
        </body>
      </html>
    </SessionProvider>
  );
}
