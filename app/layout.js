"use client";

import { usePathname } from "next/navigation";
import { Kanit } from "next/font/google";
import "./globals.css";
import Header from "/components/header";
import DashboardHeader from "/components/DashboardHeader"; // Import the DashboardHeader component
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";

const kanit = Kanit({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Layout({ children }) {
  const pathname = usePathname();

  // Check if the current path is under the dashboard
  const isDashboard =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/myBookings") ||
    pathname.startsWith("/myProfile");

  return (
    <SessionProvider>
      <html lang="en">
        <body className={kanit.className}>
          {/* Render DashboardHeader for dashboard-related pages, Header for main website */}
          {/* {isDashboard ? <Header /> : <DashboardHeader />} */}

          {/* Page content */}
          {children}

          {/* Only show Footer if it's not a dashboard page */}
          {!isDashboard && <Footer />}
        </body>
      </html>
    </SessionProvider>
  );
}
