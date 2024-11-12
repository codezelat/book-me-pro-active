"use client";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Calendar from "@/components/Calendar";
import { useState } from 'react';


export default function Contact() {
  return (
    <>
      <section className="relative bg-white">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/contact/bg.png"
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
        </div>

       
        <div className="relative z-0 container mx-auto px-20 py-24 md:px-20">
          {/* Heading */}
          <div className="text-black pt-24 text-start">
            <h1 className="text-5xl font-bold mb-4">Get In Touch</h1>
            <p className="text-3xl font-normal">Contact Us if you need any support</p>
          </div>

          {/* Quick Support Section */}
          <div className="text-black text-4xl mt-20 font-bold">Need Quick Support?</div>
          <div className="flex flex-col lg:flex-row gap-20 mb-8">
            <div className="flex items-center gap-10 mt-8 px-14 justify-center bg-primary text-white py-3 rounded-lg">
              <div className="w-10">
                <Image
                  src="/images/contact/Callicon.png"
                  width={1000}
                  height={500}
                  layout="responsive"
                  alt="Call Icon"
                />
              </div>
              <div>
                <h2 className="text-3xl font-normal">Hotline:</h2>
                <p className="text-3xl font-normal">123 456 7890</p>
              </div>
            </div>

            <div className="flex items-center gap-10 mt-8 px-16 justify-center bg-primary text-white py-3 rounded-lg">
              <div className="w-10">
                <Image
                  src="/images/contact/EmailIcon.png"
                  width={1000}
                  height={500}
                  layout="responsive"
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

          
          <div className="border-t border-black mt-16"></div>

          <div className="container mx-auto mt-10">
          <h1 className="text-2xl text-black font-bold">Book Your Appointment</h1>
          <Calendar />
          </div>

          <div className="container mx-auto mt-10">
          
          </div>



          {/* Social Media Section */}
          <div className="flex mt-16 gap-20 items-center">
            <p className="text-black text-4xl font-bold">Follow Us On</p>
            <div className="flex text-blue-600 space-x-8">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="w-8 h-8 hover:text-gray-400" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="w-8 h-8 hover:text-gray-400" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className="w-8 h-8 hover:text-gray-400" />
              </a>
            </div>
          </div>
        </div>

      
      </section>
    </>
  );
}

