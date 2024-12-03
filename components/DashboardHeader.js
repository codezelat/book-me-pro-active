"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as React from "react";
import axios from "axios";


export default function DashboardHeader() {
  const { data: session } = useSession();
  const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN;
  const [coachData, setCoachData] = React.useState(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    if (session?.user?.id) {
      axios
        .get(`/api/coach/${session.user.id}`)
        .then((response) => setCoachData(response.data))
        .catch((error) => console.error("Error fetching coach data:", error));
    }
  }, [session?.user?.id]);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section>
      <div
        className={`mx-auto px-10 fixed w-full border-b py-2 border-gray
           bg-white z-50`}
      >
        <div className="justify-between items-center flex h-[60px]">
          {/* Company Logo */}
          <div>
            <Link href="/">
              <div className="w-48">
                <Image
                  src="/images/home/logo 1.png"
                  width={230.05}
                  height={64}
                  layout="responsive"
                  alt="logo"
                />
              </div>
            </Link>
          </div>

          {/* Coach Image */}
          <div
            style={{
              backgroundImage: `url(${BASE_URL}${coachData?.image})`, // Set the background image
              backgroundSize: "cover", // Ensures the image covers the entire container
              backgroundPosition: "center", // Centers the image
              backgroundRepeat: "no-repeat", // Prevents the image from repeating
              width: "50px", // Fixed width
              height: "50px", // Fixed height
              borderRadius: "50%", // Makes it circular
            }}
            className="mb-5"
          />
        </div>
      </div>
    </section>
  );
}
