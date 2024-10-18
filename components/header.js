"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Import the usePathname hook
import { useEffect, useState } from "react";

export default function Header() {
  const { data: session } = useSession();

  const pathname = usePathname(); // Get the current route
  const isHomePage = pathname === "/"; // Check if the current page is the homepage
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
              }`
        } w-full fixed top-0 z-10 transition duration-300 ease-in-out`}
      >
        <div className="container mx-auto px-20">
          <div className="justify-between items-center flex py-5">
            {/* Company Logo */}
            <div
              className={`text-3xl font-extrabold ${
                isHomePage ? "text-white" : "text-blue-700"
              }`}
            >
              <Link href="/">
                <div className="w-48">
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
                <Link className="text-xl font-normal" href="/">Home</Link>
              </div>
              <div className="cursor-pointer duration-200">
                <Link className="text-xl font-normal"  href="/about">About</Link>
              </div>
              <div className="cursor-pointer duration-200">
                <Link className="text-xl font-normal"  href="/contact">Contact</Link>
              </div>

              {/* Conditional Login/Logout Button */}
              {session ? (
                <button
                  className={`${
                    isHomePage
                      ? "bg-blue-600 text-white"
                      : "bg-blue-600 text-white"
                  } flex gap-3 items-center py-2 px-4 rounded`}
                >
                  <div className="w-5">
                    <Image
                      src="/images/home/profile.png"
                      width={1000}
                      height={500}
                      layout="responsive"
                      alt="profile"
                    />
                  </div>
                  <Link href="/dashboard">Dashboard</Link>
                </button>
              ) : (
                <button
                  className={`${
                    isHomePage
                      ? "bg-blue-600 text-white"
                      : "bg-blue-600 text-white"
                  } flex gap-3 items-center py-2 px-4 rounded`}
                >
                  <div className="w-5">
                    <Image
                      src="/images/home/profile.png"
                      width={1000}
                      height={500}
                      layout="responsive"
                      alt="profile"
                    />
                  </div>
                  <div>
                    <Link className="text-xl font-normal"  href="/auth/login">Login / Signup</Link>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
  