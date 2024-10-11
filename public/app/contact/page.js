import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiX } from "react-icons/fi";

export default function Contact() {
  return (
    <>
      <section className="relative bg-white ">
        {/* Background Image */}
        <div className="absolute inset-0 ">
          <Image
            src="/images/contact/bg.png" // Background image path
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="z-0 "
          />
        </div>

        <div className="relative z-0 container  mx-auto px-20 py-24 md:px-20">
          {/* Heading */}
          <div className="text-black pt-24 text-start ">
            <h1 className="text-5xl font-extrabold mb-4">Get In Touch</h1>
            <p className="text-2xl">Contact Us if you need any support</p>
          </div>

          {/* Quick Support Section */}

          <div className="text-black text-3xl mt-20 font-extrabold">
            Need Quick Support?
          </div>
          <div className="flex flex-col lg:flex-row gap-20 mb-8">
            <div className="flex items-center gap-10 mt-8 px-14 justify-center bg-blue-600 text-white py-3 rounded-lg">
              <div className="w-10 ">
                <Image
                  src="/images/contact/Callicon.png"
                  width={1000}
                  height={500}
                  layout="responsive"
                  alt="soccer"
                />
                {/* <img
                          src="/images/home/section-1.gif"
                          alt="NFT Auto Store"
                        /> */}
              </div>
              <div className="">
                <h2 className="text-2xl font-bold">Hotline:</h2>
                <p className="text-2xl font-bold">123 456 7890</p>
              </div>
            </div>
            {/* <div className="flex items-center gap-10 mt-8 px-16 justify-center bg-blue-600 text-white py-3 rounded-lg">
              <div className="w-10 ">
                <Image
                  src="/images/contact/Callicon.png"
                  width={1000}
                  height={500}
                  layout="responsive"
                  alt="soccer"
                />
              </div>
              <div className="">
                <h2 className="text-2xl font-bold">Tel:</h2>
                <p className="text-2xl font-bold">123 456 7890</p>
              </div>
            </div> */}
            <div className="flex items-center gap-10 mt-8 px-16 justify-center bg-blue-600 text-white py-3 rounded-lg">
              <div className="w-10 ">
                <Image
                  src="/images/contact/EmailIcon.png"
                  width={1000}
                  height={500}
                  layout="responsive"
                  alt="soccer"
                />
                {/* <img
                          src="/images/home/section-1.gif"
                          alt="NFT Auto Store"
                        /> */}
              </div>
              <div className="">
                <h2 className="text-2xl font-bold">Email:</h2>
                <h2 className="text-2xl font-bold">info@company.com</h2>
              </div>
            </div>
          </div>
          <div className="border-t border-black mt-16"></div>

          {/* Support Form Section */}
          <div className=" pt-16">
            <p className="mb-4 text-black text-3xl font-extrabold">
              How can we help you?
            </p>
            <div className="flex  mt-10 gap-20 items-center ">
              <div className="text-black text-2xl font-semibold">
                Which section under your problems?{" "}
              </div>
              <div className="flex gap-8">
                <button className="border-2 px-8 border-blue-600 text-blue-600 py-2 rounded-md">
                  Sports
                </button>
                <button className="border-2 px-8 border-blue-600 text-blue-600 py-2 rounded-md">
                  Services
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-black mt-16"></div>

          {/* Social Media Section */}
          <div className="flex mt-16 gap-20 items-center">
            <p className="  text-black text-3xl font-extrabold">Follow Us On</p>
            <div className="flex text-blue-600 space-x-8">
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

        {/* Footer */}
      </section>
    </>
  );
}
