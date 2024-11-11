// app/coach/[coachId]/page.js
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
  const images = [
    "/images/coach/coach.png",
    "/images/coach/coach1.png",
    "/images/coach/coach3.png",
    "/images/coach/coach2.png",
    "/images/coach/coach4.png",
    "/images/coach/coach5.png",
  ];
  const [showBookingCalendar, setShowBookingCalendar] = useState(false);
  // State to store the selected image
  const [selectedImage, setSelectedImage] = useState(images[0]);

  // State to track the current index of the image for automatic slideshow
  const [currentIndex, setCurrentIndex] = useState(0);

  // Effect for automatic slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change the image every 3 seconds (3000ms)

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [images.length]); // Dependency array to track changes to the images array

  // Update the selected image whenever currentIndex changes
  useEffect(() => {
    setSelectedImage(images[currentIndex]);
  }, [currentIndex, images]);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!coach) return <p>Coach not found.</p>;

  return (
    <section className="">
      <div className="container pt-24 mx-auto px-20">
        <div className="grid py-24 justify-center gap-10 grid-cols-2 items-center">
          <div>
            <div className="text-[54px] text-black font-bold ">
              {coach.name}
            </div>
            <div className="text-[45px] font-normal  text-black">
              World Class Football Manager
            </div>

            <div className="text-[26px] font-[275] text-black mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo $1,000 per hour
            </div>
            <div className="text-black text-[37px]  font-[400]">
              $1,000 per hour
            </div>
            <div className="flex gap-20 text-xl text-black py-5">
              <p>Contact: {coach.contact}</p>
              <p>
                Email:
                <Link href={`mailto:${coach.email}`}>
                  <a className="text-blue-600 underline"> {coach.email}</a>{" "}
                </Link>
              </p>
            </div>

            <div className="flex items-center mb-6 space-x-8">
              <button
                className="bg-[#037D40] text-white font-semibold py-[13px]  px-[24px] gap-[16px] rounded-[8px] flex items-center "
                onClick={() => setShowBookingCalendar(true)}
              >
                <span>
                  <Album width={24} height={24} />
                </span>
                <div className="">
                  <Calendar /> {/* Render the Form component here */}
                </div>
              </button>

              <div className="flex items-center space-x-4">
                {/* <span className="text-lg text-black font-semibold">5.0</span> */}

                <div className="flex space-x-2">
                  {/* Star icons */}
                  {/* {[...Array(5)].map((_, index) => (
                    // <svg
                    //   key={index}
                    //   xmlns="http://www.w3.org/2000/svg"
                    //   fill="currentColor"
                    //   viewBox="0 0 16 16"
                    //   className="w-5 h-5 text-blue-500"
                    // >
                    //   <path d="M3.612 15.443c-.396.21-.86-.112-.741-.566L4.73 10.5l-4.253-3.937c-.329-.305-.158-.888.283-.95l5.249-.765 2.34-4.705c.197-.396.73-.396.927 0l2.34 4.705 5.249.765c.441.064.612.645.283.95l-4.253 3.937 1.86 4.377c.118.454-.345.776-.741.566L8 13.187l-4.389 2.256z" />
                    // </svg>
                  ))} */}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-4">
              {/* Main large image section */}
              <div className="flex-1 flex items-center justify-center">
                <div className="w-full ">
                  <Image
                    src={selectedImage}
                    width={680}
                    height={511}
                    position="absolute"
                    background-size="cover"
                    background-position="center"
                  />
                </div>
              </div>

              {/* Small image thumbnails */}
              <div className="flex flex-row justify-self-auto gap-3">
                {images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    width={100}
                    height={100}
                    alt={`Thumbnail ${index + 1}`}
                    className={` rounded-[8px] cursor-pointer ${
                      selectedImage === image ? "ring-4 ring-blue-500" : ""
                    }`}
                    onClick={() => setCurrentIndex(index)} // Allow manual selection
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </div>
        <div className="text-[26px] font-[275] mb-4 text-black">
          {" "}
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo.
        </div>
      </div>
      {/* <div className="container pb-24 mx-auto px-20">
        <div className="text-3xl text-black font-extrabold mb-6">Awards</div>
        <li className="text-[19px] font-[300] mb-4 text-black">
          Don Balón Award: 2009, 2010
        </li>
        <li className="text-[19px] font-[300] mb-4 text-black">
          Miguel Muñoz Trophy: 2008–09, 2009–10
        </li>
        <li className="text-[19px] font-[300] mb-4 text-black">
          Onze d'Or Coach of the Year: 2009, 2011, 2012
        </li>
        <li className="text-[19px] font-[300] mb-4 text-black">
          World Soccer Magazine World Manager of the Year: 2009, 2011
        </li>
        <li className="text-[19px] font-[300] mb-4 text-black">
          IFFHS World's Best Club Coach: 2009, 2011,[276] 2023[277]
        </li>
        <li className="text-[19px] font-[300] mb-4 text-black">
          UEFA Team of the Year Best Coach: 2008–09, 2010–11
        </li>
        <li className="text-[19px] font-[300] mb-4 text-black">
          La Liga Coach of the Year: 2009, 2010, 2011, 2012
        </li>
        <li className="text-[19px] font-[300] mb-4 text-black">
          FIFA World Coach of the Year: 2011[278]
        </li>
      </div> */}
      {/* Booking Form Section */}
    </section>
  );
}
