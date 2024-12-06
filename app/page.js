"use client";
import Image from "next/image";
import TestimonialSlider from "/components/TestimonialSlider.js";
import { useEffect, useRef } from "react";
import { ChevronsUpDown } from "lucide-react";

export default function Home() {
  const hasScrolled = useRef(false); // Create a ref to track if the user has clicked to scroll

  const scrollToNextSection = () => {
    const nextSection = document.getElementById("hi");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
      hasScrolled.current = true; // Set to true when user clicks to scroll
    }
  };

  useEffect(() => {
    // Only scroll if the user has clicked the scroll icon
    if (hasScrolled.current) {
      const nextSection = document.getElementById("hi");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []); // The effect runs once on mount

  return (
    <>
      <section>
        <div>
          <div className="h-screen ">
            <video
              className="object-cover h-full w-full absolute"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/homeHeader.mp4" />
            </video>
            <div className="relative h-full  bg-black/50">
              <div className="flex items-center  h-full">
                <div className="container pt-20 text-center mx-auto px-20 ">
                  <div className="font-bold text-white text-[54px]">
                    Manage Your Coaching
                  </div>
                  <div className="font-[275] leading-[37.2px] text-white mx-auto max-w-4xl mt-9 text-[31px]">
                    Transform your coaching experience with our all-in-one
                    platform. Seamlessly manage your schedule, set your
                    locations, and showcase your profile to attract more
                    students.
                  </div>
                  <div className="font-[400] text-white mx-auto max-w-4xl mt-9 text-[31px]">
                    Get started today and simplify your coaching process.
                  </div>
                  <button className="bg-primary font-normal mt-9 rounded-[16px] text-white text-[26px] py-3 px-5 ">
                    Create Your Free Coach Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-10 text-center pb-32 container mx-auto px-20 ">
          <div className=" text-[37px] text-primary font-bold">
            Empowering Coaches to Focus on Coaching, Not Admin Work
          </div>
          <div className="font-normal mt-4 text-[22px] text-primary">
            Scroll Down
          </div>
          <div>
            <div className="w-full mt-4 flex items-center justify-center">
              <div
                className="w-6 cursor-pointer "
                onClick={scrollToNextSection}
              >
                <ChevronsUpDown
                  width={24}
                  height={24}
                  style={{ color: "#037D40" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container pb-32 mx-auto px-20 ">
          <div className="grid items-center gap-20 grid-cols-2">
            <div>
              <div className="w-full ">
                <Image
                  src="/images/home/soccer.png"
                  width={1000}
                  height={500}
                  layout="responsive"
                  alt="soccer"
                />
              </div>
            </div>
            <div className="">
              <div className="text-black font-normal text-[37px] leading-[44.4px] mx-auto max-w-2xl text-center">
                Over 5,000 coaches trust us to manage their schedules and
                connect with new students. Join them and see your coaching
                business grow.
              </div>
              <div className="flex justify-center mt-16">
                <button className="bg-primary  rounded-xl font-normal  text-2xl text-white py-4 px-8 ">
                  Join with Our Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container pb-32 mx-auto px-20 ">
          <div className="grid items-center gap-20 grid-cols-2">
            <div className="">
              <div className="text-black font-bold text-[37px] ">
                Why Choose Us?
              </div>
              <div className="text-black text-[26px] leading-[31.2px] font-[275] mt-12">
                As a coach, your time is valuable, and your expertise deserves
                to be showcased. Our platform is designed with you in mind,
                providing the tools you need to manage your coaching business
                effortlessly. With our intuitive interface, you can focus on
                what you do best – coaching – while we take care of the rest.
                Here’s why thousands of coaches are choosing us to elevate their
                coaching careers:
              </div>
              <div className="mt-8">
                <ul className="list-disc list-inside ">
                  <li className="text-black  text-[26px] leading-[31.2px] font-[275] ">
                    <span className="text-black text-[26px] leading-[31.2px] font-normal">
                      Simplified Scheduling:
                    </span>{" "}
                    Effortlessly manage your coaching schedule and update your
                    availability in real-time.
                  </li>
                  <li className="text-black  text-[26px] leading-[31.2px] font-[275] ">
                    <span className="text-black text-[26px] leading-[31.2px] font-normal">
                      Location Flexibility:
                    </span>{" "}
                    Set and manage multiple coaching locations with ease, making
                    it simple for students to find and book you.
                  </li>
                  <li className="text-black  text-[26px] leading-[31.2px] font-[275] ">
                    <span className="text-black text-[26px] leading-[31.2px] font-normal">
                      {" "}
                      Boost Your Visibility:
                    </span>{" "}
                    Create a detailed coach profile that showcases your
                    expertise, making it easier for students to discover and
                    book your services.
                  </li>
                </ul>
              </div>
              <div className="  mt-5">
                <button className="bg-primary items-center gap-3 flex mt-4 rounded-[8px] text-lg font-normal leading-5  text-white py-[13px] px-6 ">
                  <div> Learn How Our Platform Works</div>
                  <div className="w-6 ">
                    <Image
                      src="/images/home/arrowHorizontal.png"
                      width={1000}
                      height={500}
                      layout="responsive"
                      alt="Scroll Down Icon"
                    />
                  </div>
                </button>
              </div>
            </div>
            <div>
              <div className="w-full ">
                <Image
                  src="/images/home/unsplash.png"
                  width={1000}
                  height={500}
                  layout="responsive"
                  alt="soccer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container pb-32 mx-auto px-20 ">
          <div className="grid items-center gap-20 grid-cols-2">
            <div>
              <div className="w-full ">
                <Image
                  src="/images/home/basket_ball.png"
                  width={1000}
                  height={500}
                  layout="responsive"
                  alt="soccer"
                />
              </div>
            </div>
            <div className="">
              <div className="text-black font-bold text-[37px] leading-[44.4px] ">
                Platform Features Tailored for Coaches
              </div>
              <div className="text-black text-[26px] leading-[31.2px] font-[275] mt-12">
                Our platform is packed with features that cater specifically to
                the needs of coaches and their students. Whether you are managing
                multiple locations or ensuring seamless communication with your
                players, weve got everything you need in one place. Explore the
                tools that will revolutionize how you manage your coaching
                business:
              </div>
              <div className="mt-8">
                <ul className="list-disc list-inside ">
                  <li className="text-black  text-[26px] leading-[31.2px] font-[275] ">
                    <span className="text-black text-[26px] leading-[31.2px] font-normal">
                      {" "}
                      Customisable Coaching Profiles:
                    </span>{" "}
                    Highlight your skills, certifications, and experience.
                  </li>
                  <li className="text-black  text-[26px] leading-[31.2px] font-[275] ">
                    <span className="text-black text-[26px] leading-[31.2px] font-normal">
                      Real-Time Booking System:
                    </span>{" "}
                    Students can see your availability and book sessions
                    instantly.
                  </li>
                  <li className="text-black  text-[26px] leading-[31.2px] font-[275] ">
                    <span className="text-black text-[26px] leading-[31.2px] font-normal">
                      {" "}
                      Location Management:
                    </span>{" "}
                    Add and manage different coaching locations from a single
                    dashboard.
                  </li>
                  <li className="text-black  text-[26px] leading-[31.2px] font-[275] ">
                    <span className="text-black text-[26px] leading-[31.2px] font-normal">
                      Automated Reminders:
                    </span>{" "}
                    Ensure both you and your students never miss a session.
                  </li>
                  <li className="text-black  text-[26px] leading-[31.2px] font-[275] ">
                    <span className="text-black text-[26px] leading-[31.2px] font-normal">
                      Payment Integration:{" "}
                    </span>
                    Secure and straightforward payment processing within the
                    platform.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container pb-10 mx-auto px-20 ">
          <div className="flex items-center  gap-10">
            <div className="flex-grow">
              <div className="text-[37px] font-bold text-black leading-[44.4px]">
                Proven Success for Coaches Like You
              </div>
              <div className="pl-3  mt-8">
                <div className="text-black text-[26px] leading-[31.2px]  font-normal tracking-widest">
                  98% of coaches report improved scheduling efficiency.
                </div>
                <div className="text-black text-[26px] leading-[31.2px]  mt-3  font-normal tracking-widest">
                  85% of coaches have seen an increase in student bookings
                  within the first month.
                </div>
                <div className="text-black text-[26px] leading-[31.2px]  mt-3  font-normal tracking-widest">
                  85% of coaches have seen an increase in student bookings
                  within the first month.
                </div>
                <div className="text-black text-[26px] leading-[31.2px]  mt-3  font-normal tracking-widest">
                  Attend the session and enjoy the experience.
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 w-1/4 flex justify-center  items-center ">
              <div className="w-120 flex justify-center  ">
                <Image
                  src="/images/home/search.png"
                  width={50}
                  height={100}
                  layout="responsive"
                  alt="Basket ball"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="hi" className="">
        <div className="container  mx-auto px-20 ">
          <div className="grid items-center gap-10 grid-cols-2">
            <div className="flex w-full justify-center items-center">
              <div className="w-full  ">
                <Image
                  src="/images/home/cricketer.png"
                  width={0}
                  height={0}
                  layout="responsive"
                  alt="soccer"
                />
              </div>
            </div>
            <div className="">
              <div className="text-5xl font-bold text-black ">Testimonials</div>
              <div className="mt-4">
                <div className="w-1/6 ">
                  <Image
                    src="/images/home/ci_double-quotes-l.png"
                    width={0}
                    height={0}
                    layout="responsive"
                    alt="soccer"
                  />
                </div>
              </div>
              <div>
                <TestimonialSlider />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
