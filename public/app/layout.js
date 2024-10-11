"use client";
import localFont from "next/font/local";
import "./globals.css";
import Header from "/components/header";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/footer";

export default function Layout({ children }) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
