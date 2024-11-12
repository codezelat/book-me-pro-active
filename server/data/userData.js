// userData.js
import User from '../models/User';

// Create a new user
export const createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// Get user by ID
export const getUserById = async (userId) => {
  return await User.findById(userId);
};

// Get users by role (e.g., all trainers or clients)
export const getUsersByRole = async (role) => {
  return await User.find({ role });
};

// Update user information
export const updateUser = async (userId, updatedData) => {
  return await User.findByIdAndUpdate(userId, updatedData, { new: true });
};

// Delete a user
export const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};
