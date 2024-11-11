import React, { useState, Fragment } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Dialog, Transition } from "@headlessui/react";
import Form from "./Form"; // Import the Form component
import TimePicker from 'react-time-picker'; // Import TimePicker
import 'react-time-picker/dist/TimePicker.css'; // Import default styles for TimePicker

export default function Calendar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null); // No default time
  const [showForm, setShowForm] = useState(false); // State to manage form visibility

  function closeModal() {
    setIsOpen(false);
    setShowForm(false); // Reset form visibility when modal is closed
    setSelectedDate(null); // Reset selected date
    setSelectedTime(null); // Reset selected time
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleNext = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }
    console.log("Selected Date:", selectedDate);
    console.log("Selected Time:", selectedTime);
    setShowForm(true); // Show the Form component
  };

  const handleSubmit = async () => {
    // Prepare the data to be sent to the database
    const appointmentData = {
      date: selectedDate,
      time: selectedTime,
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
                          onChange={(date) => setSelectedDate(date)}
                          inline
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow p-2 w-full"
                        />
                        <label className="text-sm font-medium text-gray-900 dark:text-white mt-4 block">
                          Pick your time
                        </label>
                        <TimePicker
                          onChange={(time) => setSelectedTime(time)}
                          value={selectedTime}
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow p-2 w-full"
                          clearIcon={null} // Hides the clear icon
                          clockIcon={null} // Hides the clock icon
                        />
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
                      <Form 
                        selectedDate={selectedDate} 
                        selectedTime={selectedTime} 
                        closeModal={closeModal} 
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