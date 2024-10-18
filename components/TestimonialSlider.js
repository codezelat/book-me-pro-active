// components/TestimonialSlider.js
"use client";
import { useState } from "react";

const testimonials = [
  {
    text: "Lorem ipsum dolor sit amet consectetur. Adipiscing ut nisi leo nibh eros in. Sed nulla quis scelerisque vitae. Fringilla massa facilisis non mattis mauris nisl. Dui ut hendrerit fames imperdiet proin nisl sit mauris.",
    author: "Francis Towne",
    role: "Future Response Technician",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur. Adipiscing ut nisi leo nibh eros in. Sed nulla quis scelerisque vitae. Fringilla massa facilisis non mattis mauris nisl. Dui ut hendrerit fames imperdiet proin nisl sit mauris.",
    author: "John Doe",
    role: "Project Manager",
  },
  {
    text: "Lorem ipsum dolor sit amet consectetur. Adipiscing ut nisi leo nibh eros in. Sed nulla quis scelerisque vitae. Fringilla massa facilisis non mattis mauris nisl. Dui ut hendrerit fames imperdiet proin nisl sit mauris.",
    author: "Jane Smith",
    role: "Design Lead",
  },
  // Add more testimonials here if needed
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handlers to navigate between testimonials
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full flex flex-col justify-center  space-y-8">
      {/* Testimonial Content */}
      <div className="">
        <p className="text-2xl mt-8   font-thin text-black">
          {testimonials[currentIndex].text}
        </p>
        <p className="mt-8 text-2xl text-black font-normal">
          {testimonials[currentIndex].author}
        </p>
        <p className="text-lg  font-normal text-black">
          {testimonials[currentIndex].role}
        </p>
      </div>

      {/* Slider Navigation */}
      <div className="flex  items-center justify-between">
        <div className="flex  items-center space-x-5">
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="p-3 bg-blue-600 text-white rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex items-center space-x-5">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  currentIndex === index ? "bg-blue-600" : "bg-gray-300"
                }`}
                onClick={() => handleDotClick(index)}
              ></div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="p-3 bg-blue-600 text-white rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        {/* Explore All Button */}
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg">
          Explore All
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
