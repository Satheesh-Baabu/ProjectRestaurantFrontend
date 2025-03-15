import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const register = async (userData) => {
  return axios.post(`${API_BASE_URL}/api/auth/register`, userData);
};

export const login = async (credentials) => {
  return axios.post(`${API_BASE_URL}/api/auth/login`, credentials);
};

export const forgotPassword = async (email) => {
  return axios.post(`${API_BASE_URL}/api/auth/forgot-password`, { email });
};

export const resetPassword = async (data) => {
  return axios.post(`${API_BASE_URL}/api/auth/reset-password`, data);
};

export const getFood=async()=>{
  return axios.get(`http://locolhost:8000/menulist`);
}
