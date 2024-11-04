// Calendar.js
import React, { useState, Fragment } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';

export default function Calendar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [trainerId, setTrainerId] = useState(''); // You might want to use a dropdown or populate this dynamically
  
  const timeslots = [
    '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM'
  ];

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select a date and time.");
      return;
    }

    // Combine selected date and time
    const appointmentDate = new Date(selectedDate);
    const [hour, minute] = selectedTime.split(':');
    const ampm = selectedTime.slice(-2);
    appointmentDate.setHours(ampm === 'PM' ? +hour + 12 : +hour, +minute);

    const appointmentData = {
      bookedAt: appointmentDate.toISOString(),
      clientEmail,
      clientPhoneNo,
      clientName,
      clientNotes,
    };

    try {
      const response = await axios.post('/api/appointments', appointmentData);
      if (response.status === 201) {
        alert("Appointment created successfully!");
        closeModal();
        // Reset the form after successful submission
        setSelectedDate(null);
        setSelectedTime(null);
        setClientEmail('');
        setClientPhoneNo('');
        setClientName('');
        setClientNotes('');
        
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
      alert("Failed to create appointment. Please try again.");
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
      >
        <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
        </svg>
        Schedule appointment
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
                  <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                    Schedule an appointment
                  </Dialog.Title>
                  <div className="mt-4">
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
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                 
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2"
                      onClick={handleSubmit}
                    >
                      Confirm Appointment
                    </button>
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

