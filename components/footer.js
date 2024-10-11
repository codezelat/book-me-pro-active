import Link from "next/link";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"; // Install react-icons
import { FiX } from "react-icons/fi"; // Example for custom icon, replace if needed
import Image from "next/image";

import SubscribeSection from "/components/SubscribeSection";
export default function Footer() {
  return (
    <section>
      <div className=" bg-blue-900 z-10">
        <div className="container mx-auto px-20 py-10 ">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="text-white text-3xl font-extrabold">
                <Link href="/">
                  <div className="w-48 ">
                    <Image
                      src="/images/home/logo 2.png"
                      width={1000}
                      height={500}
                      layout="responsive"
                      alt="profile"
                    />
                  </div>
                </Link>
              </div>
              <div className="flex text-xl items-center mt-5 gap-10 font-light text-white">
                <div className="cursor-pointer duration-200">
                  <Link href="/">Home</Link>
                </div>
                <div className="cursor-pointer duration-200">
                  <Link href="/about">About</Link>
                </div>
                <div className="cursor-pointer duration-200">
                  <Link href="/about">Features</Link>
                </div>
                <div className="cursor-pointer duration-200">
                  <Link href="/about">Contact</Link>
                </div>
              </div>
            </div>
            <div>
              <div className="text-white text-xl font-extrabold">
                Subscribe to the newsletter
              </div>
              <div className="mt-5 ">
                <SubscribeSection />
              </div>
            </div>
          </div>
          <div>
            <div className="border-t border-gray-400 mb-4"></div>

            {/* Footer Content */}
            <div className="container mx-auto flex justify-between mt-10 items-center text-white text-sm">
              {/* Left Side - Copyright Text */}
              <div>© 2024 Rinish Global Booking. All rights reserved</div>

              {/* Right Side - Social Media Icons */}
              <div className="flex space-x-6">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF className="w-8 h-8 hover:text-gray-400" />
                </a>
                <a
                  href="https://your-custom-link.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiX className="w-8 h-8 hover:text-gray-400" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="w-8 h-8 hover:text-gray-400" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn className="w-8 h-8 hover:text-gray-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
