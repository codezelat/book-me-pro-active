"use client";

import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
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
  const [selectedImage, setSelectedImage] = useState(null);

  const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN;

  console.log("BASE_URL:", BASE_URL);

  const image = useMemo(() => Array.isArray(coach?.gallery) ? coach.gallery : [], [coach?.gallery]);

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

  console.log("Fetched Coach Data:", coach);

  useEffect(() => {
    if (Array.isArray(coach?.gallery) && coach.gallery.length > 0) {
      setSelectedImage(`${BASE_URL}${coach.gallery[0]}`);
    } else {
      setSelectedImage("/default-image.jpg");
    }
  }, [coach, BASE_URL]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!coach) return <p>Coach not found.</p>;

  return (
    <section>
      <div className="container pt-24 mx-auto px-20">
        <div className="grid py-24 justify-center gap-10 grid-cols-2 items-center">
          <div>
            <div className="text-[88px] text-black font-bold">
              {coach?.firstName || "First Name"} {coach?.lastName || "Last Name"}
            </div>
            <div className="text-[44px] font-normal text-black">
              {coach?.title || "Title Unavailable"}
            </div>
            <div className="text-black font-semibold mt-2 text-[30px] ">
              ${coach?.hourlyRate || "Rate Not Set"} per hour
            </div>
            <div className="flex gap-20 text-2xl text-black mt-2">
              <p>
                Contact: {coach?.contact || "N/A"}
                Email:
                <Link
                  href={`mailto:${coach?.email || ""}`}
                  className="text-blue-600 underline"
                >
                  {coach?.email || "Not Provided"}
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
              <div className="flex-1 flex items-center justify-center">
                <div
                  className="w-full"
                  style={{
                    backgroundImage: `url(${selectedImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "400px",
                  }}
                  aria-label="Main coach image"
                />
              </div>
              <div className="flex flex-row justify-self-auto gap-3">
                {image.map((img, index) => (
                  <div
                    key={index}
                    className={`rounded-[8px] cursor-pointer`}
                    onClick={() => setSelectedImage(`${BASE_URL}${img}`)}
                    style={{
                      backgroundImage: `url(${BASE_URL}${img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      width: "100px",
                      height: "100px",
                      borderRadius: "8px",
                      border:
                        selectedImage === `${BASE_URL}${img}`
                          ? "4px solid #0066FF"
                          : "none",
                    }}
                    aria-label={`Coach gallery image ${index + 1}`}
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
          {coach?.description || "No description available."}
        </div>
      </div>
    </section>
  );
}
