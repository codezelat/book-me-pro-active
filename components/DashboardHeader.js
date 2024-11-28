"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardHeader() {
  const { data: session } = useSession();

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);

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
          <div>
            <Image
              src="/images/coach/coach1.png"
              alt="Coach Image"
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
