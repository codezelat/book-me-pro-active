"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Import the usePathname hook
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";

export default function DashboardHeader() {
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
      <div>
        <div className=" mx-auto px-10  position: fixed;">
          <div className="justify-between items-center flex ">
            {/* Company Logo */}
            <div>
              <Link href="/">
                <div className="w-48">
                  <Image
                    src="/images/home/logo 1.png" // Use logo 2 on homepage
                    width={230.05}
                    height={64}
                    layout="responsive"
                    alt="logo"
                  />
                </div>
              </Link>
            </div>

            <div>
              <Image
                src="/images/coach/coach1.png" // Correct path
                alt="Coach Image" // Add descriptive alt text
                width={50} // Desired width
                height={50} // Desired height
                style={{ borderRadius: "50%" }} // Styling for round image
              />
            </div>

            {/* <div>
              <Avatar
                alt={session?.user?.name || "User"}
                src={session?.user?.image || "default-image.jpg"}
                sx={{
                  width: "50px",
                  height: "50px",
                  border: "2px solid",
                  borderColor: "#037D40",
                }}
              />
            </div> */}

            {/* Navigation Links */}
          </div>
        </div>
      </div>
    </section>
  );
}
