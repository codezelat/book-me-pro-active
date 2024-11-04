// userActions.js
import { createUser, getUserById, updateUserProfile, getUsersByRole } from '../data/userData';

// Action to add a new user
export const addUser = async (userData) => {
  return await createUser(userData);
};

// Action to get a user by ID
export const getUserByIdAction = async (userId) => {
  return await getUserById(userId);
};

// Action to update a user profile
export const updateUserProfileAction = async (userId, profileData) => {
  return await updateUserProfile(userId, profileData);
};

// Action to retrieve all users with a specific role (e.g., 'trainer' or 'client')
export const getUsersByRoleAction = async (role) => {
  return await getUsersByRole(role);
};
