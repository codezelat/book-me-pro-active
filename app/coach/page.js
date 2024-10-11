"use client";
import { useState, useEffect } from "react";

export default function Coach() {
  // List of image URLs for small thumbnails
  const images = [
    "/images/coach/coach.png",
    "/images/coach/coach1.png",
    "/images/coach/coach3.png",
    "/images/coach/coach2.png",
    "/images/coach/coach4.png",
    "/images/coach/coach5.png",
  ];

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

  return (
    <>
      <section>
        <div className="container pt-24 mx-auto px-20">
          <div className="grid py-24 justify-center gap-10 grid-cols-2 items-center">
            <div>
              <div className="text-4xl text-black font-extrabold mb-6">
                Josep "Pep" Guardiola Sala
              </div>
              <div className="text-3xl font-bold text-black mb-6">
                World class football manager
              </div>
              <div className="text-xl text-black mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo $1,000 per hour
              </div>
              <div className="text-black text-2xl mb-6  font-semibold">
                $1,000 per hour
              </div>

              <div className="flex items-center space-x-8">
                <button className="bg-blue-600 text-white font-semibold py-3 px-8  rounded-md flex items-center space-x-4">
                  <span>📅</span>
                  <span>BookMe</span>
                </button>

                <div className="flex items-center space-x-4">
                  <span className="text-lg text-black font-semibold">5.0</span>

                  <div className="flex space-x-2">
                    {/* Star icons */}
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        className="w-5 h-5 text-blue-500"
                      >
                        <path d="M3.612 15.443c-.396.21-.86-.112-.741-.566L4.73 10.5l-4.253-3.937c-.329-.305-.158-.888.283-.95l5.249-.765 2.34-4.705c.197-.396.73-.396.927 0l2.34 4.705 5.249.765c.441.064.612.645.283.95l-4.253 3.937 1.86 4.377c.118.454-.345.776-.741.566L8 13.187l-4.389 2.256z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="flex flex-col gap-4">
                {/* Main large image section */}
                <div className="flex-1 flex items-center justify-center">
                  <img src={selectedImage} alt="Selected" className="w-full" />
                </div>

                {/* Small image thumbnails */}
                <div className="flex flex-row gap-4">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-16 h-16 rounded-lg cursor-pointer ${
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
      </section>
      <section>
        <div className="container pb-24 mx-auto px-20">
          <div className="text-3xl text-black font-extrabold mb-6">
            Description
          </div>
          <div className="text-xl mb-4 text-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
          <div className="text-xl text-black">
            {" "}
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo.
          </div>
        </div>
      </section>
      <section>
        <div className="container pb-24 mx-auto px-20">
          <div className="text-3xl text-black font-extrabold mb-6">Awards</div>
          <li className="text-xl mb-2 text-black">
            Don Balón Award: 2009, 2010
          </li>
          <li className="text-xl mb-2 text-black">
            Miguel Muñoz Trophy: 2008–09, 2009–10
          </li>
          <li className="text-xl mb-2 text-black">
            Onze d'Or Coach of the Year: 2009, 2011, 2012
          </li>
          <li className="text-xl mb-2 text-black">
            World Soccer Magazine World Manager of the Year: 2009, 2011
          </li>
          <li className="text-xl mb-2 text-black">
            IFFHS World's Best Club Coach: 2009, 2011,[276] 2023[277]
          </li>
          <li className="text-xl mb-2 text-black">
            UEFA Team of the Year Best Coach: 2008–09, 2010–11
          </li>
          <li className="text-xl mb-2 text-black">
            La Liga Coach of the Year: 2009, 2010, 2011, 2012
          </li>
          <li className="text-xl mb-2 text-black">
            FIFA World Coach of the Year: 2011[278]
          </li>
        </div>
      </section>
    </>
  );
}
