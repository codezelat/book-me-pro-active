// components/Form.js
import React, { useState } from "react";

const Form = ({ selectedDate, selectedTime, closeModal }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    address: "",
    appointmentDetails: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, selectedDate, selectedTime });
    // You can add form submission logic here
    closeModal(); // Close the modal after submission
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Fill in your details
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your full name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="123-456-7890"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="example@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="appointmentDetails"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Appointment Details
            </label>
            <textarea
              id="appointmentDetails"
              name="appointmentDetails"
              rows="5"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Describe your goals, preferred time, or any other relevant information"
              value={formData.appointmentDetails}
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
