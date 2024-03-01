import axios from "axios";

const API_BASE_URL = "https://m54week10assginmentbe.onrender.com/";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post("/login", { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data.message || "An error occurred during login.";
  }
};

export const signup = async (userData) => {
  try {
    const response = await axiosInstance.post("/signup", userData);
    return response.data;
  } catch (error) {
    throw error.response.data.message || "An error occurred during signup.";
  }
};
