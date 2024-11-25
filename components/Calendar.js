"use client"

import React, { useState, Fragment, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, Transition } from "@headlessui/react";
import Form from "./Form"; 
import axios from "axios";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import dayjs from 'dayjs';

export default function Calendar() {
  const { data: session } = useSession();
  const { coachId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null); // No default time
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const [timeSlots, setTimeSlots] = useState([]); 

  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        const response = await axios.get(`/api/available_dates?coachId=${coachId}`);
        const datesWithTimeSlots = response.data.map(date => ({
          date: new Date(date.date),
          timeSlots: date.timeSlots || [], // Ensure timeSlots is an array
        }));
        setAvailableDates(datesWithTimeSlots);
      } catch (error) {
        console.error("Error fetching available dates:", error);
      }
    };

    fetchAvailableDates();
  }, [coachId]);

  const handleDateSelection = (date) => {
    const selectedAvailableDate = availableDates.find(availableDate => availableDate.date.toDateString() === date.toDateString());
  
    if (selectedAvailableDate) {
      setSelectedDate(date);
      setSelectedTime(null); // Reset selected time when a new date is selected
  
      // Set time slots from the selected available date
      setTimeSlots(selectedAvailableDate.timeSlots); // Assuming timeSlots is an array in the available date object
    } else {
      alert("Selected date is not available.");
    }
  };

  function closeModal() {
    setIsOpen(false);
    setShowForm(false); 
    setSelectedDate(null); 
    setSelectedTime(null); 
    setTimeSlots([]); // Reset time slots when closing the modal
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleNext = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }
    setShowForm(true); // Show the Form component
  };

  

  const handleSubmit = async () => {
    // Format date and time to a consistent format
    const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
    const appointmentData = {
      date: formattedDate,
      time: selectedTime, // Use selectedTime directly
    };

    // Example API call to send data to the database
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Appointment saved:', result);
      // Optionally close modal or reset state
      closeModal();
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  };
  

  return (
    <>
      <button
        onClick={openModal}
        className="bg-[#037D40] text-white font-semibold rounded-md flex items-center"
      >
        Book Me
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900 dark:text-white"
                  >
                    Schedule an appointment
                  </Dialog.Title>
                  <div className="mt-4">
                    {!showForm ? (
                      <>
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateSelection}
                          inline
                          filterDate={(date) => availableDates.some(availableDate => availableDate.date.toDateString() === date.toDateString())} // Only allow available dates
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow p-2 w-full"
                        />
                        <label className="text-sm font-medium text-gray-900 dark:text-white mt-4 block">
                          Pick your time
                        </label>
                        <ul id="timetable" className="grid w-full grid-cols-2 gap-2 mt-5">
                        {Array.isArray(timeSlots) && timeSlots.length > 0 ? (
                          timeSlots.map((timeSlot) => (
                            <li key={timeSlot}>
                              <input
                                type="radio"
                                id={timeSlot.replace(/:/g, "-").replace(/\s/g, "-")} // Replace ':' and spaces for valid id
                                value={timeSlot}
                                className="hidden peer"
                                name="timetable"
                                onChange={() => setSelectedTime(timeSlot)} // Update selectedTime on change
                              />
                              <label
                                htmlFor={timeSlot.replace(/:/g, "-").replace(/\s/g, "-")}
                                className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
                              >
                                {timeSlot}
                              </label>
                            </li>
                          ))
                        ) : (
                          <li>No available time slots for this date.</li> // Fallback message
                        )}
                        </ul>
                        <div className="mt-4 flex justify-end">
                          <button
                            type="button"
                            className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
                            onClick={handleNext} // Navigate to the form
                          >
                            Next
                          </button>
                        </div>
                      </>
                    ) : (
                      <Form 
                        selectedDate={selectedDate} 
                        selectedTime={selectedTime} 
                        closeModal={closeModal} 
                        coachId={coachId}
                        handleSubmit={handleSubmit} // Pass handleSubmit to the Form
                      />
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}