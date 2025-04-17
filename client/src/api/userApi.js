import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // Make sure this matches your backend

export const updateUserProfile = (userData) => {
  return axios.put(`${API_BASE_URL}/user/update`, userData);
};

// Fetch User Profile by email
export const getUserProfile = (email) => {
    return axios.get(`${API_BASE_URL}/user/email/${email}`);
  };
