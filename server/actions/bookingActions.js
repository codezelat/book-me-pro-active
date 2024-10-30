// bookingActions.js
import { createBooking, getBookingsByTrainer, updateBookingStatus } from '../data/bookingData';

// Action to add a new booking
export const addBooking = async (bookingData) => {
  return await createBooking(bookingData);
};

// Action to retrieve all bookings for a specific trainer
export const getTrainerBookings = async (trainerId) => {
  return await getBookingsByTrainer(trainerId);
};

// Action to update booking status (e.g., to 'approved', 'declined', or 'not reviewed')
export const updateBookingStatusAction = async (bookingId, status) => {
  const validStatuses = ['approved', 'declined', 'not reviewed'];
  if (!validStatuses.includes(status)) {
    throw new Error('Invalid status');
  }
  return await updateBookingStatus(bookingId, status);
};

