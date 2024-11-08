// Calendar.js
import React, { useState, Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import Form from "./Form"; // Import the Form component

export default function Calendar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  const timeslots = [
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "01:00 PM",
    "01:30 PM",
    "02:00 PM",
    "02:30 PM",
    "03:00 PM",
  ];

  function closeModal() {
    setIsOpen(false);
    setShowForm(false); // Reset form visibility when modal is closed
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

  return (
    <>
      <button
        onClick={openModal}
        className="bg-[#037D40] text-white font-semibold  rounded-md flex items-center "
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
                          onChange={(date) => setSelectedDate(date)}
                          inline
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow p-2 w-full"
                        />
                        <label className="text-sm font-medium text-gray-900 dark:text-white mt-4 block">
                          Pick your time
                        </label>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {timeslots.map((time, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedTime(time)}
                              className={`inline-flex items-center justify-center w-full px-2 py-1 text-sm font-medium rounded-lg cursor-pointer ${
                                selectedTime === time
                                  ? "bg-blue-600 text-white"
                                  : "bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                        <div className="mt-4 flex justify-end">
                          <button
                            type="button"
                            className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
                            onClick={handleNext}
                          >
                            Next
                          </button>
                        </div>
                      </>
                    ) : (
                      <Form />
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
