"use client";

import { useState, useEffect } from "react";

const Calendar = ({ selectedDate, setSelectedDate, setShowDataGrid }) => {
  // State for current month and year
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentDate, setCurrentDate] = useState(new Date().getDate()); // Current day of the month

  const handleDateClick = (date) => {
    setSelectedDate(date); // Store the selected date
    setShowDataGrid(true); // Show the data grid
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11); // If it's January, go to December
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0); // If it's December, go to January
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Get the first day of the current month and the number of days in the month
  useEffect(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    updateDaysGrid(firstDay, daysInMonth);
  }, [currentMonth, currentYear]);

  const [daysGrid, setDaysGrid] = useState([]);

  // Renamed the function to avoid conflict
  const updateDaysGrid = (firstDay, daysInMonth) => {
    let grid = Array(35).fill(null); // create a grid with 35 cells (5 rows of 7 days)
    for (let i = 0; i < daysInMonth; i++) {
      grid[i + firstDay] = i + 1;
    }
    setDaysGrid(grid);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <section className="bg-white mx-auto p-6 w-[1182px] h-[577px] ">
      {/* Calendar Layout */}
      <div className="bg-gradient-to-b from-white/25 to-white border border-[#B0CBE2] rounded-[8px]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#B0CBE2] py-4 px-6">
          <button
            className="text-white bg-primary p-2 rounded-full hover:bg-primary-dark transition-all"
            onClick={handlePrevMonth}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="39.6px"
              height="39.6px"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
          <h5 className="text-[42.91px] font-semibold text-primary">
            {months[currentMonth]} {currentYear}
          </h5>
          <button
            className="text-white bg-primary p-2 rounded-full hover:bg-primary-dark transition-all"
            onClick={handleNextMonth}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="39.6px"
              height="39.6px"
              fill="none"
              viewBox="0 0 16 16"
            >
              <path
                d="M6.00236 3.99707L10.0025 7.99723L6 11.9998"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </button>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 bg-white border-b border-[#B0CBE2] text-[14.84px] uppercase">
          {[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].map((day) => (
            <div
              key={day}
              className="py-3 text-center font-medium text-primary border-r last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Dates Grid */}
        <div className="grid grid-cols-7">
          {daysGrid.map((day, idx) => (
            <div
              key={idx}
              className={`h-20 flex items-center justify-center border-r border-b border-[#B0CBE2] ${
                day === null ? "bg-[#E6F2EC]" : "bg-white"
              } hover:bg-[#eff8ef] cursor-pointer transition`}
              onClick={() => day && handleDateClick(day)}
            >
              <span
                className={`text-lg font-semibold text-primary ${
                  day === currentDate &&
                  currentMonth === new Date().getMonth() &&
                  currentYear === new Date().getFullYear()
                    ? "bg-white border border-primary   rounded-full w-8 h-8 flex items-center justify-center"
                    : ""
                }`}
              >
                {day || ""}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
