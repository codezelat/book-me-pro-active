"use client";

import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Calendar from "@/components/Calendar";
import Form from "@/components/Form";
import { Button } from "@mui/material";

export default function Contact() {
  return (
    <section className="relative bg-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/contact/bg.png"
          alt="Background Image"
          fill
          className="object-cover z-0"
        />
      </div>

      <div className="relative z-10 container mx-auto px-20 py-24 md:px-20">
        {/* Heading */}
        <div className="text-black pt-24 text-center">
          <div>Contact Us</div>
          <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-3xl font-normal">
            Contact Us if you need any support
          </p>
        </div>

        {/* Quick Support Section */}
        <div className="text-black text-4xl mt-20 font-bold text-center">
          Need Quick Support?
        </div>
        <div className="flex flex-col lg:flex-row gap-20 mb-8">
          <div className="flex items-center gap-10 mt-8 px-14 justify-center bg-primary text-white py-3 rounded-lg">
            <div className="w-10">
              <Image
                src="/images/contact/Callicon.png"
                width={40}
                height={40}
                alt="Call Icon"
              />
            </div>
            <div>
              <h2 className="text-3xl font-normal">Hotline:</h2>
              <p className="text-3xl font-normal">123 456 7890</p>
            </div>
          </div>

          <div className="flex items-center gap-10 mt-8 px-14 justify-center bg-primary text-white py-3 rounded-lg">
            <div className="w-10">
              <Image
                src="/images/contact/Callicon.png"
                width={40}
                height={40}
                alt="Call Icon"
              />
            </div>
            <div>
              <h2 className="text-3xl font-normal">Tel:</h2>
              <p className="text-3xl font-normal">123 456 7890</p>
            </div>
          </div>

          <div className="flex items-center gap-10 mt-8 px-16 justify-center bg-primary text-white py-3 rounded-lg">
            <div className="w-10">
              <Image
                src="/images/contact/EmailIcon.png"
                width={40}
                height={40}
                alt="Email Icon"
              />
            </div>
            <div>
              <h2 className="text-3xl font-normal">Email:</h2>
              <h2 className="text-3xl font-normal">info@company.com</h2>
            </div>
          </div>
        </div>

        <div className="border-t border-black mt-16"></div>

        {/* Appointment Booking */}
        <div className="container mx-auto mt-10 text-center">
          <h1 className="text-2xl text-black font-bold">
            How can we help you?
          </h1>
        </div>

        <div>
          <div className="pb-5 text-[18px] font-normal flex flex-col gap-[20px]">
            <label>Description</label>
            <div className="flex ">
              <textarea
                className="w-[1536px] h-[300px] rounded-[5px] border bg-[#E6F2EC] border-[#B1D7C4] px-3"
                placeholder="Description"
              />

              <Button
                sx={{
                  bgcolor: "#037D40",
                  color: "white",
                  px: 2,
                  py: 0.5,
                  "&:hover": { bgcolor: "#025b2e" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1.5,
                }}
                size="small"
                onClick={() => alert("Accepted")}
              >
                Approve
                {/* <CircleCheck sx={{ color: "white", fill: "white" }} /> */}
              </Button>
            </div>
          </div>
        </div>

        {/* Form Section */}
        {/* <div className="container mx-auto mt-10">
          <Form />
        </div> */}

        {/* Social Media Section */}
        <div className="flex mt-16 gap-20 items-center">
          <p className="text-black text-4xl font-bold">Follow Us On</p>
          <div className="flex text-primary space-x-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="w-8 h-8 hover:text-gray-400" />
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
    </section>
  );
}
