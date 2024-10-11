import Image from "next/image";
import TeamMemberCard from "/components/TeamMemberCard";

export default function About() {
  const teamMembers = [
    {
      name: "Guy Hawkins",
      quote:
        "We strive to challenge ourselves for a better tomorrow by creating meaningful designs that enrich lives and maintain lasting relevance.",
      image: "/images/about/teamMember.png",
    },
    {
      name: "Guy Hawkins",
      quote:
        "Together, we challenge ourselves for a better tomorrow by meaningful designs that help live our best life and maintain lasting relevance.",
      image: "/images/about/teamMember.png",
    },
    {
      name: "Guy Hawkins",
      quote:
        "Together, we challenge ourselves for a better tomorrow by meaningful designs that help live our best life and maintain lasting relevance.",
      image: "/images/about/teamMember.png",
    },
    {
      name: "Guy Hawkins",
      quote:
        "Together, we challenge ourselves for a better tomorrow by meaningful designs that help live our best life and maintain lasting relevance.",
      image: "/images/about/teamMember.png",
    },
    // Add more team members here...
  ];
  return (
    <>
      <section>
        <div>
          <div className="flex items-center pt-40  h-full">
            <div className="container text-center mx-auto px-20 ">
              <div className=" text-black font-extrabold text-5xl">
                Booking Your Coaching Sessions{" "}
              </div>
              <div className=" mt-4 font-extrabold text-black text-5xl">
                Just Got Easier
              </div>
              <div className=" text-black font-thin mx-auto max-w-7xl mt-9 text-3xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container pb-20 text-center mx-auto px-20 ">
          <div className="flex justify-center mt-16 items-center ">
            <div className="grid items-center grid-cols-3 gap-4 md:grid-cols-5 w-full px-4">
              {/* Left side images */}
              <div className="col-span-1 flex flex-col gap-4">
                <div className="w-full">
                  <Image
                    src="/images/about/SilderCol31.png" // Replace with your image path
                    width={500}
                    height={300}
                    layout="responsive"
                    alt="Soccer Image 1"
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-4">
                <div className="w-full">
                  <Image
                    src="/images/about/SilderCol21.png" // Replace with your image path
                    width={500}
                    height={300}
                    layout="responsive"
                    alt="Soccer Image 1"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="w-full">
                  <Image
                    src="/images/about/SilderCol22.png" // Replace with your image path
                    width={500}
                    height={300}
                    layout="responsive"
                    alt="Soccer Image 2"
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>

              {/* Center image */}
              <div className="col-span-1 md:col-span-1">
                <div className="w-full">
                  <Image
                    src="/images/about/SliderMain.png" // Replace with your image path
                    width={1000}
                    height={600}
                    layout="responsive"
                    alt="Main Sport Image"
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>

              {/* Right side images */}
              <div className="col-span-1 flex flex-col gap-4">
                <div className="w-full">
                  <Image
                    src="/images/about/SilderCol23.png" // Replace with your image path
                    width={500}
                    height={300}
                    layout="responsive"
                    alt="Sport Image 4"
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="w-full">
                  <Image
                    src="/images/about/SilderCol24.png" // Replace with your image path
                    width={500}
                    height={300}
                    layout="responsive"
                    alt="Sport Image 5"
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>

              {/* Additional images */}
              <div className="col-span-1 flex flex-col gap-4">
                <div className="w-full">
                  <Image
                    src="/images/about/SilderCol32.png" // Replace with your image path
                    width={500}
                    height={300}
                    layout="responsive"
                    alt="Soccer Image 1"
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container pt-24 mx-auto px-20 ">
          <div className="grid grid-cols-9 gap-10 items-center  ">
            <div className="col-span-5">
              <div className="text-4xl font-extrabold text-black ">Vision</div>
              <div className="text-black mt-6 max-w-7xl font-thin   text-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo
              </div>
            </div>

            <div className=" col-span-4 ">
              <div className="w-3/4 flex justify-center  ">
                <Image
                  src="/images/about/vission.png"
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
      <section>
        <div className="container py-24 mx-auto px-20 ">
          <div className="grid grid-cols-9  items-center  ">
            <div className=" col-span-4 ">
              <div className="w-3/4 flex justify-center  ">
                <Image
                  src="/images/about/Mission.png"
                  width={50}
                  height={100}
                  layout="responsive"
                  alt="Basket ball"
                />
              </div>
            </div>
            <div className="col-span-5">
              <div className="text-4xl font-extrabold text-black  ">Mission</div>
              <div className="text-black mt-6 font-thin max-w-7xl   text-2xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-24 mx-auto px-20 ">
          <div>
            <div className="text-4xl font-extrabold text-black text-center">
              Behind The Screen
            </div>
            <div className="text-black font-thin mt-6 max-w-5xl mx-auto text-center  text-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo.
            </div>
            <div>
              <div className="grid mt-6  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
                {teamMembers.map((member, index) => (
                  <TeamMemberCard
                    key={index}
                    name={member.name}
                    quote={member.quote}
                    image={member.image}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
