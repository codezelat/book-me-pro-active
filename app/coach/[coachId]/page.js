"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Calendar from "/components/Calendar";
import { Album } from "lucide-react";
import Link from "next/link";

export default function CoachProfilePage() {
  const { coachId } = useParams();
  const [coach, setCoach] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingCalendar, setShowBookingCalendar] = useState(false);
  // State to store the selected image
  const [selectedImage, setSelectedImage] = useState(null);

  // Get the BASE_URL from environment variables
  const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN;

  useEffect(() => {
    const fetchCoachData = async () => {
      try {
        const response = await axios.get(`/api/coach/${coachId}`);
        setCoach(response.data);
      } catch (error) {
        console.error("Error loading coach data:", error);
        setError("Unable to load coach profile.");
      } finally {
        setLoading(false);
      }
    };

    if (coachId) {
      fetchCoachData();
    }
  }, [coachId]);

  useEffect(() => {
    if (coach?.gallery && coach.gallery.length > 0) {
      // Set the first image as the default selected image
      setSelectedImage(`${BASE_URL}${coach.gallery[0]}`);
    }
  }, [coach, BASE_URL]);

  // Handling errors and loading states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!coach) return <p>Coach not found.</p>;

  return (
    <section>
      <div className="container pt-24 mx-auto px-20">
        <div className="grid py-24 justify-center gap-10 grid-cols-2 items-center">
          <div>
            <div className="text-[88px] text-black font-bold">
              {coach.firstName} {coach.lastName}
            </div>
            <div className="text-[44px] font-normal text-black">
              {coach.title}
            </div>

            <div className="text-black font-semibold mt-2 text-[30px] ">
              $ {coach.hourlyRate} per hour
            </div>
            <div className="flex gap-20 text-2xl text-black mt-2">
              <p>Contact: {coach.contact}</p>
              <p>
                Email:
                <Link href={`mailto:${coach.email}`}>
                  <a className="text-blue-600 underline"> {coach.email}</a>{" "}
                </Link>
              </p>
            </div>

            <div className="flex mt-4 items-center mb-6 space-x-8">
              <button
                className="bg-[#037D40] text-white font-semibold py-[13px] px-[24px] gap-[16px] rounded-[8px] flex items-center "
                onClick={() => setShowBookingCalendar(true)}
              >
                <span>
                  <Album width={24} height={24} />
                </span>
                <div className="">
                  <Calendar />
                </div>
              </button>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                {/* Main large image section */}
                <div className="flex-1 flex items-center justify-center">
                  <div
                    className="w-full"
                    style={{
                      backgroundImage: `url(${selectedImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: "400px", // Fixed height
                    }}
                  />
                </div>
              </div>

               {/* Small image thumbnails */}
               <div className="flex flex-row justify-self-auto gap-3">
                {coach?.gallery?.map((image, index) => (
                  <div
                    key={index}
                    className={`rounded-[8px] cursor-pointer`}
                    onClick={() => setSelectedImage(`${BASE_URL}${image}`)} // Allow manual selection
                    style={{
                      backgroundImage: `url(${BASE_URL}${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100px", // Fixed width
                      height: "100px", // Fixed height
                      borderRadius: "8px",
                      border: selectedImage === `${BASE_URL}${image}` ? "4px solid #0066FF" : "none", // Highlight selected image
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container pb-24 mx-auto px-20">
        <div className="text-3xl text-black font-extrabold mb-6">
          Description
        </div>
        <div className="text-[26px] font-[275] mb-4 text-black">
          {coach.description}
        </div>
      </div>
    </section>
  );
}
