// bookingData.js
import Booking from '../models/Appointments';

// Create a new booking
export const createBooking = async (bookingData) => {
  const booking = new Booking(bookingData);
  return await booking.save();
};

// Get booking by ID
export const getBookingById = async (bookingId) => {
  return await Booking.findById(bookingId);
};

// Get all bookings for a specific trainer
export const getBookingsByTrainer = async (trainerId) => {
  return await Booking.find({ trainerId }).populate('clientId', 'name email');
};

// Get all bookings for a specific client
export const getBookingsByClient = async (clientId) => {
  return await Booking.find({ clientId }).populate('trainerId', 'name email');
};

// Update booking status
export const updateBookingStatus = async (bookingId, status) => {
  return await Booking.findByIdAndUpdate(bookingId, { status }, { new: true });
};

// Delete a booking
export const deleteBooking = async (bookingId) => {
  return await Booking.findByIdAndDelete(bookingId);
};
