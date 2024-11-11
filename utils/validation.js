
export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return regex.test(email);
  };
  
  export const validateRequiredFields = (fields) => {
    return Object.values(fields).every((field) => field.trim() !== '');
  };