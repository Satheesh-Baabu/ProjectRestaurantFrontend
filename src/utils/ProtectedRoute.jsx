import { Navigate } from "react-router-dom";
import {jwtDecode }from "jwt-decode";

const ProtectedRoute = ({ children, allowedRoles }) => {
//   const token = localStorage.getItem("token");
  const token = sessionStorage.getItem("token"); // Read from sessionStorage


  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token); // Decode JWT to get role
    return allowedRoles.includes(decoded.role) ? children : <Navigate to="/unauthorized" />;
  } catch (error) {
    
    sessionStorage.removeItem("token");
    return <Navigate to="/login" />;
  }
};

export const isAuthenticated = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // Check token is expired
  } catch (error) {
    return false;
  }
};

export const getUser = () => {
  const token = sessionStorage.getItem("token");
  if (!token) return null;

  try {
    return jwtDecode(token); 
  } catch (error) {
    return null;
  }
};

export default ProtectedRoute;
