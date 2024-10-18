"use client";
import { usePathname } from "next/navigation"; // Import the usePathname hook
import { Kanit } from "next/font/google";  
import "./globals.css";
import Header from "/components/header";
import Footer from "@/components/footer";
import { SessionProvider } from "next-auth/react";

const kanit = Kanit({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],  
  subsets: ['latin'],  
  display: 'swap',     
});

export default function Layout({ children }) {
 
  const pathname = usePathname(); // Get the current route path

  // Check if the current page is the dashboard
  const isDashboard = pathname === "/dashboard";

  return (
    <SessionProvider>
      <html lang="en">
        <body className={kanit.className}>
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
