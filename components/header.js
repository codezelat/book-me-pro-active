// components/Header.js

"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Import the usePathname hook
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname(); // Get the current route

  // Check if the current page is the homepage
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Apply blur and background change on scroll
      } else {
        setIsScrolled(false); // Remove blur and restore background at the top
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up the listener on unmount
    };
  }, []);

  return (
    <section>
      {/* Conditional class for background color/image */}
      <div
        className={`${
          isHomePage
            ? "bg-transparent absolute"
            : `${
                isScrolled
                  ? "bg-white/70 backdrop-blur-md shadow-md"
                  : "bg-white shadow-md"
              }` // Apply blur and background only when scrolled
        } w-full fixed top-0 z-10 transition duration-300 ease-in-out`}
      >
        <div className="container mx-auto px-20 ">
          <div className="justify-between items-center flex py-5 ">
            {/* Company Logo */}
            <div
              className={`text-3xl font-extrabold ${
                isHomePage ? "text-white" : "text-blue-700"
              }`}
            >
              <Link href="/">
                <div className="w-48 ">
                  <Image
                    src={
                      isHomePage
                        ? "/images/home/logo 2.png" // Use logo 2 on homepage
                        : "/images/home/logo 1.png" // Use logo 1 on other pages
                    }
                    width={1000}
                    height={500}
                    layout="responsive"
                    alt="logo"
                  />
                </div>
              </Link>
            </div>

            {/* Navigation Links */}
            <div
              className={`flex items-center gap-12 text-lg ${
                isHomePage ? "text-white" : "text-blue-600"
              }`}
            >
              <div className="cursor-pointer duration-200">
                <Link href="/">Home</Link>
              </div>
              <div className="cursor-pointer duration-200">
                <Link href="/about">About</Link>
              </div>
              <div className="cursor-pointer duration-200">
                <Link href="/contact">Contact</Link>
              </div>

              {/* Login/Signup Button */}
              <button
                className={`${
                  isHomePage
                    ? "bg-blue-600 text-white"
                    : "bg-blue-600 text-white"
                } flex gap-3 items-center py-2 px-4 rounded`}
              >
                <div className="w-5 ">
                  <Image
                    src="/images/home/profile.png"
                    width={1000}
                    height={500}
                    layout="responsive"
                    alt="profile"
                  />
                </div>
                <div>Login / Signup</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
