import axios from "axios";

export const API_BASE_URL = "https://projectrestaurantbackend.onrender.com";

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
  return axios.get(`${API_BASE_URL}/menulist`);
}

export const addFood=async(data)=>{
  return axios.post(`${API_BASE_URL}/addfood`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export const addUser=async(formData)=>{
  return axios.post(`${API_BASE_URL}/add-users`, formData)
}

export const getCountURL=async()=>{
  return axios.get(`${API_BASE_URL}/get-count`);
}
