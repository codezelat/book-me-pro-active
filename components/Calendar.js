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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isIndividualSession, setIsIndividualSession] = useState(null); // null, "yes", or "no"


  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        const response = await axios.get(`/api/available_dates?coachId=${coachId}`);
        const datesWithTimeSlots = response.data.map(date => ({
          date: new Date(date.date),
          timeSlots: date.timeSlots || [],
          
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
      setTimeSlots(selectedAvailableDate.timeSlots); 
    } else {
      alert("Selected date is not available.");
    }
  };

  const handleTimeSelect = (timeSlot) => {
    setSelectedTime(timeSlot);
    setIsPopupOpen(true); // Show the modal for session type selection
  };

  const handleSessionType = async (sessionType) => {
    const isIndividualSession = sessionType === 'true'; // Determine if the session is individual
    setIsIndividualSession(isIndividualSession); // Set session type state
    setIsPopupOpen(false); // Close the modal
  
    try {
      // Fetch appointments for the specific coach ID and date
      const response = await fetch(`/api/appointments?coachId=${coachId}&date=${dayjs(selectedDate).format("YYYY-MM-DD")}`);
      if (!response.ok) {
        throw new Error('Error fetching appointments');
      }
  
      const appointments = await response.json();
  
      // Check if any appointment exists at the selected time
      const existingAppointment = appointments.find(appointment => appointment.time === selectedTime);
      
      // Determine if booking is allowed
      const isSessionAllowed = !isIndividualSession || (isIndividualSession && !existingAppointment);

        // Check booking condition
      if (existingAppointment) {
        // Appointment exists at the selected time
        if (isIndividualSession && existingAppointment.individualSession) {
          alert("Booking not allowed: An individual session is already booked at this time.");
          return; // Prevent booking
        } else {
          alert("Booking allowed: You can book this time slot.");
        }
      } else {
        // No existing appointment at the selected time
        if (!isIndividualSession) {
          alert("Booking allowed: No existing appointment. You can book a group session.");
        } else {
          alert("Booking allowed: No existing appointment. You can book an individual session.");
        }
      }
    } catch (error) {
      console.error('Error handling session type:', error);
      alert("An error occurred while fetching appointments.");
    }
  };
  

  function closeModal() {
    setIsOpen(false);
    setShowForm(false); 
    setSelectedDate(null); 
    setSelectedTime(null); 
    setIsIndividualSession(null)
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
    if (isPopupOpen) {
      alert("Please complete the session type selection.");
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
      isIndividualSession,
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
                    className="text-2xl font-bold leading-6 text-gray-900 dark:text-white"
                  >
                    Schedule an appointment
                  </Dialog.Title>
                  <div className="mt-6">
                    {!showForm ? (
                      <>
                        <DatePicker
                          selected={selectedDate}
                          onChange={handleDateSelection}
                          inline
                          filterDate={(date) => availableDates.some(availableDate => availableDate.date.toDateString() === date.toDateString())} // Only allow available dates
                          className="bg-gray-50 dark:bg-green-500 rounded-lg shadow p-3 w-full text-xl"
                        />
                        <label className="text-lg font-medium text-gray-900 dark:text-white mt-4 block">
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
                                // onChange={() => setSelectedTime(timeSlot)} // Update selectedTime on change
                                onChange={() => handleTimeSelect(timeSlot)}
                              />
                              <label
                                htmlFor={timeSlot.replace(/:/g, "-").replace(/\s/g, "-")}
                                className="inline-flex items-center justify-center w-full p-3 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-green-500 border-green-500 dark:hover:text-white dark:border-green-500 dark:peer-checked:border-green-500 peer-checked:border-green-500 peer-checked:bg-[#037D40] hover:text-white peer-checked:text-white hover:bg-green-500 dark:text-green-500 dark:bg-gray-900 dark:hover:bg-green-800 dark:hover:border-green-800 dark:peer-checked:bg-green-800"
                              >
                                {timeSlot}
                              </label>
                            </li>
                          ))
                        ) : (
                          <li className="text-lg text-gray-600">No available time slots for this date.</li> // Fallback message
                        )}
                        </ul>

                        {/* Modal for session type selection */}
                        {isPopupOpen && (
                          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
                            <h2 className="text-2xl font-semibold mb-4">Select Session Type</h2>
                            <div className="flex flex-col space-y-4">
                              <button 
                                onClick={() => handleSessionType('true')} 
                                className="bg-green-500 text-white py-2 rounded hover:bg-#028A3B transition duration-200"
                              >
                                Individual Session
                              </button>
                              <button 
                                onClick={() => handleSessionType('false')} 
                                className="bg-green-500 text-white py-2 rounded hover:bg-green-800 transition duration-200"
                              >
                                Group Session
                              </button>
                              <button 
                                onClick={() => setIsPopupOpen(false)} 
                                className="bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition duration-200"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                          )}
                        );

                        <div className="mt-4 flex justify-end">
                          <button
                            type="button"
                            className="text-white bg-green-500 hover:bg-green-800 font-medium rounded-lg text-sm px-4 py-2"
                            onClick={handleNext} // Navigate to the form
                            disabled={!selectedDate || !selectedTime || isPopupOpen} // Disable if conditions not met
                          >
                            Next
                          </button>
                        </div>
                      </>
                    ) : (
                      <Form 
                        selectedDate={selectedDate} 
                        selectedTime={selectedTime} 
                        isIndividualSession={isIndividualSession}
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