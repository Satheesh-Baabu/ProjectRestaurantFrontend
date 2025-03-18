import { useState } from "react";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import {Eye, EyeOff} from 'lucide-react'

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 5) newErrors.password = "Password must be at least 5 characters";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await register(formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Enter your name" 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-bgcolor focus:outline-none border-gray-300 "
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="Enter your email" 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-bgcolor focus:outline-none border-gray-300 "
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      <div className="mb-4 relative">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input 
          type={showPassword ? "text" : "password"} 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
          placeholder="Enter password" 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-bgcolor focus:outline-none border-gray-300 "
        />
        <button 
          type="button" 
          className="absolute right-3 top-7 text-sm text-gray-600 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <Eye/>: <EyeOff/>}
        </button>
        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input 
          type="password" 
          name="confirmPassword" 
          value={formData.confirmPassword} 
          onChange={handleChange} 
          placeholder="Confirm password" 
          className="w-full p-2 border rounded focus:ring-2 focus:ring-bgcolor focus:outline-none border-gray-300"
        />
        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
      </div>

      <button 
        className="w-full bg-bgcolor text-white p-2 rounded hover:bg-hovercolor cursor-pointer"
        onClick={handleSubmit}
      >
        Register
      </button>

      <p className="text-center mt-4">  
        Already have an account? 
        <button 
          className="text-bgcolor ml-1 underline cursor-pointer" 
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Register;
