// "use client";
// import Image from "next/image";
// import TestimonialSlider from "/components/TestimonialSlider.js";
// import { useEffect } from "react";

// export default function Home() {
//   const nextSection = document.getElementById("hi"); // Change this to the ID of the section you want to scroll to
//   if (nextSection) {
//     nextSection.scrollIntoView({ behavior: "smooth" }); // Smooth scroll to the next section
//   }

//   return (
//     <>
//       <section>
//         <div>
//           <div className="h-screen ">
//             <video
//               className="object-cover h-full w-full absolute"
//               autoPlay
//               muted
//               loop
//               playsInline
//             >
//               <source src="/homeHeader.mp4" />
//             </video>
//             <div className="relative h-full  bg-black/50">
//               <div className="flex items-center  h-full">
//                 <div className="container pt-20 text-center mx-auto px-20 ">
//                   <div className="font-extrabold text-5xl">
//                     Manage Your Coaching
//                   </div>
//                   <div className="font-thin mx-auto max-w-4xl mt-9 text-2xl">
//                     Transform your coaching experience with our all-in-one
//                     platform. Seamlessly manage your schedule, set your
//                     locations, and showcase your profile to attract more
//                     students.
//                   </div>
//                   <div className="font-light mx-auto max-w-4xl mt-9 text-3xl">
//                     Get started today and simplify your coaching process.
//                   </div>
//                   <button className="bg-blue-600 mt-9 rounded-xl text-white text-2xl py-3 px-5 ">
//                     Create Your Free Coach Profile
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section>
//         <div className="mt-10 text-center pb-32 ">
//           <div className=" text-3xl text-blue-600 font-extrabold">
//             Empowering Coaches to Focus on Coaching, Not Admin Work
//           </div>
//           <div className="text-extrabold mt-4 text-xl text-blue-600">
//             Scroll Down
//           </div>
//           <div>
//             {" "}
//             <div className="w-full mt-4 flex items-center justify-center">
//               <div className="w-5 cursor-pointer" onClick={scrollToNextSection}>
//                 <Image
//                   src="/images/home/arrow.png"
//                   width={1000}
//                   height={500}
//                   layout="responsive"
//                   alt="Scroll Down Icon"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section>
//         <div className="container pb-32 mx-auto px-20 ">
//           <div className="grid items-center gap-20 grid-cols-2">
//             <div>
//               <div className="w-full ">
//                 <Image
//                   src="/images/home/soccer.png"
//                   width={1000}
//                   height={500}
//                   layout="responsive"
//                   alt="soccer"
//                 />
//                 {/* <img
//                           src="/images/home/section-1.gif"
//                           alt="NFT Auto Store"
//                         /> */}
//               </div>
//             </div>
//             <div className="">
//               <div className="text-black font-semibold text-3xl mx-auto max-w-xl text-center">
//                 Over 5,000 coaches trust us to manage their schedules and
//                 connect with new students. Join them and see your coaching
//                 business grow.
//               </div>
//               <div className="flex justify-center mt-10">
//                 <button className="bg-blue-600  rounded-xl  text-2xl text-white py-3 px-6 ">
//                   Join with Our Team
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section>
//         <div className="container pb-32 mx-auto px-20 ">
//           <div className="grid items-center gap-20 grid-cols-2">
//             <div className="">
//               <div className="text-black font-extrabold text-3xl ">
//                 Why Choose Us?
//               </div>
//               <div className="text-black text-xl font-extralight mt-10">
//                 As a coach, your time is valuable, and your expertise deserves
//                 to be showcased. Our platform is designed with you in mind,
//                 providing the tools you need to manage your coaching business
//                 effortlessly. With our intuitive interface, you can focus on
//                 what you do best – coaching – while we take care of the rest.
//                 Here’s why thousands of coaches are choosing us to elevate their
//                 coaching careers:
//               </div>
//               <div className="mt-5">
//                 <ul className="list-disc list-inside space-y-2">
//                   <li className="text-black  text-xl font-extralight ">
//                     Simplified Scheduling: Effortlessly manage your coaching
//                     schedule and update your availability in real-time.
//                   </li>
//                   <li className="text-black  text-xl font-extralight ">
//                     Location Flexibility: Set and manage multiple coaching
//                     locations with ease, making it simple for students to find
//                     and book you.
//                   </li>
//                   <li className="text-black  text-xl font-extralight ">
//                     Boost Your Visibility: Create a detailed coach profile that
//                     showcases your expertise, making it easier for students to
//                     discover and book your services."
//                   </li>
//                 </ul>
//               </div>
//               <div className="  mt-5">
//                 <button className="bg-blue-600 mt-4 rounded-xl text-xl  text-white py-3 px-6 ">
//                   Learn How Our Platform Works
//                 </button>
//               </div>
//             </div>
//             <div>
//               <div className="w-full ">
//                 <Image
//                   src="/images/home/unsplash.png"
//                   width={1000}
//                   height={500}
//                   layout="responsive"
//                   alt="soccer"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section>
//         <div className="container pb-32 mx-auto px-20 ">
//           <div className="grid items-center justify-center gap-10 grid-cols-2">
//             <div className="w-full">
//               <Image
//                 src="/images/home/BasketBall.png"
//                 width={1000}
//                 height={1000}
//                 layout="responsive"
//                 alt="soccer"
//               />
//             </div>

//             <div className="">
//               <div className="text-black font-extrabold text-3xl ">
//                 Platform Features Tailored for Coaches
//               </div>
//               <div className="text-black text-xl font-light mt-10">
//                 Our platform is packed with features that cater specifically to
//                 the needs of coaches and their students. Whether you're managing
//                 multiple locations or ensuring seamless communication with your
//                 players, we’ve got everything you need in one place. Explore the
//                 tools that will revolutionize how you manage your coaching
//                 business:
//               </div>
//               <div className="mt-5">
//                 <ul className="list-disc list-inside space-y-2">
//                   <li className="text-black text-xl font-light">
//                     Customisable Coaching Profiles: Highlight your skills,
//                     certifications, and experience.
//                   </li>
//                   <li className="text-black text-xl font-light">
//                     Real-Time Booking System: Students can see your availability
//                     and book sessions instantly.
//                   </li>
//                   <li className="text-black text-xl font-light">
//                     Location Management: Add and manage different coaching
//                     locations from a single dashboard.
//                   </li>
//                   <li className="text-black text-xl font-light">
//                     Automated Reminders: Ensure both you and your students never
//                     miss a session.
//                   </li>
//                   <li className="text-black text-xl font-light">
//                     Payment Integration: Secure and straightforward payment
//                     processing within the platform.
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section>
//         <div className="container pb-10 mx-auto px-20 ">
//           <div className="flex items-center  gap-10">
//             <div className="flex-grow">
//               <div className="text-3xl font-extrabold text-black ">
//                 Proven Success for Coaches Like You
//               </div>
//               <div className="pl-3  mt-10">
//                 <div className="text-black text-xl font-semibold tracking-widest">
//                   98% of coaches report improved scheduling efficiency.
//                 </div>
//                 <div className="text-black text-xl font-semibold tracking-widest">
//                   85% of coaches have seen an increase in student bookings
//                   within the first month.
//                 </div>
//                 <div className="text-black text-xl font-semibold tracking-widest">
//                   85% of coaches have seen an increase in student bookings
//                   within the first month.
//                 </div>
//                 <div className="text-black text-xl font-semibold tracking-widest">
//                   Attend the session and enjoy the experience.
//                 </div>
//               </div>
//             </div>
//             <div className="flex-shrink-0 w-1/4 flex justify-center  items-center ">
//               <div className="w-120 flex justify-center  ">
//                 <Image
//                   src="/images/home/search.png"
//                   width={50}
//                   height={100}
//                   layout="responsive"
//                   alt="Basket ball"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section id="hi" className="">
//         <div className="container  mx-auto px-20 ">
//           <div className="grid items-center gap-10 grid-cols-2">
//             <div className="flex w-full justify-center items-center">
//               <div className="w-full  ">
//                 <Image
//                   src="/images/home/cricketer.png"
//                   width={0}
//                   height={0}
//                   layout="responsive"
//                   alt="soccer"
//                 />
//               </div>
//             </div>
//             <div className="">
//               <div className="text-4xl font-extrabold text-black ">
//                 Testimonials
//               </div>
//               <div className="mt-4">
//                 <div className="w-1/6 ">
//                   <Image
//                     src="/images/home/ci_double-quotes-l.png"
//                     width={0}
//                     height={0}
//                     layout="responsive"
//                     alt="soccer"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <TestimonialSlider />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

"use client";
import Image from "next/image";
import TestimonialSlider from "/components/TestimonialSlider.js";
import { useEffect, useRef } from "react";

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
                  <div className="font-extrabold text-5xl">
                    Manage Your Coaching
                  </div>
                  <div className="font-thin mx-auto max-w-4xl mt-9 text-2xl">
                    Transform your coaching experience with our all-in-one
                    platform. Seamlessly manage your schedule, set your
                    locations, and showcase your profile to attract more
                    students.
                  </div>
                  <div className="font-light mx-auto max-w-4xl mt-9 text-3xl">
                    Get started today and simplify your coaching process.
                  </div>
                  <button className="bg-blue-600 mt-9 rounded-xl text-white text-2xl py-3 px-5 ">
                    Create Your Free Coach Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="mt-10 text-center pb-32 ">
          <div className=" text-3xl text-blue-600 font-extrabold">
            Empowering Coaches to Focus on Coaching, Not Admin Work
          </div>
          <div className="text-extrabold mt-4 text-xl text-blue-600">
            Scroll Down
          </div>
          <div>
            <div className="w-full mt-4 flex items-center justify-center">
              <div className="w-5 cursor-pointer" onClick={scrollToNextSection}>
                <Image
                  src="/images/home/arrow.png"
                  width={1000}
                  height={500}
                  layout="responsive"
                  alt="Scroll Down Icon"
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
              <div className="text-black font-semibold text-3xl mx-auto max-w-xl text-center">
                Over 5,000 coaches trust us to manage their schedules and
                connect with new students. Join them and see your coaching
                business grow.
              </div>
              <div className="flex justify-center mt-10">
                <button className="bg-blue-600  rounded-xl  text-2xl text-white py-3 px-6 ">
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
              <div className="text-black font-extrabold text-3xl ">
                Why Choose Us?
              </div>
              <div className="text-black text-xl font-extralight mt-10">
                As a coach, your time is valuable, and your expertise deserves
                to be showcased. Our platform is designed with you in mind,
                providing the tools you need to manage your coaching business
                effortlessly. With our intuitive interface, you can focus on
                what you do best – coaching – while we take care of the rest.
                Here’s why thousands of coaches are choosing us to elevate their
                coaching careers:
              </div>
              <div className="mt-5">
                <ul className="list-disc list-inside space-y-2">
                  <li className="text-black  text-xl font-extralight ">
                    Simplified Scheduling: Effortlessly manage your coaching
                    schedule and update your availability in real-time.
                  </li>
                  <li className="text-black  text-xl font-extralight ">
                    Location Flexibility: Set and manage multiple coaching
                    locations with ease, making it simple for students to find
                    and book you.
                  </li>
                  <li className="text-black  text-xl font-extralight ">
                    Boost Your Visibility: Create a detailed coach profile that
                    showcases your expertise, making it easier for students to
                    discover and book your services.
                  </li>
                </ul>
              </div>
              <div className="  mt-5">
                <button className="bg-blue-600 mt-4 rounded-xl text-xl  text-white py-3 px-6 ">
                  Learn How Our Platform Works
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
        <div className="container pb-10 mx-auto px-20 ">
          <div className="flex items-center  gap-10">
            <div className="flex-grow">
              <div className="text-3xl font-extrabold text-black ">
                Proven Success for Coaches Like You
              </div>
              <div className="pl-3  mt-10">
                <div className="text-black text-xl font-semibold tracking-widest">
                  98% of coaches report improved scheduling efficiency.
                </div>
                <div className="text-black text-xl font-semibold tracking-widest">
                  85% of coaches have seen an increase in student bookings
                  within the first month.
                </div>
                <div className="text-black text-xl font-semibold tracking-widest">
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
              <div className="text-4xl font-extrabold text-black ">
                Testimonials
              </div>
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
